import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"

function Home() {
  const [users, setUsers] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get('/user', {
        headers: {
          Authorization: token
        }
      })

      setUsers(data.data)
    }

    if (token) {
      getUsers()
    }
  }, [token])

  return (
    <>
      <h1 className="font-bold text-3xl mb-5 justify-center items-center">
        Página Inicial
      </h1>
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Primeiro Nome</th>
                    <th scope="col" className="px-6 py-4">Último Nome</th>
                    <th scope="col" className="px-6 py-4">E-mail</th>
                    <th scope="col" className="px-6 py-4">Perfil</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr className="border-b dark:border-neutral-500" key={user.id}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{user.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.firstName}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.lastName}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                      <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
