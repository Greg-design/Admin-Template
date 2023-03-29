import useAppData from "@/data/hook/useAppData";
import BotaoAlternarTema from "./BotaoAlternarTema";
import Titulo from "./Titulo";

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
  const { tema, alternarTema } = useAppData();

  return (
    <div className={`flex`}>
      <Titulo titulo={titulo} subtitulo={subtitulo} />
      <div className={`flex flex-grow justify-end`}>
        <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
      </div>
    </div>
  );
}
