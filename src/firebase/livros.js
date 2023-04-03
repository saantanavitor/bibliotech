import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { livrosCollection } from "./collections";
import { storage } from "./config"

export async function addLivro(data) {
    await addDoc(livrosCollection, data);
}

export async function getLivros() {                                         // getLivros é usado tanto na lista de livros quanto no select do formulário de empréstimos
    const snapshot = await getDocs(livrosCollection);                       // Variável criada para chamar a coleção de livros
    let livros = [];                                                        // Array de livros
    snapshot.forEach(doc => {                                               // Para cada livro na coleção, coloque dentro do array de livros
        const data = {...doc.data(), id: doc.id};

        if (data.active === true) {                                         // Se estiver ativo, coloque dentro do array de livros
            livros.push(data);                                              
        }
        
    })
    return livros;
}

export async function getLivro(id) {
    const document = await getDoc(doc(livrosCollection, id));
    return {...document.data(), id: document.id};
}

export async function updateLivro(id, data) {
    await updateDoc(doc(livrosCollection, id), data);
}

export async function deleteLivro(id) {
    await deleteDoc(doc(livrosCollection, id));
}

export async function uploadCapaLivro(imagem) {
    const filename = imagem.name;
    const imageRef = ref(storage, `livros/${filename}`);
    const result = await uploadBytes(imageRef, imagem);
    return await getDownloadURL(result.ref);
}