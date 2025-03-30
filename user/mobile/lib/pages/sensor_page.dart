 import 'dart:async';
import 'package:flutter/material.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_background_service/flutter_background_service.dart';
import 'background_service.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:url_launcher/url_launcher.dart';

class SensorPage extends StatefulWidget {
  @override
  _SensorPageState createState() => _SensorPageState();
}

class _SensorPageState extends State<SensorPage> {
  late io.Socket socket;

  // Gyroscope Data
  double _gyroX = 0.0;
  double _gyroY = 0.0;
  double _gyroZ = 0.0;
  
  // Accelerometer Data
  double _accelX = 0.0;
  double _accelY = 0.0;
  double _accelZ = 0.0;
  double _linearAccelX = 0.0;
  double _linearAccelY = 0.0;
  double _linearAccelZ = 0.0;
  
  int _lastAlertTime = 0;

  // Alert State
  bool _highAcceleration = false;
  double _alpha = 0.8;
  List<double> _gravity = [0, 0, 0];
  
  // Subscriptions
  StreamSubscription<GyroscopeEvent>? _gyroSub;
  StreamSubscription<AccelerometerEvent>? _accelSub;

  Future<void> _sendingSMS(String phoneNumber, String message) async {
    final uri = Uri(
      scheme: 'sms',
      path: phoneNumber,
      queryParameters: {
        'body': message, // Add the message body
      },
    );

    if (await canLaunchUrl(uri)) {
      await launchUrl(
        uri,
        mode: LaunchMode.externalApplication, // Opens outside your app
      );
    } else {
      throw 'Could not launch SMS';
    }
  }

  Future<bool> requestSmsPermission() async {
    final status = await Permission.sms.request();
    return status.isGranted;
  }

  Future<Position> _getCurrentLocation() async {
  // Check if location services are enabled
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw Exception('Location services are disabled');
    }

    // Check and request permissions
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw Exception('Location permissions are denied');
      }
    }
    
    if (permission == LocationPermission.deniedForever) {
      throw Exception('Location permissions are permanently denied');
    }

    // Get the current position
    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
  }

  String serverURL = "10.41.157.158:3000";

  Future<void> sendEmailAlert() async {
    try {
      Position position = await _getCurrentLocation();
      String latitude = position.latitude.toString();
      String longitude = position.longitude.toString();

      final response = await http.post(
        Uri.parse("http://$serverURL/api/notifiers/warn"),
        body: {
          "phone": "+40774466973", 
          "location": "$latitude $longitude"
        },
      );
      print("Response: ${response.statusCode} - ${response.body}");
    } catch (e) {
      print("Error sending email alert: $e");
    }
  }

  Future<String> sendAlert() async {
    bool status = false;

    try {
      socket.emit('high_acceleration', {
        'phone': '0774466973',
        'x': _linearAccelX,
        'y': _linearAccelY,
        'z': _linearAccelZ,
        'timestamp': DateTime.now().toIso8601String()
      });

      sendEmailAlert();
      // _sendingSMS("+40737924300", "test mesaj plm");
      status = true;
    } catch (err) {
      print('Socket error: $err');
    }
    
    return status ? 'Alert sent successfully' : 'Failed to send alert';
  } 

  @override
  void initState() {
    super.initState();
    _initSocket();
    _initSensors();
  }

  void _initSocket() {
    socket = io.io('http://10.41.157.158:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
    });

    socket.onConnect((_) {
      print('Connected to Socket.IO server');
    });

    socket.on('alert_response', (data) {
      print('Server response: $data');
    });
  }

  Future<void> _startBackgroundService() async {
    final service = FlutterBackgroundService();
    await service.startService();
  }

  void _initSensors() {
    _gyroSub = gyroscopeEventStream().listen((GyroscopeEvent event) {
      setState(() {
        _gyroX = event.x;
        _gyroY = event.y;
        _gyroZ = event.z;
      });
    });

    _accelSub = accelerometerEventStream().listen((AccelerometerEvent event) {
      // Low-pass filter to isolate gravity
      _gravity[0] = _alpha * _gravity[0] + (1 - _alpha) * event.x;
      _gravity[1] = _alpha * _gravity[1] + (1 - _alpha) * event.y;
      _gravity[2] = _alpha * _gravity[2] + (1 - _alpha) * event.z;
      
      // Calculate linear acceleration
      final linearX = event.x - _gravity[0];
      final linearY = event.y - _gravity[1];
      final linearZ = event.z - _gravity[2];
      
      // Check for high acceleration
      final isHighAccel = linearX.abs() > 10 || 
                         linearY.abs() > 10 || 
                         linearZ.abs() > 10;

      setState(() {
        _accelX = event.x;
        _accelY = event.y;
        _accelZ = event.z;
        _linearAccelX = linearX;
        _linearAccelY = linearY;
        _linearAccelZ = linearZ;
        _highAcceleration = isHighAccel;

        if (((DateTime.now().millisecondsSinceEpoch) - _lastAlertTime > 5000) && _highAcceleration) {
          _lastAlertTime = DateTime.now().millisecondsSinceEpoch;
          sendAlert().then((value) => print(value));
        }
      });
    });
  }

  @override
  void dispose() {
    socket.disconnect();
    _gyroSub?.cancel();
    _accelSub?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _highAcceleration ? Colors.red[100] : Colors.white,
      appBar: AppBar(
        title: Text('Sensor Dashboard'),
        backgroundColor: _highAcceleration ? Colors.red : Colors.green,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildSensorCard(
                title: 'GYROSCOPE (rad/s)',
                x: _gyroX,
                y: _gyroY,
                z: _gyroZ,
                isAcceleration: false,
              ),
              SizedBox(height: 20),
              _buildSensorCard(
                title: 'RAW ACCELERATION (m/s²)',
                x: _accelX,
                y: _accelY,
                z: _accelZ,
                isAcceleration: true,
              ),
              SizedBox(height: 20),
              _buildSensorCard(
                title: 'LINEAR ACCELERATION (m/s²)',
                x: _linearAccelX,
                y: _linearAccelY,
                z: _linearAccelZ,
                isAcceleration: true,
                isHighAccel: _highAcceleration,
              ),
              if (_highAcceleration) ...[
                SizedBox(height: 30),
                Container(
                  padding: EdgeInsets.all(15),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      Icon(Icons.warning, color: Colors.white, size: 40),
                      SizedBox(height: 10),
                      Text(
                        'HIGH ACCELERATION DETECTED!',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSensorCard({
    required String title,
    required double x,
    required double y,
    required double z,
    bool isAcceleration = false,
    bool isHighAccel = false,
  }) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: isHighAccel ? Colors.red : Colors.green,
              ),
            ),
            SizedBox(height: 10),
            _buildSensorRow('X', x, isAcceleration && x.abs() > 10),
            _buildSensorRow('Y', y, isAcceleration && y.abs() > 10),
            _buildSensorRow('Z', z, isAcceleration && z.abs() > 10),
          ],
        ),
      ),
    );
  }

  Widget _buildSensorRow(String axis, double value, bool isCritical) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          Text('$axis:', style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(width: 10),
          Text(
            value.toStringAsFixed(2),
            style: TextStyle(
              fontSize: 16,
              color: isCritical ? Colors.red : Colors.black,
              fontWeight: isCritical ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
} 
