import AuthInput from "@/components/auth/AuthInput";
import { IconeWarning } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Autenticacao() {
  const { cadastrar, login, loginGoogle } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  function exibirErro(msg: any, tempoEmSeg = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSeg * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login" && login) {
        await login(email, senha);
      } else if (cadastrar) {
        await cadastrar(email, senha);
      }
    } catch (e: any) {
      exibirErro(e?.message ?? "Ocorreu um Erro inesperado.");
    }
  }

  return (
    <div className="flex  h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:1/3">
        <h1
          className={`
        text-3xl font-bold mb-5
      `}
        >
          {modo === "login" ? "Entre com a sua conta" : "Faça seu cadastro!"}
        </h1>

        {erro ? (
          <div
            className={`
          flex items-center
            bg-red-400 text-white py-3 px-5 my-2
            border border-red-700 rounded-lg
        `}
          >
            {IconeWarning}
            <span className="ml-3 text-sm">{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput tipo="email" label="Email" valor={email} valorMudou={setEmail} obrigatorio />
        <AuthInput tipo="password" label="Senha" valor={senha} valorMudou={setSenha} obrigatorio />
        <button
          onClick={submeter}
          className={`
        w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg px-4 py-3 mt-6
      `}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className={`
        w-full bg-red-500 hover:bg-red-400
        text-white rounded-lg px-4 py-3 
      `}
        >
          Entrar com o Google
        </button>

        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setModo("cadastro")}
              className={`
                    text-blue-500 hover:text-blue-700 font-semibold
                    cursor-pointer
                `}
            >
              {" "}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`
                text-blue-500 hover:text-blue-700 font-semibold
                cursor-pointer
            `}
            >
              {" "}
              Entre com a suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
