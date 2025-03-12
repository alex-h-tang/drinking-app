import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "../context/authContext";
import Header from "../components/header";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Tabs
        screenOptions={({ route }) => ({
          header: () => <Header />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "(pages)/homeScreen") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "(pages)/addDrinkScreen") {
              iconName = focused ? "add" : "add-outline";
            } else if (route.name === "(pages)/profileScreen") {
              iconName = focused ? "person" : "person-outline";
            }
            else {
              iconName = "help";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          // headerShown: false,
        })}
      >
        <Tabs.Screen name="(pages)/homeScreen" options={{ title: "Home" }} />
        <Tabs.Screen name="(pages)/addDrinkScreen" options={{ title: "Add Drink" }} />
        <Tabs.Screen name="(pages)/profileScreen" options={{ title: "Profile" }} />
        <Tabs.Screen name="(pages)/loginScreen" options={{ href: null, }} />
        <Tabs.Screen name="(pages)/signupScreen" options={{ href: null, }} />
        <Tabs.Screen name="index" options={{ href: null,}} />
      </Tabs>
    </AuthProvider>
  );
}
