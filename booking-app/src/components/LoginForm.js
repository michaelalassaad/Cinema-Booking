import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { Feather, FontAwesome, Ionicons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const LoginForm = ({
  headerText,
  buttonText,
  onSubmit,
  errorMessage,
  compact,
}) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  var heightOffset = -Dimensions.get("window").height * 0.25;

  const info = (
    <View style={styles.infoContainer}>
      <View style={styles.nameContainer}>
        <Input
          label={"First Name"}
          placeholder={"John"}
          onChangeText={(t) => setFname(t)}
          value={fname}
          fontSize={17}
          leftIcon={<Ionicons name={"person"} size={20} style={styles.text} />}
          leftIconContainerStyle={{ marginHorizontal: 15 }}
          autoCorrect={false}
          inputStyle={styles.text}
          containerStyle={{ flex: 1 }}
        />

        <Input
          label={"Last Name"}
          placeholder={"Doe"}
          onChangeText={(t) => setLname(t)}
          value={lname}
          fontSize={17}
          leftIcon={<Ionicons name={"person"} size={20} style={styles.text} />}
          leftIconContainerStyle={{ marginHorizontal: 15 }}
          autoCorrect={false}
          inputStyle={styles.text}
          containerStyle={{ flex: 1 }}
        />
      </View>

      <Input
        label={"Phone Number"}
        placeholder={"12345678"}
        onChangeText={(t) => setPhone(t)}
        value={phone}
        fontSize={17}
        leftIcon={<FontAwesome name={"phone"} size={20} style={styles.text} />}
        leftIconContainerStyle={{ marginHorizontal: 15 }}
        autoCorrect={false}
        inputStyle={styles.text}
        containerStyle={{ flex: 1 }}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "position" : "height"}
      keyboardVerticalOffset={heightOffset} ///THIS MIGHT HAVE TO BE CHANGED BASED ON SCREEN HEIGHT AND HEIGHT OF SINGUP
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.login}>
          <View style={styles.headerContainer}>
            <Text h3 style={styles.text}>
              {headerText}
            </Text>
          </View>

          <View style={styles.formContainer}>
            {!compact ? info : null}
            <View style={styles.mailContainer}>
              <Input
                label={"Email"}
                placeholder={"john@email.com"}
                onChangeText={(t) => setMail(t)}
                value={mail}
                fontSize={17}
                leftIcon={
                  <Feather name={"mail"} size={20} style={styles.text} />
                }
                leftIconContainerStyle={{ marginHorizontal: 15 }}
                autoCorrect={false}
                autoCapitalize={"none"}
                inputStyle={styles.text}
              />

              <Input
                label={"Password"}
                placeholder={"Password"}
                value={pass}
                onChangeText={(t) => setPass(t)}
                fontSize={17}
                leftIcon={
                  <Feather name={"lock"} size={20} style={styles.text} />
                }
                leftIconContainerStyle={{ marginHorizontal: 15 }}
                blur={true}
                autoCorrect={false}
                autoCapitalize={"none"}
                secureTextEntry={true}
                inputStyle={styles.text}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={buttonText}
              buttonStyle={styles.button}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ["#42f5ef", "#429cf5"],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={() =>
                compact
                  ? onSubmit(mail, pass)
                  : onSubmit(mail, pass, fname, lname, phone)
              }
            />
            <View>
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

LoginForm.defaultProps = {
  compact: true,
};

const styles = StyleSheet.create({
  login: {
    alignItems: "center",
    paddingHorizontal: "5%",
    flex: 1,
  },

  headerContainer: {
    flex: 0.2,
    justifyContent: "center",
  },

  formContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    flex: 0.5,
  },

  infoContainer: {
    flex: 0.5,
    marginBottom: "5%",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  mailContainer: {
    flex: 0.5,
  },

  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
  },

  button: {
    borderRadius: 30,
    width: 300,
    alignSelf: "stretch",
  },
  text: {
    color: "#cfcfcf",
  },

  errorText: {
    color: "#fc0303",
    marginTop: 10,
    alignSelf: "center",
  },
});

export default LoginForm;
