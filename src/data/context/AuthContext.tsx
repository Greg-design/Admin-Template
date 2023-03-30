import Usuario from "@/model/Usuario";
import route from "next/router";
import { createContext, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  usuario?: Usuario;
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

export function AuthProvider({ children }: any) {
  const [usuario, setUsuario] = useState<Usuario>();

  async function loginGoogle() {
    const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

    if (res.user?.email) {
      const usuario = await usuarioNormalizado(res.user);
      setUsuario(usuario);
      route.push("/");
    }
  }

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
