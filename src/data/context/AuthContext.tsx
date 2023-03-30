import Usuario from "@/model/Usuario";
import Cookies from "js-cookie";
import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  usuario?: Usuario | null;
  loginGoogle?: () => Promise<void>;
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

  async function loginGoogle() {
    const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

    configurarSessao(res.user);
    route.push("/");
  }

  useEffect(() => {
    const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
    return () => cancelar();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loginGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
