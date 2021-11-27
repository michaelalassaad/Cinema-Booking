import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SocialIcon } from "react-native-elements";

const SocialMedia = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <SocialIcon type={"facebook"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SocialIcon type={"twitter"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <SocialIcon type={"google"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SocialMedia;
