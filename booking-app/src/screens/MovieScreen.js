import React, { useEffect, useState } from "react";
import { StyleSheet, Text,Image, View,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
          <Text style= {styles.values}> i like coconuts to the point where </Text>
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
        
        onPress={() => {return(<Text style = {styles.values}>This is working</Text>)}}
      />

      <TouchableOpacity
        onPress={() => {
           navigation.navigate("Review");
        }}
          >
        <Text style={styles.previous}>Old Reviews</Text>
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
    flexDirection: 'column',
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
