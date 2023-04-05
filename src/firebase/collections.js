import { db } from "./config";
import { collection } from "firebase/firestore";

export const livrosCollection = collection(db, "livros");
export const emprestimosCollection = collection(db, "emprestimos");
export const autoresCollection = collection(db, "autores");
export const categoriasCollection = collection (db, "categorias");
export const usuariosCollection = collection(db, "usuarios");
