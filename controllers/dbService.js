import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const addItem = async ({ type, brand, store, price, date }) => {
  try {
    const docRef = await addDoc(collection(db, "items"), {
      type: type,
      history: {
        brand: brand,
        store: store,
        price: price,
        date: date,
      },
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  let data = [];
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, "=>", doc.data());
    data.push(doc.data());
  });
  console.log("fb ", data);

  return data;
};
