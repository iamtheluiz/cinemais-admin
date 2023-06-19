import { useCallback, useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useNavigate, useParams } from "react-router-dom";

import SessionBoard from "../../components/SessionBoard/Index";


function CineManagement() {
  const [cine, setCine] = useState<null | { name: string, id: number }>(null);
  const { token, role } = useAuth();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getCine()
    }
  }, [token])

  const getCine = useCallback(async () => {
    const { data } = await api.get(`/cine/${params.id}`, {
      headers: {
        Authorization: token
      }
    })

    setCine(data.data)
  }, [params.id])

  if (cine) return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          {cine.name}
        </h1>
        {role === 'Admin' && (
          <button
            className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
            onClick={() => navigate(`/cine/${params.id}/session/create`)}
          >
            Criar Sessão
          </button>
        )}
      </div>
      <div className="rounded-lg border border-gray-200 shadow-md p-4" style={{ height: "auto" }}>
        <SessionBoard cineId={cine.id} />
      </div>
    </>
  )

  return (
    <></>
  );
}

export default CineManagement