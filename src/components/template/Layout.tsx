import useAppData from "@/data/hook/useAppData";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./ManuLateral";

interface LayoutProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export default function Layout({ titulo, subtitulo, children }: LayoutProps) {
  const { tema } = useAppData();

  return (
    <div
      className={`
       ${tema} flex h-screen w-screen
    `}
    >
      <MenuLateral />
      <div
        className={`
      flex flex-col w-full p-7
      bg-gray-300 dark:bg-gray-800 
      `}
      >
        <Cabecalho titulo={titulo} subtitulo={subtitulo} />
        <Conteudo>{children}</Conteudo>
      </div>
    </div>
  );
}
