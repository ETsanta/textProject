import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { useIsFocused } from '@react-navigation/native';

export default function BarcodeScanner({ onScan, onClose }) {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  // 扫码配置：支持二维码和常见一维码
  const [frameProcessor, barcodes] = useScanBarcodes([
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
  ], {
    checkInverted: true,
  });

  // 处理扫码结果（防抖）
  useEffect(() => {
    if (barcodes.length > 0 && isFocused) {
      onScan(barcodes[0].content);
    }
  }, [barcodes, onScan, isFocused]);

  // 请求相机权限
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (!hasPermission || !device || !isFocused) {
    return <View style={styles.container}><Text>正在请求权限...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        torch="off"
        orientation="portrait"
      />
      
      {/* 自定义扫码框 UI */}
      <View style={styles.overlay}>
        <View style={styles.border} />
        <Text style={styles.scanText}>将二维码/条码放入框内</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    right: '20%',
    bottom: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 10,
  },
  scanText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 35,
  }
});