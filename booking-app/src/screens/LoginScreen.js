import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import LoginForm from "../components/LoginForm";
import SocialMedia from "../components/SocialMedia";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <LoginForm
          headerText={"Login"}
          buttonText={"Login"}
          onSubmit={() => {
            navigation.navigate("mainFlow");
          }}
        />
      </View>

      <View style={styles.lower}>
        <View style={styles.child}>
          <Text style={styles.text}>Or sign in using</Text>
          <SocialMedia />
        </View>

        <View style={styles.child}>
          <Text style={styles.text}>
            Don't have an account? Sign up instead
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303337",
  },

  upper: {
    flex: 1,
    marginVertical: "5%",
  },

  lower: {
    flex: 1,
    alignItems: "center",
    paddingBottom: "5%",
  },

  child: {
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  text: {
    fontFamily: "Noteworthy",
    color: "#cfcfcf",
  },
});

LoginScreen.navigationOptions = () => {
  return { headerShown: false };
};
export default LoginScreen;
