import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Profile Screen</Text>
      <Button title="Go to Login" onPress={() => router.push("../loginScreen")} />
      <Button title="Go to Signup" onPress={() => router.push("../signupScreen")} />
    </View>
  );
}
