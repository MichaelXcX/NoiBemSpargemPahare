import 'dart:async';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';

import 'dart:async';
import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:flutter_background_service/flutter_background_service.dart';

Future<void> initializeService() async {
  final service = FlutterBackgroundService();

  await service.configure(
    androidConfiguration: AndroidConfiguration(
      onStart: onStart,
      autoStart: true,
      isForegroundMode: false,
      autoStartOnBoot: true,
    ),
    iosConfiguration: IosConfiguration(
      autoStart: true,
      onForeground: onStart,
      onBackground: onIosBackground,
    ),
  );
}

@pragma('vm:entry-point')
Future<bool> onIosBackground(ServiceInstance service) async {
  return true;
}

@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  // Initialize Socket.IO
  final socket = io.io('http://10.41.157.158:3000', <String, dynamic>{
    'transports': ['websocket'],
    'autoConnect': true,
  });

  socket.onConnect((_) {
    print('Socket connected: ${socket.id}');
    if (service is AndroidServiceInstance) {
      service.setForegroundNotificationInfo(
        title: "Connected to Server",
        content: "Socket.IO connection established",
      );
    }
  });

  socket.onDisconnect((_) => print('Socket disconnected'));

  // Handle incoming messages
  socket.on('alert', (data) {
    print('Received alert: $data');
  });

  // Sensor data sending logic
  Timer.periodic(Duration(seconds: 1), (timer) async {
    if (service is AndroidServiceInstance) {
      if (await service.isForegroundService()) {
        socket.emit('sensor_data', {
          'timestamp': DateTime.now().toIso8601String(),
          'status': 'active'
        });
      }
    }
  });

  service.on('stopService').listen((event) {
    socket.disconnect();
    service.stopSelf();
  });
}