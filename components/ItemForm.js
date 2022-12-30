import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

import { addItem, checkIfItemExistsAndAdd } from "../controllers/dbService";

export default function ItemForm() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      brand: "",
      store: "",
      price: "",
      date: "",
    },
  });

  const [date, setDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("DATE ", date);
  }, [date]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const setTDate = (event, date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    setDate(new Date(timestamp));
    setShow(false);
  };

  const onSubmit = ({ type, brand, store, price, date }) => {
    checkIfItemExistsAndAdd({ type, brand, store, price, date });
    setDate("");
    reset({
      type: "",
      brand: "",
      store: "",
      price: "",
      date: "",
    });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log("errors", errors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type (Butter, nuggies, etc.)</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="type"
        rules={{ required: true }}
      />
      {errors.type && <Text>This is required.</Text>}

      <Text style={styles.label}>Brand</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="brand"
      />

      <Text style={styles.label}>Store</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="store"
        rules={{ required: { value: true, message: "Name is required" } }}
      />
      {errors.store && <Text>This is required.</Text>}

      <Text style={styles.label}>Price</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="price"
        rules={{ required: true, valueAsNumber: true }}
      />
      {errors.price && <Text>This is required.</Text>}

      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.input}
              onPressIn={() => setShow(true)}
              showSoftInputOnFocus={false}
              value={date}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={(value) => {
                  onChange(value.nativeEvent.timestamp);
                  setShow(false);
                  setDate(
                    new Date(value.nativeEvent.timestamp).toLocaleDateString()
                  );
                }}
              />
            )}
          </>
        )}
        name="date"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Reset"
          onPress={() => {
            setDate("test_date");
            reset({
              type: "test_type",
              brand: "test_brand",
              store: "test_store",
              price: "test_price",
              date: "test_date",
            });
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 16,
    padding: 8,
  },
  input: {
    backgroundColor: "grey",
    color: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
