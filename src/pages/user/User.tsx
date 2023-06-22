import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";


export function User() {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const pageSize = 10;

  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token, currentPage])

  async function getUsers() {
    setIsLoading(true)
    const { data } = await api.get('/user', {
      headers: {
        Authorization: token
      },
      params: {
        page: currentPage,
        size: pageSize
      }
    })

    setPageCount(data.pagination.totalCount / pageSize)
    setUsers(data.data)
    setIsLoading(false)
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  function handleEditUser(user: any) {
    navigate(`/user/edit/${user.id}`, { state: user })
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
        {role === 'Admin' && (
          <button
            className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
            onClick={() => navigate('/user/create')}
          >
            Criar
          </button>
        )}
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
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">
                  <Spinner />
                </td>
              </tr>
            )}
            {(!isLoading && users.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">Não existem usuários cadastrados!</td>
              </tr>
            )}
            {!isLoading && users.map((user: any) => (
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
                  {role === 'Admin' && (
                    <div className="flex justify-end gap-4">
                      <button onClick={() => handleEditUser(user)}>
                        <MdEdit size={24} />
                      </button>
                      <button onClick={() => handleDeleteUser(user)}>
                        <MdDelete size={24} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <nav aria-label="Page navigation example">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<button
              className="page-link relative block py-1.5 px-1.5 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            ><MdChevronRight size={24} /></button>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<button
              className="page-link relative block py-1.5 px-1.5 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            ><MdChevronLeft size={24} /></button>}
            pageLabelBuilder={(page) => <a
              className={`page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded focus:shadow-none ${page === currentPage ? "bg-rose-800 text-white hover:text-white hover:bg-rose-900" : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200"}`}
              href={`?page=${page}`}>{page}</a>}
            renderOnZeroPageCount={null}
            containerClassName="flex list-style-none"
          />
        </nav>
      </div>
    </>
  )
}