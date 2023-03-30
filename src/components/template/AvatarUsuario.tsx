import useAuth from "@/data/hook/useAuth";
import Link from "next/link";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario({ className }: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  return (
    <Link href="/perfil">
      <img
        src={usuario?.imagemUrl ?? "/images/avatar.svg"}
        alt="Avatar do usuário"
        className={`
        h-10 w-10 rounded-full cursor-pointer
        ${className}
      `}
        key={usuario?.uid}
      />
    </Link>
  );
}
