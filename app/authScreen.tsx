import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signUp, signIn } from './services/authService';
import { storeToken } from './services/authService';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        const response = await signUp(email, password, 'NewUser', 70, 'male');
        setMessage(response.error || 'Signup successful! Check your email.');
    };


    const handleSignIn = async () => {
        const response = await signIn(email, password);
        if (!response.error) {
            await storeToken(response.token);
            router.push('/tabs/profile')
        }
        setMessage(response.error || 'Login successful!');
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Log In" onPress={handleSignIn} />
            {message && <Text>{message}</Text>}
        </View>
    );
};
