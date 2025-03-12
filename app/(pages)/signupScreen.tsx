import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/authContext';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return <Text>Error: AuthContext is null</Text>; // Prevents crashes if context is undefined
    }

    const { signUpUser } = authContext;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const router = useRouter();

    const handleSignup = async () => {
        const weightInt = parseInt(weight, 10);

        if (!email || !password || !username || !weight || !gender) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        if (isNaN(weightInt) || weightInt <= 0) {
            Alert.alert("Error", "Weight must be a positive integer.");
            return;
        }

        const genderUpper = gender.toUpperCase();
        if (genderUpper !== "M" && genderUpper !== "F") {
            Alert.alert("Error", "Gender must be 'M' or 'F'.");
            return;
        }

        await signUpUser(email, password,   username, weightInt, gender);
        router.push("./tabs/profile");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <Text style={styles.label}>Password ({'>'}6 characters)</Text>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
            <Text style={styles.label}>Weight (positive whole numbers only)</Text>
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                value={weight}
                onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))} // Restrict to numbers only
                keyboardType="numeric"
            />
            <Text style={styles.label}>Gender (M/F)</Text>
            <TextInput
                style={styles.input}
                placeholder="Gender (M/F)"
                value={gender}
                onChangeText={(text) => setGender(text.toUpperCase())}
                maxLength={1}
            />
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Button title="To Login" onPress={() => router.push('./loginScreen')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
});