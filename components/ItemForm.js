import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
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
    getValues,
  } = useForm({
    defaultValues: {
      type: "",
      brand: "shit",
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
      store: getValues("store"),
      price: "",
      date: getValues("date"),
    });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  const onResetPress = () => {
    setDate("");
    reset({
      type: "",
      brand: "",
      store: "",
      price: "",
      date: "",
    });
  };
  const onResetLongPress = () => {
    setDate("test_date");
    reset({
      type: "test_type",
      brand: "test_brand",
      store: "test_store",
      price: "test_price",
      date: "test_date",
    });
  };

  console.log("errors", errors);

  return (
    <ScrollView
      contentContainerStyle={styles.overallContainer}
      keyboardDismissMode="on-drag"
    >
      <View>
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
          defaultValue="cum"
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
              <Text style={styles.input} onPress={() => setShow(true)}>
                {date}
              </Text>
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
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.buttonContainer}
      >
        <Pressable
          style={styles.button}
          onPress={onResetPress}
          onLongPress={onResetLongPress}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  overallContainer: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    //marginTop: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
