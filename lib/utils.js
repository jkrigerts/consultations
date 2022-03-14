import { doc, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

const formatTime = (seconds, nanoseconds) => {
  return new Date(
    Number(
      `${seconds}${
        String(nanoseconds) === "0" ? "000" : String(nanoseconds).slice(0, 3)
      }`
    )
  );
};

export async function getData(collection, document) {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);
  //const docSnap = await query(docRef, orderBy("atendeesCnt"));

  if (docSnap.exists()) {
    const a = [];
    for (const [key, value] of Object.entries(docSnap.data())) {
      a.push({
        id: value.id,
        cdate: formatTime(value.cdate.seconds, value.cdate.nanoseconds),
        ctime: [
          formatTime(value.ctime[0].seconds, value.ctime[0].nanoseconds),
          formatTime(value.ctime[1].seconds, value.ctime[1].nanoseconds),
        ],
        attendeesCnt: value.attendeesCnt,
        active: value.active,
      });
    }
    return a;
  }
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

export const monthNameMap = [
  "janvāris",
  "februāris",
  "marts",
  "aprīlis",
  "maijs",
  "jūnijs",
  "jūlijs",
  "augusts",
  "septembris",
  "oktobris",
  "novembris",
  "decembris",
];

export const dayNameMap = [
  "Svētdiena",
  "Pirmdiena",
  "Otrdiena",
  "Trešdiena",
  "Ceturtdiena",
  "Piektdiena",
  "Sestdiena",
];
