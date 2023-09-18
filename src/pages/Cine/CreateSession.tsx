import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"


function CreateSession() {
  document.title = 'Cinemais - Cadastrar Sessão'

  const currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

  const { token } = useAuth()
  const navigate = useNavigate();

  const params = useParams();
  const [movies, setMovies] = useState<{ id: number, name: string, duration: number }[]>([])

  const [selectedMovie, setSelectedMovie] = useState<{ id: number, name: string, duration: number } | null>(null)
  const [startDate, setStartDate] = useState<Date>(currentDate)
  const [endDate, setEndDate] = useState<Date>(currentDate)

  useEffect(() => {
    getMovies();
  }, [])

  useEffect(() => {
    if (selectedMovie && startDate) {
      console.log(selectedMovie.duration)
      console.log(startDate)
      const endDate = new Date(startDate.getTime() + selectedMovie.duration * 60000)
      endDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset())

      // @ts-ignore
      document.querySelector('input[name="endDate"]').value = endDate.toISOString().slice(0, 16)
    }
  }, [selectedMovie, startDate]);

  async function getMovies() {
    const { data } = await api.get('/movie', {
      headers: {
        Authorization: token
      }
    })

    setMovies(data.data)
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const room = event.target.elements["room"].value;
    const startDate = event.target.elements["startDate"].value;
    const endDate = event.target.elements["endDate"].value;
    const movieId = event.target.elements["movie"].value;
    const cineId = parseInt(params.id!);

    const response = await api.post(`/session`, {
      room,
      startDate,
      endDate,
      movieId: parseInt(movieId),
      cineId
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Sessão criada!`
      })

      navigate(`/cine/${cineId}`)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível criar a sessão.`
      })
    }
  }
  
  function handleChangeStartDate(event: any) {
    console.log(event.target.value)
    const startDate = new Date(event.target.value)

    setStartDate(startDate)
  }
  function handleChangeEndDate(event: any) {
    const endDate = new Date(event.target.value)

    setEndDate(endDate)
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
                  htmlFor="room"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Sala
                </label>
                <input
                  type="text"
                  name="room"
                  id="room"
                  placeholder="Ex: 1"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="movie"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Filme
                </label>
                <select
                  name="movie"
                  id="movie"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={selectedMovie?.id}
                  onChange={event => setSelectedMovie(movies.find(movie => movie.id === parseInt(event.target.value)) || null)}
                >
                  <option value="" disabled selected>Selecione o Filme</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="startDate"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Data de Início
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  defaultValue={startDate?.toISOString().slice(0, 16)}
                  onChange={handleChangeStartDate}
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="endDate"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Data de Fim
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  defaultValue={endDate?.toISOString().slice(0, 16)}
                  onChange={handleChangeEndDate}
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
