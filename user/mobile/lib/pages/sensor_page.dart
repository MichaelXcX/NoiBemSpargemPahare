import 'dart:async';
import 'package:flutter/material.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:http/http.dart' as http;

class SensorPage extends StatefulWidget {
  @override
  _SensorPageState createState() => _SensorPageState();
}

class _SensorPageState extends State<SensorPage> {
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
  
  // Alert State
  bool _highAcceleration = false;
  double _alpha = 0.8;
  List<double> _gravity = [0, 0, 0];
  
  // Subscriptions
  StreamSubscription<GyroscopeEvent>? _gyroSub;
  StreamSubscription<AccelerometerEvent>? _accelSub;

  String serverURL = "10.41.157.158:3000";

  Future<String> sendAlert() async {
    // final response = await http.get(Uri.parse("http://$serverURL/api/notifiers/warn"));
    
    try {
      final response = http.post(Uri.parse("http://$serverURL/api/notifiers/warn"), body: {"phone": "0774466973"});
      print(response); 
    } catch (err) {

      print(err);
    }

    return "Success";
  } 

  @override
  void initState() {
    super.initState();
    _initSensors();
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

        if (_highAcceleration) {
          sendAlert().then((value) => print(value));
        }
      });
    });
  }

  @override
  void dispose() {
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