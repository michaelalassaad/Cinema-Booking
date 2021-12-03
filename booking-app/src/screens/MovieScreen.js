import React, { useEffect, useState } from "react";
import { StyleSheet, Text,Image, View,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

//Inside navigation, we have the prop id.

const MovieScreen = ({ navigation }) => {
  return(
  <ScrollView style = {styles.container}>
    <View style = {styles.content}>

        <Image source={{uri: 'https://m.media-amazon.com/images/I/611ixoDpRLL._AC_.jpg'}}
        style={{width: 200, height: 380}} />

        <View style = {styles.description}>

          <View style = {styles.values}>
          <Text style= {styles.description}> Title:</Text>
          <Text style= {styles.values}> Inception</Text>
          </View>
          <View style = {styles.values}>
          <Text style= {styles.description}> Actor:</Text>
          <Text style= {styles.values}> Mic</Text>
          </View>
          <View style = {styles.values}>
          <Text style= {styles.description}> Director:</Text>
          <Text style= {styles.values}> toto</Text>
          </View>
          <View style = {styles.values}>
          <Text style= {styles.description}> Rating:</Text>
          <Text style= {styles.values}> 8.9 / 10</Text>
          </View>
          
          <View style = {styles.values}>
          <Text style= {styles.description}> Duration:</Text>
          <Text style= {styles.values}> 170 min</Text>
          </View>
        </View> 
      </View>
      <View style = {styles.description}>
          <Text style= {styles.description}> Description:</Text>
          <Text style= {styles.values}>Dom Cobb is a thief with the rare ability to enter people's dreams and steal their secrets from their subconsciouses.
           His skill has made him a hot commodity in the world of corporate espionage, but has also cost him everything he loves. Cobb gets a chance at redemption when he is offered a seemingly impossible task: Plant an idea in someone's mind.
           If he succeeds, it will be the perfect crime, but a dangerous enemy anticipates Cobb's every move. </Text>
          </View>

    <View style = {styles.values}>
      <Text style = {styles.description}> </Text>
      </View>

      <View style = {styles.reviews}>
      <Button
        title={'Book Now'}
        titleStyle={{ fontFamily: "Noteworthy" }}
        buttonStyle={styles.button}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ["#42f5ef", "#429cf5"],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        
        onPress={() => {navigation.navigate('Home');}} //to be changed
      />

      <TouchableOpacity
        onPress={() => {
           navigation.navigate('Login');  //To be changed
        }}
          >
        <Text style={{color:'blue',marginLeft: 50,marginTop:10}}>Old Reviews</Text>
      </TouchableOpacity>

      
      
    </View>

  </ScrollView> 
 
  )};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303337",
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    
  },
  description:{
    color: '#cfcfcf',
    fontSize: 15,
    flexDirection: 'column',
    fontWeight: "bold",
    marginTop: 20,
    marginLeft:5,
    marginTop:15,
    marginVertical: 10,
  },

  values:{    // results from query displayed
    color: '#cfcfcf',
    fontSize: 15,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft:5,
  },

  reviews:{
    color: '#cfcfcf',
    fontSize: 15,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft:5,
  },
 
  button: {
    borderRadius: 30,
    width: 150,
    alignSelf: 'flex-start',
  },

  previous:{
    color: 'blue',

  }
  
});

export default MovieScreen;
