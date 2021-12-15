import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { CheckBox } from "react-native-elements";

const FoodItem = ({ foodName, unitPrice, totalPrice, setTotalPrice }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [qty, setQty] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTotalPrice(0);
  }, [checked]);

  return (
      <View>
        <CheckBox
          center
          onPress={() => {
            setChecked(!checked);
          }}
          checked={checked}
          checkedColor="blue" 
          title={foodName}
        />
        <View style={styles.rowContainer}>
          <SelectDropdown
            data={arr}
            onSelect={(selectedItem, index) => {
              setQty(selectedItem);
              setTotalPrice(selectedItem * unitPrice);
            }}
            defaultButtonText="0"
            buttonStyle={{ width: '71%', borderRadius: 3, backgroundColor: "#cfcfca" }}
            disabled={!checked}
          />
          <View style={styles.text}>
            <Text style={styles.price}>Price: {totalPrice}</Text>
          </View>
        </View>
      </View> 
  );
};

const styles = StyleSheet.create({ 
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 5
  },
  text: {
    backgroundColor: "#cfcfca",
    borderRadius: 3,
    width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  price: {
    fontWeight: "bold"
  }

});

export default FoodItem;
