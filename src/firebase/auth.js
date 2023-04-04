import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "./config";

// Função assíncrona = que o resultado não é obtido de imediato
// Haverá "espera"
export async function cadastrarEmailSenha(email, senha) {
  // Indicar para o firebase que queremos cadastrar
  // um novo usuário utilizando email/senha

  // Aguardando o resultado do Firebase
  const resultado = await createUserWithEmailAndPassword(auth, email, senha);

  return resultado.user;
}

export async function loginGoogle() {
  // Configurar como o login do google vai funcionar
  const provider = new GoogleAuthProvider();
  const resultado = await signInWithPopup(auth, provider);
  return resultado.user;
}

export async function loginFacebook(){
const provider = new FacebookAuthProvider();
const resultado = await signInWithPopup(auth, provider)
return resultado.user;

};

export async function loginGithub() {
  const provider = new GithubAuthProvider();
  const resultado = await signInWithPopup(auth, provider)

  return resultado.user;
}

export async function loginEmailSenha(email, senha) {
  // Vai realizar o login com uma conta de email já existente
  const resultado = await signInWithEmailAndPassword(auth, email, senha);

  return resultado.user;
}

export async function recuperarSenha(email){
  await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  // Deslogar o usuário atual do firebase
  await signOut(auth);
}


export async function updateUser(user, data) {
  await updateEmail(user, data.email);
  await updateProfile(user, {displayName: data.displayName});
  await updatePassword(user, data.senha);
}

export async function excluirConta(user) {
  const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");
 
  if (confirmacao) {
    await user.delete();
  }
}