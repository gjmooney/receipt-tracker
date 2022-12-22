import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { addItem } from "../controllers/dbService";

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

  const onSubmit = ({ type, brand, store, price, date }) => {
    //console.log(data);

    addItem({ type, brand, store, price, date });
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
        rules={{ required: true }}
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
        rules={{ required: true }}
      />

      <Text style={styles.label}>Price</Text>
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
        name="price"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Date</Text>
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
        name="date"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Reset"
          onPress={() => {
            reset({
              type: "Bill",
              brand: "Luo",
              store: "Bill",
              price: "Luo",
              date: "Bill",
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
    color: "white",
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
    backgroundColor: "#0e101c",
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
