import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";


function Movie() {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
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

  function getDurationInHours(durationInMinutes: string) {
    let totalTimeInMinutes = parseInt(durationInMinutes);

    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = totalTimeInMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  async function getCines() {
    setIsLoading(true)
    const { data } = await api.get('/movie', {
      headers: {
        Authorization: token
      },
      params: {
        page: currentPage,
        size: pageSize
      }
    })

    setPageCount(data.pagination.totalCount / pageSize)
    setMovies(data.data)
    setIsLoading(false)
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  async function handleDeleteMovie(movie: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir o filme ${movie.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/movie/${movie.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Filme ${movie.name} excluído!`
        })

        await getCines()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir o filme ${movie.name}.`
        })
      }
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Filmes
        </h1>
        {role === 'admin' && (
          <button
            className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
            onClick={() => navigate('/movie/create')}
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
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Capa</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Sinopse</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Gêneros</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Trailer</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Duração</th>
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
            {(!isLoading && movies.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">Não existem filmes cadastrados!</td>
              </tr>
            )}
            {!isLoading && movies.map((movie: any) => (
              <tr className="hover:bg-gray-50" key={movie.id}>
                <td className="px-6 py-4">{movie.name}</td>
                <td className="px-6 py-4">
                  <img className="w-48 h-auto rounded" src={movie.cover} alt="Cover" />
                </td>
                <td className="px-6 py-4">{movie.synopsis}</td>
                <td className="px-6 py-4">{movie.genres.map((genre: any) => (
                  <span
                    className="inline-flex items-center flex-wrap gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                    {genre.name}
                  </span>
                ))}</td>
                <td className="px-6 py-4">
                  <iframe src={movie.trailer} />
                </td>
                <td className="px-6 py-4">{getDurationInHours(movie.duration)}</td>
                <td className="px-6 py-4">
                  {role === 'Admin' && (
                    <div className="flex justify-end gap-4">
                      <a x-data="{ tooltip: 'Edite' }" href="#">
                        <MdEdit size={24} />
                      </a>
                      <a href="#delete" onClick={() => handleDeleteMovie(movie)}>
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

export default Movie