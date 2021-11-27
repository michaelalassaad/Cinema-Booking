import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { Feather } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LoginForm = ({ headerText, buttonText, onSubmit }) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <View style={styles.login}>
      <Text h3 style={styles.text}>
        {headerText}
      </Text>
      <View style={{ alignSelf: "stretch" }}>
        <Input
          label={"Email"}
          labelStyle={{ fontFamily: "Noteworthy" }}
          containerStyle={styles.input}
          placeholder={"john@email.com"}
          onChangeText={(t) => setMail(t)}
          value={mail}
          fontSize={17}
          leftIcon={<Feather name={"mail"} size={20} style={styles.icon} />}
          leftIconContainerStyle={{ marginHorizontal: 15 }}
          autoCorrect={false}
          autoCapitalize={"none"}
        />

        <Input
          label={"Password"}
          labelStyle={{ fontFamily: "Noteworthy" }}
          containerStyle={styles.input}
          placeholder={"Password"}
          value={pass}
          onChangeText={(t) => setPass(t)}
          fontSize={17}
          leftIcon={<Feather name={"lock"} size={20} style={styles.icon} />}
          leftIconContainerStyle={{ marginHorizontal: 15 }}
          blur={true}
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
      </View>

      <Button
        title={buttonText}
        titleStyle={{ fontFamily: "Noteworthy" }}
        buttonStyle={styles.button}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#42f5ef", "#429cf5"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "red",
    paddingHorizontal: "5%",
    flex: 1,
  },

  button: {
    borderRadius: 30,
    width: 300,
    alignSelf: "stretch",
  },
  text: {
    fontFamily: "Noteworthy",
    marginVertical: 10,
    color: "#cfcfcf",
  },
  icon: {
    color: "#cfcfcf",
  },
});

export default LoginForm;
