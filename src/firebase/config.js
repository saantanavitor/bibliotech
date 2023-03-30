import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyCio7kr2HuT0WGFwDVpfgHic6_yVix7N2A",
  authDomain: "bibliotech-squad2.firebaseapp.com",
  projectId: "bibliotech-squad2",
  storageBucket: "bibliotech-squad2.appspot.com",
  messagingSenderId: "440095017062",
  appId: "1:440095017062:web:55acac0173005b795dc5a7"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);
