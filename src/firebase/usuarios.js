import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { usuariosCollection } from "./collections";
import { storage } from "./config"

export async function addUsuarios(data) {
    //await addDoc(usuariosCollection, data);
    await setDoc(doc(usuariosCollection, data.id), data)
}

export async function setUsuario(data){

}

export async function getUsuarios() {                                         // getusuarios é usado tanto na lista de usuarios quanto no select do formulário de empréstimos
    const snapshot = await getDocs(usuariosCollection);                       // Variável criada para chamar a coleção de usuarios
    let usuarios = [];                                                        // Array de usuarios
    snapshot.forEach(doc => {                                               // Para cada livro na coleção, coloque dentro do array de usuarios
        const data = {...doc.data(), id: doc.id};
        usuarios.push(data);
    })
    
    return usuarios;
}

export async function getUsuario(id) {
    const document = await getDoc(doc(usuariosCollection, id));
    return document.data() === undefined ? undefined : {...document.data(), id: document.id};
}

export async function updateUsuarios(id, data) {
    await updateDoc(doc(usuariosCollection, id), data);
}

export async function deleteUsuarios(id) {
    await deleteDoc(doc(usuariosCollection, id));
}

export async function uploadCapaLivro(imagem) {
    const filename = imagem.name;
    const imageRef = ref(storage, `usuarios/${filename}`);
    const result = await uploadBytes(imageRef, imagem);
    return await getDownloadURL(result.ref);
}