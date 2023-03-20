import { Navigate, Outlet } from "react-router-dom"
import Swal from 'sweetalert2'
import SideMenu from "./SideMenu"

function RestrictedRoute() {
  const token = sessionStorage.getItem("@cinemais/token")

  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de Login',
      html: 'Não foi possível verificar suas credenciais.'
    })

    return (<Navigate to="/login" />)
  }

  return (
    <div className="flex flex-row w-full">
      <SideMenu />
      <div className="flex-1 p-6 overflow-y-auto max-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default RestrictedRoute
