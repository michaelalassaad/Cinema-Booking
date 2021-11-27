import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation";

/*
movie: { movieID: ..., poster: ..., title: ..., rating: ...}
*/

const MovieCard = ({ movie, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Movie", { id: movie.movieID });
      }}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: movie.poster }} />
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="star"
              color="#e8bc1c"
              size={13}
              style={{ marginTop: 1, marginRight: 3 }}
            />
            <Text style={styles.ratings}>{movie.rating}</Text>
          </View>
          <Text style={styles.name}>{movie.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 270,
  },

  image: {
    flex: 10,
  },

  name: {
    fontWeight: "400",
    fontSize: 15,
    color: "#cfcfcf",
  },

  ratings: {
    fontWeight: "200",
    fontSize: 13,
    color: "#cfcfcf",
  },

  infoContainer: {
    flex: 2,
    backgroundColor: "#393e42",
    justifyContent: "space-evenly",
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
  },
});

export default withNavigation(MovieCard);
