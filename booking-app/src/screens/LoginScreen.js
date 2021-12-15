import axios from "axios";
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import LoginForm from "../components/LoginForm";
import SocialMedia from "../components/SocialMedia";
import AuthContext from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { custID, setcustID } = useContext(AuthContext);
  const [error, setError] = useState("");

  const login = async (email, pass) => {
    try {
      const res = await axios.post("http://172.20.10.2:3000/signin", {
        email: email,
        pass: pass,
      });
      const id = res.data.custID;
      setcustID(id);
      navigation.navigate("mainFlow");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <LoginForm
          headerText={"Login"}
          buttonText={"Login"}
          onSubmit={login}
          errorMessage={error}
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
    flex: 1.5,
    paddingVertical: "5%",
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
    color: "#cfcfcf",
  },
});

LoginScreen.navigationOptions = () => {
  return { headerShown: false };
};
export default LoginScreen;
