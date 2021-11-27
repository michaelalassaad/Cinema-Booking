import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/LoginForm";

const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <LoginForm
          headerText={"Sign Up"}
          buttonText={"Sign up"}
          onSubmit={() => {
            navigation.navigate("mainFlow");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
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

  text: {},
});

SignupScreen.navigationOptions = () => {
  return { headerShown: false };
};

export default SignupScreen;
