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
    await setDoc(doc(db, "products", type), {
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
  const itemRef = doc(db, "products", type);
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
  const querySnapshot = await getDocs(collection(db, "products"));
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
  const itemRef = doc(db, "products", type);
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

export const lowerCaseTypes = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  //console.log("first", querySnapshot);

  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, { type: type.trim().toLowerCase() })
      .then(() => console.log("doc updated"))
      .catch((error) => {
        console.error("fucked up ", error);
      });
  });
};

export const copyWithNewType = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((doc) => {
    //console.log(docu.ref.id.toLowerCase());
    console.log(doc.data().type);
    console.log(doc.data().history);

    checkIfItemExistsAndAddDATA(doc.data().type, doc.data());
  });

  /* const itemRef = doc(db, "products", "Zimtinos ");
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    //console.log(itemSnap.data());
    checkIfItemExistsAndAddDATA(itemSnap.data().type, itemSnap.data());
    //console.log("Document data:", itemSnap.data().history);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } */
};

export const addButtItem = async (id, data) => {
  console.log("ADD ", id, data);
  try {
    await setDoc(doc(db, "cities", id), data);
    console.log("Document written of type: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addItemDATA = async (id, data) => {
  console.log("ADD ", id, data);
  try {
    await setDoc(doc(db, "products", id), data);
    console.log("Document written of type: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addHistoryEntryDATA = async (id, data) => {
  console.log("HIST ", id, data);
  const itemRef = doc(db, "products", id);
  data.history.forEach((entry) => {
    updateDoc(itemRef, {
      history: arrayUnion(entry),
    });
  });
};

export const checkIfItemExistsAndAddDATA = async (id, data) => {
  const itemRef = doc(db, "products", id);
  const docSnap = await getDoc(itemRef);

  console.log("TEST ", docSnap.get("history"));
  if (docSnap.exists()) {
    //update item
    addHistoryEntryDATA(id, data);
    console.log("Updating item ", id);
  } else {
    //create item
    addItemDATA(id, data);
    console.log("Adding item ", id);
  }
};
