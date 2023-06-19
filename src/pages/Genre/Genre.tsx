import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";


function Genre() {
  const [isLoading, setIsLoading] = useState(false)
  const [genres, setGenres] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const pageSize = 10;

  useEffect(() => {
    if (token) {
      getGenres()
    }
  }, [token, currentPage])

  async function getGenres() {
    setIsLoading(true)
    const { data } = await api.get('/genre', {
      headers: {
        Authorization: token
      },
      params: {
        page: currentPage,
        size: pageSize
      }
    })

    setPageCount(data.pagination.totalCount / pageSize)
    setGenres(data.data)
    setIsLoading(false)
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  async function handleDeleteGenre(genre: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir o gênero ${genre.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/genre/${genre.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Gênero ${genre.name} excluído!`
        })

        await getGenres()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir o gênero ${genre.name}.`
        })
      }
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Gêneros
        </h1>
        {role === 'admin' && (
          <button
            className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
            onClick={() => navigate('/genre/create')}
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Filmes</th>
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
            {(!isLoading && genres.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">Não existem gêneros cadastrados!</td>
              </tr>
            )}
            {!isLoading && genres.map((genre: any) => (
              <tr className="hover:bg-gray-50" key={genre.id}>
                <td className="px-6 py-4">{genre.name}</td>
                <td className="px-6 py-4">
                  {/* <img className="w-16 h-auto rounded" src={genre.cover} alt="Cover" /> */}
                </td>
                <td className="px-6 py-4">
                  {role === 'Admin' && (
                    <div className="flex justify-end gap-4">
                      <a x-data="{ tooltip: 'Edite' }" href="#">
                        <MdEdit size={24} />
                      </a>
                      <a href="#delete" onClick={() => handleDeleteGenre(genre)}>
                        <MdDelete size={24} />
                      </a>
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

export default Genre