import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import DeviceInfo from 'react-native-device-info';
import { Dialog, Button, Portal } from 'react-native-paper';

const App = () => {
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [hasFlash, setHasFlash] = useState(false);
    const [scanBarcode, setScanBarcode] = useState(true);
    const [ScanResult, setScanResult] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const hideDialog = () => { setVisible(false), setScanBarcode(true) };
    // 在组件加载时检查设备是否支持闪光灯
    useEffect(() => {
        checkFlashSupport();
    }, []);

    // 检查设备是否支持闪光灯
    const checkFlashSupport = async () => {
        console.log(DeviceInfo);
        const model = await DeviceInfo.getModel();
        const unsupportedDevices = ['iPhone SE', 'iPhone 5s', 'iPhone 5c']; // 不支持闪光灯的设备列表
        setHasFlash(!unsupportedDevices.includes(model));
    };
    const openResult = () => {
        setScanBarcode(false);
        setVisible(true);
    };
    // 切换闪光灯状态
    const toggleFlash = () => {
        if (hasFlash) {
            setIsFlashOn(!isFlashOn);
        }
    };

    // 处理扫码结果
    const onBarcodeScan = (event: any) => {
        const barcodeValue = event.nativeEvent.codeStringValue;
        setScanResult(barcodeValue);
        openResult()
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                cameraType={CameraType.Back} // 使用后置摄像头
                scanBarcode={scanBarcode}
                onReadCode={onBarcodeScan}
                torchMode={isFlashOn ? 'on' : 'off'} // 通过属性控制闪光灯
            />
            {hasFlash && (
                <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                    <Text style={styles.flashButtonText}>
                        {isFlashOn ? '关灯' : '开灯'}
                    </Text>
                </TouchableOpacity>
            )}
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>扫码结果</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{ScanResult}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>好的</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    flashButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 15,
        borderRadius: 10,
    },
    flashButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default App;