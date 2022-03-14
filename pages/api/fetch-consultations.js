import { doc, setDoc, onSnapshot } from "firebase/firestore";

import { db } from "../../lib/firebase";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;

  const { cityName, cityState } = data;

  await setDoc(doc(db, "cities", cityName), {
    name: cityName,
    state: cityState,
  });

  // const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });

  res.status(201).json({ message: "Pieteikums ir reģistrēts!" });
}

export default handler;
