import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "./context/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "tabs/index") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "tabs/add") {
              iconName = focused ? "add" : "add-outline";
            } else if (route.name === "tabs/profile") {
              iconName = focused ? "person" : "person-outline";
            }
            else {
              iconName = "help";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tabs.Screen name="tabs/index" options={{ title: "Home" }} />
        <Tabs.Screen name="tabs/add" options={{ title: "Add Drink" }} />
        <Tabs.Screen name="tabs/profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="loginScreen" options={{ href: null, }} />
        <Tabs.Screen name="signupScreen" options={{ href: null, }} />
      </Tabs>
    </AuthProvider>
  );
}
