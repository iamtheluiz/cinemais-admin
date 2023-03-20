import { cloneElement, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GiPopcorn } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { useAuth } from "../contexts/AuthContext";

const SideMenuItem: React.FC<{ to: string, children: ReactNode, onClick?: (event: any) => void }> = ({
  to,
  children,
  onClick = () => {}
}) => {
  return (
    <Link to={to} onClick={onClick} className="rounded group flex h-12 cursor-pointer items-center truncate py-4 px-6 text-gray-700 outline-none transition duration-300 ease-linear hover:bg-amber-400 hover:text-amber-600 hover:outline-none active:bg-amber-400 active:text-amber-600 active:outline-none">
      {children}
    </Link>
  );
}

const SideMenu: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <nav className="flex flex-col w-72 min-h-screen shadow-lg">
      <div className="bg-rose-800 py-8">
        <h1 className="flex font-bold text-center text-white text-3xl justify-center items-center">
          <span className="text-amber-400">
            <GiPopcorn size={32} />
          </span>
          Cinemais
          <span className="text-amber-400">+</span>
        </h1>
      </div>
      <div className="flex-1 p-4">
        <SideMenuItem to="/home">
          <TiHome size={24} />
          <span className="ml-2">Home</span>
        </SideMenuItem>
        <SideMenuItem to="/user">
          <FaUserCircle size={24} />
          <span className="ml-2">Usuários</span>
        </SideMenuItem>
        <SideMenuItem to="/logout" onClick={(event: any) => {
          event.preventDefault()
          logout()
          navigate('/login')
        }}>
          <MdOutlineLogout size={24} />
          <span className="ml-2">Sair</span>
        </SideMenuItem>
      </div>
    </nav>
  );
}

export default SideMenu;