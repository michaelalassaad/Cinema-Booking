import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { withNavigation } from "react-navigation"; 

/*
movie: { movieID: ..., poster: ..., title: ..., rating: ...}
*/

const ReviewCard = ({ rev, navigation }) => { 

  return (  
      <TouchableOpacity 
      >
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.ratings}>{rev.rating}/10</Text>
            </View>
          </View>

          <Text style={styles.review}>{rev.review}</Text>
        </View>
      </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: 250,
    height: 150,
    backgroundColor: '#cfcfcf',
    borderColor: "#1E1F21",
    borderRadius: 10,
    borderWidth: 5
  },
  review: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 13,
    flex: 1,
    color: "#000000",
  },
  ratings: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 13,
    flex: 1,
    color: "#cfcfcf",
  },
  infoContainer: {
    flex: 2,
    backgroundColor: "#1E1F21",
    justifyContent: "space-evenly",
    width: '100%',
    maxHeight: 50,
    paddingVertical: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 5,
  },
});

export default withNavigation(ReviewCard);
