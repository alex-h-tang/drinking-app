import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";


export default function Profile() {
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
      <Button title="Go to Auth" onPress={() => router.push("../authScreen")} />
    </View>
  );
}
