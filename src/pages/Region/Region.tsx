import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';

import { MdChevronLeft, MdChevronRight, MdDelete, MdEdit } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom";


function Region() {
  const [regions, setRegions] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { token } = useAuth();

  const pageSize = 10;

  useEffect(() => {
    if (token) {
      getRegions()
    }
  }, [token, currentPage])

  useEffect(() => {
    console.log(regions)
  }, [regions])

  async function getRegions() {
    const { data } = await api.get('/region', {
      headers: {
        Authorization: token
      },
      params: {
        page: currentPage,
        size: pageSize,
        cities: true
      }
    })

    setPageCount(data.pagination.totalCount / pageSize)
    setRegions(data.data)
  }

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  async function handleDeleteRegion(region: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir a região ${region.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/region/${region.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Região ${region.email} excluída!`
        })

        await getRegions()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir a região ${region.name}.`
        })
      }
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Regiões
        </h1>
        <button
          className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
          onClick={() => navigate('/region/create')}
        >
          Criar
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nome</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Latitude</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Longitude</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cidades</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Estado</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {regions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 font-medium text-gray-900">Não existem regiões cadastradas!</td>
              </tr>
            )}
            {regions.map((region: any) => (
              <tr className="hover:bg-gray-50" key={region.id}>
                <td className="px-6 py-4">{region.name}</td>
                <td className="px-6 py-4">{region.latitude}</td>
                <td className="px-6 py-4">{region.longitude}</td>
                <td className="px-6 py-4">{region.cities.map((city: any) => (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                    {city.name}
                  </span>
                ))}</td>
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
                    <a href="#delete" onClick={() => handleDeleteRegion(region)}>
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

export default Region