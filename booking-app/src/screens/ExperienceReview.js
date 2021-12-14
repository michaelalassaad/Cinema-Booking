import React, { useEffect, useState, useRef, useContext } from "react";
import {
    StyleSheet, KeyboardAvoidingView, Text, View, TextInput, Keyboard,
    TouchableWithoutFeedback, Platform, SafeAreaView, ScrollView, Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AuthContext from "../context/AuthContext";
import { Tab, AirbnbRating, Button, Divider } from "react-native-elements";
import axios from "axios";
//Inside navigation, we have the prop id.



const MovieReview = ({ navigation }) => {
    const [value, onChangeText] = useState(null);
    const { custId } = useContext(AuthContext);
    const [index, setIndex] = useState(0);
    const [branch, setBranch] = useState("");
    const [overall, setOverall] = useState(5);
    const [screening, SetScreening] = useState(5);
    const [food, setFood] = useState(5);
    const [service, setService] = useState(5);
    const [staff, setEmpl] = useState([]);

    var bra;
    var bID;
    var heightOffset = -Dimensions.get("window").height * 0.025;

    useEffect(async () => {

        if (index == 0)
            bra = ("Byblos")
        else if (index == 1)
            bra = ("Beirut")
        else
            bra = ("Zahle")

        try {

            const res = await axios.get("http://172.20.10.2:3000/branch/", {
                params: { branch: bra }
            });
            setBranch(res.data);
            bID = res.data

            const res2 = await axios.get("http://172.20.10.2:3000/staff/", {
                params: { branch: bID.branchID }
            });
            setEmpl(res2.data);
        } catch (err) {
            console.log(err);
        }
    }, [index]);

    const overallexp = (Rating) => {
        setOverall(Rating);
    };

    const screeningexp = (Rating) => {
        SetScreening(Rating);
    };

    const foodexp = (Rating) => {
        setFood(Rating);
    };

    const serviceexp = (Rating) => {
        setService(Rating);
    };

    const empl = () => {

        return staff.map(function (staff, i) {
            return (
                <View key={i}>
                    <Text style={styles.description}>
                        {staff.firstName} {staff.lastName}{" "}
                    </Text>
                </View>
            );
        });
    };

    const addRev = async () => {
        try { const res = await axios.post("http://172.20.10.2:3000/add_experience/", {
                cID: custId,
                bID: branch.branchID,
                overall: overall,
                screening: screening,
                food: food,
                service: service,
                comment: value
            })
        } catch {
            console.log(err);
        }
    };

    return (
        <KeyboardAvoidingView
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "position" : "height"}
            keyboardVerticalOffset={heightOffset}
        >
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

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.container}
                    >
                        <View>
                            <Text style={styles.title}>About Us:</Text>
                            <Text style={styles.description}>Our cinema company "Movies & Popcorn" was founded
                                in 2021 in Byblos Jbeil then expanded quickly due to our success and opened
                                two other branches in Beirut and Zahle. Our evergoing success, and the increasing
                                number of movie goers is making 'MAP' climb the billboard charts and
                                is helping us become one of the most successful cinemas in Lebanon.</Text>
                            <Text style={styles.title}>Phone Number:</Text>
                            <Text style={styles.description}>0{branch.phoneNumber}</Text>
                            <Text style={styles.title}>Staff:</Text>
                            <Text style={styles.description}>{empl()}</Text>
                        </View>

                        <View style={{
                            backgroundColor: "#1E1F21",
                            borderRadius: 30,
                            marginTop: 5,
                            flex: 2,
                        }}>

                            <AirbnbRating
                                count={10}
                                reviewColor="#cfcfcf"
                                reviews={[
                                    "Overall Experience: 1/10",
                                    "Overall Experience: 2/10",
                                    "Overall Experience: 3/10",
                                    "Overall Experience: 4/10",
                                    "Overall Experience: 5/10",
                                    "Overall Experience: 6/10",
                                    "Overall Experience: 7/10",
                                    "Overall Experience: 8/10",
                                    "Overall Experience: 9/10",
                                    "Overall Experience: 10/10",
                                ]}
                                defaultRating={5}
                                onFinishRating={overallexp}
                                size={20}
                            />

                            <Divider orientation="horizontal" style={styles.divider} />

                            <AirbnbRating
                                count={10}
                                reviewColor="#cfcfcf"
                                reviews={[
                                    "Screening: 1/10",
                                    "Screening: 2/10",
                                    "Screening: 3/10",
                                    "Screening: 4/10",
                                    "Screening: 5/10",
                                    "Screening: 6/10",
                                    "Screening: 7/10",
                                    "Screening: 8/10",
                                    "Screening: 9/10",
                                    "Screening: 10/10",
                                ]}
                                defaultRating={5}
                                onFinishRating={SetScreening}
                                size={20}
                            />

                            <Divider orientation="horizontal" style={styles.divider} />

                            <AirbnbRating
                                count={10}
                                reviewColor="#cfcfcf"
                                reviews={[
                                    "Food: 1/10",
                                    "Food: 2/10",
                                    "Food: 3/10",
                                    "Food: 4/10",
                                    "Food: 5/10",
                                    "Food: 6/10",
                                    "Food: 7/10",
                                    "Food: 8/10",
                                    "Food: 9/10",
                                    "Food: 10/10",
                                ]}
                                defaultRating={5}
                                onFinishRating={setFood}
                                size={20}
                            />

                            <Divider orientation="horizontal" style={styles.divider} />

                            <AirbnbRating
                                count={10}
                                reviewColor="#cfcfcf"
                                reviews={[
                                    "Service: 1/10",
                                    "Service: 2/10",
                                    "Service: 3/10",
                                    "Service: 4/10",
                                    "Service: 5/10",
                                    "Service: 6/10",
                                    "Service: 7/10",
                                    "Service: 8/10",
                                    "Service: 9/10",
                                    "Service: 10/10",
                                ]}
                                defaultRating={5}
                                onFinishRating={setService}
                                size={20}
                            />

                            <Divider orientation="horizontal" style={styles.divider} />

                            <Text style={{ fontSize: 25, color: '#cfcfcf', fontWeight: "bold", alignSelf: "center", marginVertical: 5 }}>General Comments</Text>

                            <TextInput
                                editable
                                maxLength={150}
                                multiline
                                numberOfLines={4}
                                onChangeText={(text) => onChangeText(text)}
                                value={value}
                                placeholder={"Insert Comment Here..."}
                                style={{ padding: 10 }}
                                backgroundColor="white"
                                margin={10}
                                borderRadius={10}
                                height={150}
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
                    </ScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>

        </KeyboardAvoidingView >
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303337",
    },
    title: {
        color: '#cfcfcf',
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15
    },
    description: {
        color: '#cfcfcf',
        fontSize: 15,
        marginHorizontal: 15,
        textAlign: "justify",
    },
    button: {
        marginTop: 20,
        borderRadius: 30,
        marginBottom: 25,
        width: '90%',
        height: '35%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
    },
    unpressed: {
        color: "grey",
        fontSize: 15,
        fontWeight: "bold",
    },
    pressed: {
        color: "#cfcfcf",
        fontSize: 15,
        fontWeight: "bold",
    },
    previous: {
        color: 'blue',

    },
    divider: {
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 0.1,
    },
});

export default MovieReview;
