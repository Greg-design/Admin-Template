import Link from "next/link";

interface MenuItemProps {
  url?: string;
  texto: string;
  icone: any;
  className?: string;
  onClick?: (e: any) => void;
}

export default function MenuItem({ url, texto, icone, onClick, className }: MenuItemProps) {
  function renderizarLink() {
    return (
      <>
        {icone}
        <span
          className={`
      text-xs font-light 
    `}
        >
          {texto}
        </span>
      </>
    );
  }

  return (
    <li className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${className}`} onClick={onClick}>
      {url ? (
        <Link
          href={url}
          className={`
            flex flex-col justify-center items-center
            h-20 w-20 text-gray-600
            dark:text-gray-200  
          `}
        >
          {renderizarLink()}
        </Link>
      ) : (
        renderizarLink()
      )}
    </li>
  );
}
