import React, { useState, useRef, Children } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from '../../store/slices/counter'
import { toPath, toClean } from "../../store/slices/setSlice"
import { Button, Switch } from "react-native-paper"


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

const FormRow: any = ({ children, label, onButtonPress, }) => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};


export default function Config() {
    const [formData, setFormData] = useState({
        clear: true,
        show: false,
    });
    const count = useSelector(state => state.counter.counter.value)
    const dispatch = useDispatch()
    
    const onClearSwitch = () => {
        setFormData(prev => {
            console.log(prev);
            const newData = { ...prev, clear: !prev.clear };
            console.log('更新过程:', newData.clear);
            return newData;
        });
        console.log(formData.clear);
    };
    const onShowSwitch = () => {
        setFormData(prev => ({
            ...prev,
            clear: !prev.show // 直接基于最新状态操作
        }));
    };
    const [configData, setProductList] = useState([
        {
            title: '自动清除',
            label: 'formData.clear',
            func: onClearSwitch,
        },
        {
            title: '是否为PDA',
            label: 'formData.show',
            func: onShowSwitch,
        }
    ])
    const renderItem = ({ item, index }) => (
        <FormRow
            label={item.title}
        ><Switch value={item.label} onValueChange={item.func}></Switch></FormRow>
    );
    return (
        <FlatList
            style={styles.container}
            data={configData}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>没有数据</Text>}
            ListFooterComponent={
                <View>
                    <Button style={styles.lastButton} buttonColor="#f194ff" onPress={() => dispatch(incrementByAmount({ token: 123 }))} >保存</Button>
                </ View>
            }
        />
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 12,
    },
    label: {
        width: 80,
        fontSize: 16,
        color: '#333',
        marginRight: 8
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
        paddingRight: 8
    },
    button: {
        padding: 8,
        marginLeft: 8
    },
});