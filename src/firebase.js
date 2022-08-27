// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBZZNPfcOh0rPHJA9vxMgyK_EgeZysJgK4",
  authDomain: "no-1-65bf4.firebaseapp.com",
  projectId: "no-1-65bf4",
  storageBucket: "no-1-65bf4.appspot.com",
  messagingSenderId: "455053255784",
  appId: "1:455053255784:web:9d75b38ab741c66f0787dd",
  measurementId: "G-XRKHNCY4KF",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
