import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


export function CreateUser() {
  document.title = 'Cinemais - Cadastrar Usuário'

  const [users, setUsers] = useState([])
  const { token } = useAuth()
  const navigate = useNavigate();

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

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

  async function handleSubmit(event: any) {
    event.preventDefault();

    const firstName = event.target.elements["FirstName"].value;
    const lastName = event.target.elements["LastName"].value;
    const role = event.target.elements["Role"].value;
    const email = event.target.elements["Email"].value;
    const password = event.target.elements["Password"].value;
    const confirmPassword = event.target.elements["ConfirmPassword"].value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `As senhas informadas não são iguais!`
      })
      return;
    }

    const response = await api.post('/user', {
      firstName,
      lastName,
      role,
      email,
      password
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Usuário ${email} criado!`
      })

      navigate('/user')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível criar o usuário ${email}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Criar Usuário
            </h1>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="FirstName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Primeiro Nome
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="FirstName"
                  placeholder="Ex: João"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="LastName"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Último Nome
                </label>
                <input
                  type="text"
                  name="LastName"
                  id="LastName"
                  placeholder="Ex: Alves"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Role"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Perfil
                </label>
                <select
                  name="Role"
                  id="Role"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="" disabled selected>Selecione um Perfil</option>
                  <option value="Admin">Administrador</option>
                  <option value="Client">Cliente</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Ex: joao.alves@mail.com"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Password"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="Password"
                  id="Password"
                  placeholder="Digite uma senha"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="ConfirmPassword"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Confirmação de Senha
                </label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  id="ConfirmPassword"
                  placeholder="Confirme a Senha anterior"
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
                  navigate('/user');
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
