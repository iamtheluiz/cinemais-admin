import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


export function EditUser() {
  const { token } = useAuth()
  const navigate = useNavigate();

  const { state } = useLocation();
  
  if (!state) {
    navigate('/user')
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const id = event.target.elements["Id"].value;
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

    const response = await api.put(`/user/${id}`, {
      id: parseInt(id),
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
        html: `Usuário ${email} editado!`
      })

      navigate('/user')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível editar o usuário ${email}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Editar Usuário
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
                  defaultValue={state.firstName}
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
                  defaultValue={state.lastName}
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
                  <option value="" disabled>Selecione um Perfil</option>
                  <option value="Admin" selected={state.role === "Admin"}>Administrador</option>
                  <option value="Client" selected={state.role === "Client"}>Cliente</option>
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
                  defaultValue={state.email}
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
                  defaultValue={state.password}
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
                  defaultValue={state.password}
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
                Salvar
              </button>
            </footer>
          </form>
        </div>
      </div>
    </>
  )
}
