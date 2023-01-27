import { async } from "@firebase/util";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const addItem = async ({ type, brand, store, price, date }) => {
  console.log("ADD ", type, brand, store, price, date);
  try {
    await setDoc(doc(db, "items", type), {
      type: type,
      history: [
        {
          brand: brand,
          store: store,
          price: price,
          date: date,
          timestamp: Date.now(),
        },
      ],
    });
    console.log("Document written of type: ", type);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addHistoryEntry = async ({ type, brand, store, price, date }) => {
  console.log("HIST ", type, brand, store, price, date);
  const itemRef = doc(db, "items", type);
  await updateDoc(itemRef, {
    history: arrayUnion({
      brand: brand,
      store: store,
      price: price,
      date: date,
      timestamp: Date.now(),
    }),
  });
};

export const getAllItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  let data = [];

  const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
  console.log("Data came from " + source);

  querySnapshot.forEach((doc) => {
    //console.log(doc.id, "=>", doc.data());
    data.push(doc.data());
  });

  return data;
};

export const checkIfItemExistsAndAdd = async ({
  type,
  brand,
  store,
  price,
  date,
}) => {
  const itemRef = doc(db, "items", type);
  const docSnap = await getDoc(itemRef);

  console.log("TEST ", docSnap.get("history"));
  if (docSnap.exists()) {
    //update item
    addHistoryEntry({ type, brand, store, price, date });
    console.log("Updating item ", type);
  } else {
    //create item
    addItem({ type, brand, store, price, date });
    console.log("Adding item ", type);
  }
};
