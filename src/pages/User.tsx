import { useEffect, useState } from "react"
import Swal from 'sweetalert2'

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit } from "react-icons/md";

import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"


function User() {
  const [users, setUsers] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token])

  async function getUsers() {
    const { data } = await api.get('/user', {
      headers: {
        Authorization: token
      }
    })

    setUsers(data.data)
  }

  async function handleDeleteUser(user: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir o usuário ${user.email}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/user/${user.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Usuário ${user.email} excluído!`
        })

        await getUsers()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir o usuário ${user.email}.`
        })
      }
    }

  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Usuários
        </h1>
        <button className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700">
          Criar
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Usuário</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Primeiro Nome</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Último Nome</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Perfil</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Estado</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user: any) => (
              <tr className="hover:bg-gray-50" key={user.id}>
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-600">
                    <span className="font-medium text-xl text-gray-100">{user.firstName.split('')[0]}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{user.firstName} {user.lastName}</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <a x-data="{ tooltip: 'Edite' }" href="#">
                      <MdEdit size={24} />
                    </a>
                    <a href="#delete" onClick={() => handleDeleteUser(user)}>
                      <MdDelete size={24} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item"><a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"><MdChevronLeft size={24} /></a></li>
            <li className="page-item"><a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#">1</a></li>
            <li className="page-item active"><a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-rose-800 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-rose-900 shadow-md focus:shadow-md"
              href="#">2 <span className="visually-hidden"></span></a></li>
            <li className="page-item"><a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#">3</a></li>
            <li className="page-item"><a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"><MdChevronRight size={24} /></a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default User
