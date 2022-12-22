import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addItem = async ({ type, brand, store, price, date }) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      type: type,
      brand: brand,
      store: store,
      price: price,
      date: date,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
