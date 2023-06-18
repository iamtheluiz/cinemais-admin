import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate, useParams } from "react-router-dom";

import SessionBoard from "../../components/SessionBoard/Index";


function CineManagement() {
  const [cine, setCine] = useState<null | { name: string, id: number }>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openMovies, setOpenMovies] = useState([]);
  const { token } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCine()
      getOpenMovies()
    }
  }, [token, selectedDate])

  const getCine = useCallback(async () => {
    const { data } = await api.get(`/cine/${params.id}`, {
      headers: {
        Authorization: token
      }
    })

    setCine(data.data)
  }, [params.id])

  async function getOpenMovies() {
    const { data } = await api.get(`/cine/${params.id}/open`, {
      headers: {
        Authorization: token
      },
      params: {
        date: selectedDate
      }
    })

    setOpenMovies(data.data)
  }

  if (cine) return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          {cine.name}
        </h1>
        <button
          className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
          onClick={() => navigate(`/cine/${params.id}/session/create`)}
        >
          Criar Sessão
        </button>
      </div>
      <div className="rounded-lg border border-gray-200 shadow-md p-4" style={{ height: "auto" }}>
        <SessionBoard cineId={cine.id} />
        {/* {openMovies.length === 0 && (
            <div className="flex flex-row items-center justify-center">
              <h1 className="font-bold text-3xl justify-center items-center">
                Não há sessões para esta data
              </h1>
            </div>
          )}
          {openMovies.length > 0 && (
            <>
              <h2 className="text-xl font-bold">Em Cartaz</h2>
              <div className="flex flex-row flex-wrap items-center gap-2 py-4">
                {openMovies.map((session: any) => (
                  <img src={`${session.movie.cover}`} className="rounded" style={{ width: 'auto', height: 260 }} />
                ))}
              </div>
            </>
          )} */}
      </div>
    </>
  )

  return (
    <></>
  );
}

export default CineManagement