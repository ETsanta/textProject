import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import BarcodeScanner from '../../components/QR';

export default function ScanScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleScanResult = (result) => {
    setIsScanning(false);
    setScanResult(result);
    Alert.alert('扫码成功', result);
  };

  return (
    <View style={{ flex: 1 }}>
      {isScanning ? (
        <BarcodeScanner 
          onScan={handleScanResult}
          onClose={() => setIsScanning(false)}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Button 
            title="开始扫码" 
            onPress={() => setIsScanning(true)}
          />
          {scanResult && (
            <Text style={{ marginTop: 20 }}>上次扫描结果: {scanResult}</Text>
          )}
        </View>
      )}
    </View>
  );
}