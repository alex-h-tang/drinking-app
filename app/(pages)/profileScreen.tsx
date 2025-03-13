import { useContext } from "react";
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/authContext";

export default function ProfileScreen() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (!auth) return <ActivityIndicator size="large" color="#6247aa" />;

  const { user, profile, logoutUser } = auth;

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/loginScreen");
  };

  const formattedDate = profile?.joined_at
    ? new Date(profile.joined_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    : "Unknown";

  return (
    <View style={styles.container}>
      {/* Name */}
      {/* need to change signup to take first last name */}
      <Text style={styles.name}>{profile.first_name ?? "John"} {profile.last_name ?? "Doe"}</Text>
      {user && profile ? (
        <>
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.info}>{profile.username}</Text>

            {/* Email (to be implemented) */}
            {/* <Text style={styles.label}>Email:</Text> */}
            {/* <Text style={styles.info}>{profile.email}</Text> */}

            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.info}>{`${profile.weight} lbs`}</Text>

            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.info}>{profile.gender}</Text>
          </View>

          {/* Member Since */}
          <Text style={styles.memberSince}>Member Since: {formattedDate}</Text>

          {/* Edit (to be implemented) */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>No profile found.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/loginScreen")}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/signupScreen")}>
            <Text style={styles.buttonText}>Go to Signup</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  memberSince: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: "80%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
});
