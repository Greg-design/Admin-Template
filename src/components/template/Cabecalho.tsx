import Titulo from "./Titulo";

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
}

export default function Cabecalho({ titulo, subtitulo }: CabecalhoProps) {
  return (
    <div>
      <Titulo titulo={titulo} subtitulo={subtitulo} />
    </div>
  );
}
