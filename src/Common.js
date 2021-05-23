import firebase from "./firebaseConfig";
import * as constant from "./Constant.js";

let db = firebase.firestore();

export function shuffleId(count) {
  //v1.0
  var chars = "acdefhiklmnoqrstuvwxyz0123456789".split("");
  var result = "";
  for (var i = 0; i < count; i++) {
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
}

export async function findStation(stationId) {
  try {
    const ref = db
      .collection(constant.dbCollection.station)
      .where("stationId", "==", stationId);
    const qs = await ref.get();

    if (!qs.empty) {
      console.log("큐에스", qs.data());

      return { code: 200, id: qs.id, data: qs.data() };
    } else {
      return { code: 200, data: null };
    }
  } catch (e) {
    console.log(e);
    return { code: 400 };
  }
}

export async function findPreStation(stationId) {
  try {
    const ref = db
      .collection(constant.dbCollection.prestation)
      .where("stationId", "==", stationId);
    const qs = await ref.get();
    console.log("큐에스 익지스트", qs.empty);
    if (!qs.empty) {
      return { code: 200, id: qs.id, data: qs.data() };
    } else {
      return { code: 200, data: null };
    }
  } catch (e) {
    console.log(e);
    return { code: 400 };
  }
}

export async function getPrestations() {
  const qs = await db.collection(constant.dbCollection.prestation).get();
  const preStations = [];
  if (qs.empty) {
    return [];
  }
  qs.forEach((doc) => {
    preStations.push({ id: doc.id, data: doc.data() });
  });
  return preStations;
}
