import AsyncStorage from '@react-native-async-storage/async-storage';

export const signUp = async (email: string, password: string, username: string, weight: number, gender: string) => {
    const response = await fetch(`http://localhost:4000/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username, weight, gender }),
    });
    return await response.json();
};

export const signIn = async (email: string, password: string) => {
    const response = await fetch(`http://localhost:4000/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return await response.json();
};

export const logout = async () => {
    const token = await AsyncStorage.getItem('authToken');

    await fetch(`http://localhost:4000/api/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('refreshToken');
};

// **Fetch user profile**
export const getUserProfile = async (token: string) => {
    const response = await fetch(`http://localhost:4000/api/profile`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
};

export const storeToken = async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem('authToken');
};

export const removeToken = async () => {
    await AsyncStorage.removeItem('authToken');
};