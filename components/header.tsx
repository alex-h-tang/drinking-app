import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Ionicons name="wine-outline" size={20} color="black" />
                <Text style={styles.title}>BAC Buddy</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="#6247aa" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#e9e9e9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 6,
    },
    menuButton: {
        padding: 8,
    },
})