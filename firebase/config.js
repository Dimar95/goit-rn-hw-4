// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCayKC2J0dXLUzcWuI6SQfYtWcMKbIMp4A",
  authDomain: "reactnativ-hw.firebaseapp.com",
  projectId: "reactnativ-hw",
  storageBucket: "reactnativ-hw.appspot.com",
  messagingSenderId: "1002896004238",
  appId: "1:1002896004238:web:5d6562bc33c431cd99a5df",
  measurementId: "G-YWF5WN96QJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
