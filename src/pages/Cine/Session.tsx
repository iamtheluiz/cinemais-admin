import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { useParams } from "react-router-dom";


function Session() {
  const [cine, setCine] = useState({} as { name: string });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [session, setSessions] = useState([]);
  const { token } = useAuth();

  const params = useParams();

  useEffect(() => {
    if (token) {
      getCine()
      getSessions()
    }
  }, [token, selectedDate])

  async function getCine() {
    const { data } = await api.get(`/cine/${params.id}`, {
      headers: {
        Authorization: token
      }
    })

    setCine(data.data)
  }

  async function getSessions() {
    const { data } = await api.get(`/cine/${params.id}/sessions`, {
      headers: {
        Authorization: token
      },
      params: {
        date: selectedDate
      }
    })

    setSessions(data.data)
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="font-bold text-3xl justify-center items-center">
          Sessões - {cine.name}
        </h1>
      </div>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date as Date)} />
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        {session.length === 0 && (
          <div className="flex flex-row items-center justify-center">
            <h1 className="font-bold text-3xl justify-center items-center">
              Não há sessões para esta data
            </h1>
          </div>
        )}
        {JSON.stringify(session)}
      </div>
    </>
  )
}

export default Session