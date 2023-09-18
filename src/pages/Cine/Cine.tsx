import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit, MdCalendarMonth } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";


function Cine() {
  document.title = 'Cinemais | Cinemas'

  const [isLoading, setIsLoading] = useState(false)
  const [cines, setCines] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const pageSize = 10;

  useEffect(() => {
    if (token) {
      getCines()
    }
  }, [token, currentPage])

  async function getCines() {
    setIsLoading(true)
    const { data } = await api.get('/cine', {
      headers: {
        Authorization: token
      },
      params: {
        page: currentPage,
        size: pageSize
      }
    })

    setPageCount(data.pagination.totalCount / pageSize)
    setCines(data.data)
    setIsLoading(false)
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  function handleEditCine(cine: any) {
    navigate(`/cine/edit/${cine.id}`, { state: cine })
  }

  async function handleDeleteCine(cine: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir o cinema ${cine.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/cine/${cine.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Cinema ${cine.name} excluído!`
        })

        await getCines()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir o cinema ${cine.name}.`
        })
      }
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Cinemas
        </h1>
        {role === 'Admin' && (
          <button
            className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
            onClick={() => navigate('/cine/create')}
          >
            Criar
          </button>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nome</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Logo</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cidade</th>
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
            {(!isLoading && cines.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">Não existem cinemas cadastrados!</td>
              </tr>
            )}
            {!isLoading && cines.map((cine: any) => (
              <tr className="hover:bg-gray-50" key={cine.id}>
                <td className="px-6 py-4">{cine.name}</td>
                <td className="px-6 py-4">
                  <img className="h-16 w-16 rounded" src={cine.logo} alt="Logo" />
                </td>
                <td className="px-6 py-4">
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                    {cine.city.name}
                  </span>
                </td>
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
                      <button onClick={() => handleEditCine(cine)}>
                        <MdEdit size={24} />
                      </button>
                      <button onClick={() => handleDeleteCine(cine)}>
                        <MdDelete size={24} />
                      </button>
                      <Link to={`/cine/${cine.id}`}>
                        <MdCalendarMonth size={24} />
                      </Link>
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

export default Cine