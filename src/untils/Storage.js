import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储数据
export function SetStorage(key, value) {
    AsyncStorage.setItem(key, value)
        .then(() => {
            console.log('Data saved successfully');
        })
        .catch(error => {
            console.error('Error saving data:', error);
        });
}


// 读取数据
AsyncStorage.getItem('key')
    .then(value => {
        console.log('Loaded value:', value);
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });