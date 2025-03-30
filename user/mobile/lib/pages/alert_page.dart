 import 'dart:async';
import 'package:flutter/material.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_background_service/flutter_background_service.dart';
import 'background_service.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

class AlertPage extends StatefulWidget {
  @override
  _AlertPageState createState() => _AlertPageState();
}

class _AlertPageState extends State<AlertPage> {
  String serverURL = "10.41.157.158:3000";

  Future<void> sendEmailAlert(String message) async {
    try {
      final response = await http.post(
        Uri.parse("http://$serverURL/api/notifiers/warn"),
        body: {"phone": "0774466973"},
      );
      print("Response: ${response.statusCode} - ${response.body}");
    } catch (e) {
      print("Error sending email alert: $e");
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:  Colors.white,
      appBar: AppBar(
        title: Text('Sensor Dashboard'),
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
              TextField(
                maxLines: 5,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Enter your message',
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  // Add your button logic here
                },
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}