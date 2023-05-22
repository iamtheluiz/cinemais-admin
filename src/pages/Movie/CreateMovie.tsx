import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


function CreateMovie() {
  const { token } = useAuth()
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const name = event.target.elements["Name"].value;
    const synopsis = event.target.elements["Synopsis"].value;
    const trailer = event.target.elements["Trailer"].value;
    const cover = event.target.elements["Cover"].value;
    const duration = event.target.elements["Duration"].value;

    const response = await api.post('/movie', {
      name,
      synopsis,
      trailer,
      cover,
      duration,
      genres: [],
      sessions: [],
      cast: []
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Filme ${name} criado!`
      })

      navigate('/movie')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível criar o filme ${name}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Criar Filme
            </h1>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Name"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="Ex: Cinemais"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Synopsis"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Sinopse
                </label>
                <textarea
                  name="Synopsis"
                  id="Synopsis"
                  placeholder="Ex: Lorem ipsum!"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Trailer"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Trailer URL
                </label>
                <input
                  type="text"
                  name="Trailer"
                  id="Trailer"
                  placeholder="Ex: Cinemais"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Cover"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Capa
                </label>
                <input
                  type="text"
                  name="Cover"
                  id="Cover"
                  placeholder="Ex: https://cinemais.com.br/logo.png"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Duration"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Duração (em minutos)
                </label>
                <input
                  type="number"
                  name="Duration"
                  id="Duration"
                  placeholder="Ex: https://cinemais.com.br/logo.png"
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
                  navigate('/movie');
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

export default CreateMovie
