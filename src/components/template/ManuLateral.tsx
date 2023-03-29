import { IconeAjustes, IconeHome, IconeSair, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
  return (
    <aside
      className={`  
      flex flex-col
      bg-gray-200 text-gray-700
      dark:bg-gray-900 
    `}
    >
      <div
        className={`
        flex flex-col items-center justify-center
        bg-gradient-to-r from-indigo-500 to-purple-800
        h-20 w-20
      `}
      >
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" texto="Início" icone={IconeHome} />
        <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes} />
        <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
      </ul>
      <ul>
        <MenuItem
          texto="Sair"
          icone={IconeSair}
          onClick={() => console.log("clicou")}
          className={`
            flex flex-col justify-center items-center
            h-20 w-20
            text-red-600
            hover:bg-red-600 hover:text-white
            dark:hover:bg-red-600 hover:text-white
          `}
        />
      </ul>
    </aside>
  );
}
