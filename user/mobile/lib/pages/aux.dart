// import 'package:socket_io_client/socket_io_client.dart' as io;

// class _SensorPageState extends State<SensorPage> {
//   late io.Socket socket;
  
//   @override
//   void initState() {
//     super.initState();
//     _initSocket();
//     _initSensors();
//   }

//   void _initSocket() {
//     socket = io.io('http://10.41.157.158:3000', <String, dynamic>{
//       'transports': ['websocket'],
//       'autoConnect': true,
//     });

//     socket.onConnect((_) {
//       print('Connected to Socket.IO server');
//     });

//     socket.on('alert_response', (data) {
//       print('Server response: $data');
//     });
//   }

//   // Update your sendAlert method to use Socket.IO
//   Future<void> sendAlert() async {
//     try {
//       socket.emit('high_acceleration', {
//         'phone': '0774466973',
//         'x': _linearAccelX,
//         'y': _linearAccelY,
//         'z': _linearAccelZ,
//         'timestamp': DateTime.now().toIso8601String()
//       });
//     } catch (err) {
//       print('Socket error: $err');
//     }
//   }

//   @override
//   void dispose() {
//     socket.disconnect();
//     _gyroSub?.cancel();
//     _accelSub?.cancel();
//     super.dispose();
//   }
//   // ... rest of your existing code ...
// }