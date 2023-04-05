import { 
    addDoc, 
    deleteDoc,
    getDoc, 
    getDocs, 
    updateDoc,
    doc 
} from "firebase/firestore";
import { categoriasCollection } from "./collections";

export async function addCategoria(data) {
    await addDoc(categoriasCollection, data);
}

export async function getCategorias(){
    const snapshot = await getDocs(categoriasCollection);
    let categorias = []; //onde vai conter cada categoria vinda da consulta
    snapshot.forEach(doc => {
        categorias.push({...doc.data(), id: doc.id});
    })
    return categorias;
}

export async function getCategoria(id) {
    const document = await getDoc(doc(categoriasCollection, id));
    return {...document.data(), id: document.id};
}

export async function deleteCategoria(id) {
    await deleteDoc(doc(categoriasCollection, id));
}

export async function updateCategoria(id, data) {
    await updateDoc(doc(categoriasCollection, id), data);
}