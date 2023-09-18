import { useState, useEffect, ChangeEvent } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"
import { IoMdCloseCircle } from 'react-icons/io';


function CreateMovie() {
  document.title = 'Cinemais - Cadastrar Filme'

  const { token } = useAuth()
  const navigate = useNavigate();

  const [trailer, setTrailer] = useState<string>("")
  const [cover, setCover] = useState<string>("")

  const [genres, setGenres] = useState<{ id: number, name: string }[]>([])
  const [selectedGenres, setSelectedGenres] = useState<{ id: number, name: string }[]>([])

  const [casts, setCasts] = useState<{ id: number, name: string, picture: string }[]>([])
  const [selectedCasts, setSelectedCasts] = useState<{ id: number, name: string, picture: string }[]>([])

  useEffect(() => {
    getGenres();
    getCasts();
  }, [])

  async function getGenres() {
    const { data } = await api.get('/genre', {
      headers: {
        Authorization: token
      },
      params: {
        all: true
      }
    })

    setGenres(data.data)
  }

  function handleSelectGenre(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value !== "") {
      const genreId = parseInt(event.target.value);
      const selectedGenre = genres.filter(genre => genre.id === genreId)[0];

      setSelectedGenres([...selectedGenres, selectedGenre])
      event.target.value = "";
    }
  }

  function handleUnselectGenre(unselectedGenre: { id: number, name: string }) {
    const serializedSelectedGenres = selectedGenres.filter(genre => genre.id !== unselectedGenre.id);

    setSelectedGenres([...serializedSelectedGenres])
  }

  async function getCasts() {
    const { data } = await api.get('/cast', {
      headers: {
        Authorization: token
      },
      params: {
        all: true
      }
    })

    setCasts(data.data)
  }

  function handleSelectCast(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value !== "") {
      const castId = parseInt(event.target.value);
      const selectedCast = casts.filter(cast => cast.id === castId)[0];

      setSelectedCasts([...selectedCasts, selectedCast])
      event.target.value = "";
    }
  }

  function handleUnselectCast(unselectedCast: { id: number, name: string }) {
    const serializedSelectedCasts = selectedCasts.filter(cast => cast.id !== unselectedCast.id);

    setSelectedCasts([...serializedSelectedCasts])
  }

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
      genres: selectedGenres,
      sessions: [],
      cast: selectedCasts
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
                  htmlFor="Genres"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Gêneros
                </label>
                <ul className="flex flex-row flex-wrap items-center gap-2 mb-2">
                  {selectedGenres.map(genre => (
                    <li className="flex flex-row items-center gap-1 bg-rose-800 px-2 py-1 rounded text-white">
                      {genre.name}
                      <IoMdCloseCircle className='cursor-pointer' size={16} color="#FFF" onClick={() => handleUnselectGenre(genre)} />
                    </li>
                  ))}
                </ul>
                <select
                  name="Genres"
                  id="Genres"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleSelectGenre}
                >
                  <option value="" disabled selected>Selecione os Gêneros</option>
                  {genres.filter(genre => !selectedGenres.includes(genre)).map(genre => (
                    <option value={genre.id}>{genre.name}</option>
                  ))}
                </select>
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
                  placeholder="Ex: Uma breve descrição sobre o filme"
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
                  placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  required
                  onChange={event => setTrailer(event.target.value)}
                  value={trailer}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {trailer !== "" && (
                  <div className="h-80 relative flex justify-center items-center border-2 border-dashed mt-1 p-2 rounded-lg">
                    <p className="w-full text-gray-500 text-center">Insira um vídeo <br/>embutido válido!</p>
                    <iframe className="absolute w-full h-80 rounded-lg" src={trailer} />
                  </div>
                )}
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
                  onChange={event => setCover(event.target.value)}
                  value={cover}
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
                  placeholder="Ex: 112"
                  required
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Casts"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Atores
                </label>
                <ul className="flex flex-row flex-wrap items-center gap-2 mb-2">
                  {selectedCasts.map(cast => (
                    <li className="flex flex-row items-center gap-1 bg-rose-800 px-2 py-1 rounded text-white">
                      <img className="h-12 w-auto rounded" src={cast.picture} alt="Foto" />
                      {cast.name}
                      <IoMdCloseCircle className='cursor-pointer' size={16} color="#FFF" onClick={() => handleUnselectCast(cast)} />
                    </li>
                  ))}
                </ul>
                <select
                  name="Casts"
                  id="Casts"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleSelectCast}
                >
                  <option value="" disabled selected>Selecione os Atores</option>
                  {casts.filter(cast => !selectedCasts.includes(cast)).map(cast => (
                    <option value={cast.id}>{cast.name}</option>
                  ))}
                </select>
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
