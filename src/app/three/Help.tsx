import React, { useState, useRef } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import QR from "../../components/QR"



const ContextView = ({ children }) => (
    <Pressable
        android_ripple={{ color: '#eee' }}
        style={({ pressed }) => [
            pressed && styles.pressedState
        ]}
    >
        {children}
    </Pressable>
);


export default function Config() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState('');

    const handleScanResult = (result) => {
        setIsScanning(false);
        setScanResult(result);
        Alert.alert('扫码成功', result);
    };
    const [configData, setProductList] = useState([])
    const renderItem = ({ item, index }) => (
        <ContextView><Text>{index}</Text></ContextView>
    );
    return (
        <FlatList
            data={configData}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
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
            }
        />
    )
}


const styles = StyleSheet.create({
    lastButton: {
        marginBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 40,
        fontSize: 16
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    pressedState: {
        transform: [{ scale: 0.98 }], // 按压缩放
        shadowOpacity: 0.5 // 阴影变化
    },
});