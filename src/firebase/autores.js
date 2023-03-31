import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { autoresCollection } from "./collections";


export async function addAutor(data) {
    await addDoc(autoresCollection, data);
}

export async function getAutores() {
    const snapshot = await getDocs(autoresCollection);
    let autores = [];
    snapshot.forEach(doc => {
        autores.push({...doc.data(), id: doc.id});
    })
    return autores;
}

export async function deleteAutor(id) {
    await deleteDoc(doc(autoresCollection, id));
}

export async function getAutor(id) {
    const document = await getDoc(doc(autoresCollection, id));
    return {...document.data(), id: document.id};
}

export async function updateAutor(id, data) {
    await updateDoc(doc(autoresCollection, id), data);
}