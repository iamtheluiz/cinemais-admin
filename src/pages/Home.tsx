import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../services/api"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"

function Home() {
  const [dashboard, setDashboard] = useState<any>()
  const { token } = useAuth()

  useEffect(() => {
    async function getDashboards() {
      const { data } = await api.get('/home/dashboard', {
        headers: {
          Authorization: token
        }
      })

      setDashboard(data.data)
    }

    if (token) {
      getDashboards()
    }
  }, [token])

  return (
    <>
      <h1 className="font-bold text-3xl mb-5 justify-center items-center">
        Página Inicial
      </h1>
      <div className="flex flex-col overflow-x-auto">
        <div className="bg-white py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-8 text-center lg:grid-cols-4">
              <Link to="/user">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-emerald-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Usuários</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.userCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/movie">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-sky-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Filmes</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.movieCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/cine">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-violet-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Cinemas</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.cineCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/genre">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-orange-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Gêneros</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.genreCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/cast">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-purple-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Atores</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.castCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/city">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-fuchsia-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Cidades</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.cityCount || <Spinner />}</dd>
                </div>
              </Link>
              <Link to="/region">
                <div className="mx-auto flex w-full flex-col gap-y-4 p-4 bg-rose-500 rounded">
                  <dt className="text-base leading-7 text-gray-100">Regiões</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{dashboard?.regionCount || <Spinner />}</dd>
                </div>
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
