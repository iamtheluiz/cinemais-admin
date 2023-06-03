import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


function CreateSession() {
  const { token } = useAuth()
  const navigate = useNavigate();
  const params = useParams();

  const [cities, setCities] = useState<{ id: number, name: string }[]>([])

  // Map Position
  useEffect(() => {
    getCities();
  }, [])

  async function getCities() {
    const { data } = await api.get('/city', {
      headers: {
        Authorization: token
      }
    })

    setCities(data.data)
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const name = event.target.elements["Name"].value;
    const logo = event.target.elements["Logo"].value;
    const cityId = event.target.elements["CityId"].value;

    const response = await api.post('/cine', {
      name,
      logo,
      cityId: parseInt(cityId)
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Cinema ${name} criado!`
      })

      navigate('/cine')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível criar o cinema ${name}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Criar Sessão
            </h1>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Room"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Sala
                </label>
                <input
                  type="text"
                  name="Room"
                  id="Room"
                  placeholder="Ex: 1"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Room"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Data de Início
                </label>
                <input
                  type="text"
                  name="Room"
                  id="Room"
                  placeholder="Ex: 1"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Room"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Data de Início
                </label>
                <input
                  type="text"
                  name="Room"
                  id="Room"
                  placeholder="Ex: 1"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <footer className="flex flex-row items-center justify-center gap-2">
              <button
                className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-gray-400 text-white outline-none hover:bg-gray-500 active:bg-gray-600"
                type="reset"
                onClick={event => {
                  event.preventDefault();
                  navigate(`/cine/${params.id}`);
                }}
              >
                Cancelar
              </button>
              <button
                className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
                type="submit"
              >
                Criar
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateSession
