import { AppProvider } from "@/data/context/AppContext";
import { AuthProvider } from "@/data/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
}

/**
 * crie um arquivo .env.local na raiz do projeto e coloque os seguintes códigos dentro dele.
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDW1fLg_75FQIleSJoWFmHuEg8tBPOKpUw
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=admin-template-gr.firebaseapp.com
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=admin-template-gr

 */
