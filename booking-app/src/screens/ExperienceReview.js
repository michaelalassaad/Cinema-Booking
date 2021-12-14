import React, { useEffect, useState, useRef, useContext } from "react";
import {
    StyleSheet, KeyboardAvoidingView, Text, Image, View, TextInput, Keyboard,
    TouchableWithoutFeedback, Platform, SafeAreaView
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { LinearGradient } from "expo-linear-gradient";
import { AirbnbRating, Rating } from "react-native-elements";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Tab } from "react-native-elements/dist/tab/Tab";
//Inside navigation, we have the prop id.



const MovieReview = ({ navigation }) => {
    const [value, onChangeText] = useState(null);
    const { custId } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [bra, setBra] = useState("");

    useEffect(async () => {
        if (index == 0)
            setBra("Byblos");
        else if (index == 1)
            setBra("Beirut");
        else
            setBra("Zahle");




    }, [index]);

    const ratingCompleted = (Rating) => {
        setRating(Rating);
    };

    // const addRev = async () => {
    //     try {
    //         const res = await axios.post("http://192.168.0.107:3000/add_experience/", {
    //             cID: custId,
    //         })
    //     } catch {
    //         console.log(err);
    //     }
    // };
    if (!movie) return null

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>

                    <Tab value={index} onChange={setIndex}>
                        <Tab.Item
                            title="Byblos"
                            titleStyle={index == 0 ? styles.pressed : styles.unpressed}
                        />
                        <Tab.Item
                            title="Beirut"
                            titleStyle={index == 1 ? styles.pressed : styles.unpressed}
                        />
                        <Tab.Item
                            title="Zahle"
                            titleStyle={index == 2 ? styles.pressed : styles.unpressed}
                        />
                    </Tab>

                    <View>
                        <Text style={styles.title}>About Us:</Text>
                        <Text style={styles.description}>  A cinema company "MAP" was founded in 2021 in Byblos Jbeil
                            then expanded quickly due to its success and opened two other branches in
                            Beirut and Zahle. Its evergoing success, and the excessive demands on 
                            seats for screenings is making MAP climb the billboard charts and is helping us
                            become one of the most successful cinemas in Lebanon. {"\n"} </Text>
                        <Text style={styles.title}>{"\n"}Phone Number:</Text>
                        <Text style={styles.description}>123445567 {"\n"}</Text>
                        <Text style={styles.title}>{"\n"}Staff:</Text>
                        <Text style={styles.description}>getStaffOfBranchDisplayedHere {"\n"}</Text>
                    </View>

                    <Button
                        title={'Add Your Review'}
                        buttonStyle={styles.button}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ["#42f5ef", "#429cf5"],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}

                        onPress={() => {
                            addRev()
                            navigation.navigate("Home");
                        }}
                    />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303337",
    },  
    title:{
        color: '#cfcfcf',
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    },
    description: {
        color: '#cfcfcf',
        fontSize: 15,  
        marginLeft: 5,
        marginBottom:2
    }, 
    button: {

        borderRadius: 30,
        marginBottom: 25,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
    },

    previous: {
        color: 'blue',

    },

});

export default MovieReview;
