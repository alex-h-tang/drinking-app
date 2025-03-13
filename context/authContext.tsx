import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, signUp, logout, getUserProfile } from '../services/authService';

interface AuthContextType {
    user: any;
    profile: any;
    signInUser: (email: string, password: string) => Promise<void>;
    signUpUser: (email: string, password: string, username: string, weight: number, gender: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider wraps the whole app and provides authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        // Load user from AsyncStorage on app start
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                setUser({ token }); // Assume user is logged in
                fetchUserProfile(token);
            }
        };
        loadUser();
    }, []);

    const fetchUserProfile = async (token: string) => {
        try {
            const profileData = await getUserProfile(token);
            console.log("Fetched profile:", profileData);
            setProfile(profileData);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const signInUser = async (email: string, password: string) => {
        const data = await signIn(email, password);
        if (data.token) {
            await AsyncStorage.setItem('authToken', data.token);
            setUser({ token: data.token });
            await fetchUserProfile(data.token);
        }
    };

    const signUpUser = async (email: string, password: string, username: string, weight: number, gender: string) => {
        const data = await signUp(email, password, username, weight, gender);
        if (data.token) {
            await AsyncStorage.setItem('authToken', data.token);
            setUser({ token: data.token });
            await fetchUserProfile(data.token);
        }
    };

    const logoutUser = async () => {
        await logout();
        await AsyncStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, profile, signInUser, signUpUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
