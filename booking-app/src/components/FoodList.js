import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import FoodItem from "./FoodItem";

const FoodList = ({ foodList }) => {
  const state = [];
  for (i = 0; i < foodList.length; i++) {
    state.push(useState(0));
  }

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    () => {
      var a = 0;
      for (i = 0; i < state.length; i++) {
        a += state[i][0];
      }
      setTotalPrice(a);
    },
    state.map((item) => item[0])
  );

  return (
    <View style={{ height: 200 }}>
      <FlatList
        data={foodList}
        scrollEnabled={false}
        renderItem={(element) => {
          const item = element.item;
          const index = element.index;
          return (
            <FoodItem
              foodName={item.foodName}
              unitPrice={item.price}
              totalPrice={state[index][0]}
              setTotalPrice={state[index][1]}
            />
          );
        }}
        keyExtractor={(item) => item.foodName}
      />
      <Text>Total Price: {totalPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FoodList;
