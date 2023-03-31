import Usuario from "@/model/Usuario";
import Cookies from "js-cookie";
import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  usuario?: Usuario | null;
  carregando?: boolean;
  cadastrar?: (email: string, senha: string) => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  loginGoogle?: () => Promise<void>;
  logOut?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor:
      usuarioFirebase.providerData?.length && usuarioFirebase.providerData[0]?.providerId
        ? usuarioFirebase.providerData[0].providerId
        : "firebase",
    imagemUrl: usuarioFirebase.photoURL,
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-auth", "true", {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider({ children }: any) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function configurarSessao(usuarioFirebase: any) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function login(email: string, senha: string) {
    try {
      setCarregando(true);
      const res = await firebase.auth().signInWithEmailAndPassword(email, senha);

      await configurarSessao(res.user);
      route.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      setCarregando(true);
      const res = await firebase.auth().createUserWithEmailAndPassword(email, senha);

      await configurarSessao(res.user);
      route.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function loginGoogle() {
    try {
      setCarregando(true);
      const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await configurarSessao(res.user);
      route.push("/");
    } finally {
      setCarregando(false);
    }
  }

  async function logOut() {
    try {
      setCarregando(true);
      await firebase.auth().signOut();
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        login,
        loginGoogle,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
