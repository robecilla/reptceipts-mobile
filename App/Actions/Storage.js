import { AsyncStorage } from 'react-native';

export default {
    async setItem(key, value) {
        try {
            return await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('AsyncStorage#setItem error: ' + error.message);
        }
    },
    async getItem(key) {
        return await AsyncStorage.getItem(key)
            .then((result) => {
                if (result) {
                    try {
                        return result;
                    } catch (e) {
                        console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
                    }
                }
            });
    },
    async removeItem(key) {
        return await AsyncStorage.removeItem(key);
    }
}