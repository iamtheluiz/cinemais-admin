import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


function EditCast() {
  document.title = 'Cinemais - Editar Ator'

  const { token } = useAuth()
  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    navigate('/cast')
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const id = event.target.elements["Id"].value;
    const name = event.target.elements["Name"].value;
    const picture = event.target.elements["Picture"].value;
    const bio = event.target.elements["Bio"].value;

    const response = await api.put(`/cast/${id}`, {
      name,
      picture,
      bio
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Ator(a) ${name} editado!`
      })

      navigate('/cast')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível editar o ator(a) ${name}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Editar Ator(a)
            </h1>
            <div className="w-full">
              <input
                type="hidden"
                name="Id"
                id="Id"
                defaultValue={state.id}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
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
                  placeholder="Ex: Maria Luiza"
                  defaultValue={state.name}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Picture"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Foto
                </label>
                <input
                  type="text"
                  name="Picture"
                  id="Picture"
                  placeholder="Ex: https://cinemais.com.br/picture.png"
                  defaultValue={state.picture}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Bio"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Biografia
                </label>
                <textarea
                  name="Bio"
                  id="Bio"
                  placeholder="Ex: Lorem!"
                  defaultValue={state.bio}
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
                  navigate('/cast');
                }}
              >
                Cancelar
              </button>
              <button
                className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
                type="submit"
              >
                Salvar
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditCast
