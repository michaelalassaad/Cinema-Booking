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
//Inside navigation, we have the prop id.



const MovieReview = ({ navigation }) => {
    const [movie, setMovie] = useState("");
    const [value, onChangeText] = useState(null)
    const { custId } = useContext(AuthContext);
    const id = navigation.getParam("movieId");
    const [ratings, setRating] = useState(5);

    useEffect(async () => {
        try {
            const res = await axios.get('http://192.168.0.103:3000/movie/', { params: { movID: id } });
            setMovie(res.data);
            styles.filter1 = { ...styles.filter1, color: "#cfcfcf" };
            styles.filter2 = { ...styles.filter2, color: "grey" };
        } catch (err) {
            console.log(err);
        }

    }, [0]);

    const ratingCompleted = (Rating) => {
        setRating(Rating);
    };

    const addRev = async () => {
        try {
            const res = await axios.post("http://192.168.0.103:3000/add_review/", {
                mID: id,
                cID: custId,
                rating: ratings,
                review: value
            })
        } catch {
            console.log(err);
        }
    };
    if (!movie) return null

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <View style={styles.smovie}>
                        <Image source={{ uri: movie.poster }}
                            style={styles.image} />
                    </View>
                    <View style={{
                        backgroundColor: "#1E1F21", borderRadius: 30, marginTop: 5,
                    }}>
                        <View>
                            <AirbnbRating
                                count={10}
                                reviews={["Rating: 1/10", "Rating: 2/10", "Rating: 3/10", "Rating: 4/10",
                                    "Rating: 5/10", "Rating: 6/10", "Rating: 7/10", "Rating: 8/10",
                                    "Rating: 9/10", "Rating: 10/10"]}
                                defaultRating={5}
                                showRating
                                onFinishRating={ratingCompleted}
                                size={20}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.description}>Insert Comments: </Text>
                            <Text style={styles.hints}>   (250 characters max)</Text>
                        </View>
                        <TextInput
                            editable
                            maxLength={250}
                            multiline
                            numberOfLines={3}
                            onChangeText={
                                text => onChangeText(text)
                            }
                            value={value}
                            placeholder={"Insert Comment Here..."}
                            style={{ padding: 10 }}
                            backgroundColor='white'
                            margin={10}
                            borderRadius={10}
                            height={100}

                        />
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
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303337",
    },
    smovie: {
        backgroundColor: "#303337",
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: '#cfcfcf',
        fontSize: 35,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        textAlign: "center",
        marginTop: 15,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: 180,
        borderWidth: 4,
        borderColor: "#1E1F21",
        borderRadius: 10
    },
    description: {
        color: '#cfcfcf',
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 15,
    },
    hints: {
        color: '#cfcfcf',
        fontSize: 14,
        marginTop: 17.5,
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
