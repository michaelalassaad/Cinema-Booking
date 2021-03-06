import axios from "axios";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";

import AuthContext from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { custID, setcustID } = useContext(AuthContext);
  const [error, setError] = useState("");

  const signup = async (email, pass, fname, lname, phone) => {
    try {
      const res = await axios.post("http://172.20.10.2:3000/signup", {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        pass: pass,
      });
      const id = res.data.custID;
      setcustID(id); //authentication
      navigation.navigate("mainFlow");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm
        headerText={"Sign up"}
        buttonText={"Sign up"}
        errorMessage={error}
        onSubmit={signup}
        compact={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303337",
  },
});

SignupScreen.navigationOptions = () => {
  return { headerShown: false };
};

export default SignupScreen;
