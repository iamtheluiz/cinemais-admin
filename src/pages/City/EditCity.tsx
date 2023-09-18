import { useState, useEffect, ChangeEvent } from 'react';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import { Marker, MapContainer, TileLayer, useMapEvents, Popup } from "react-leaflet";
import { IoMdCloseCircle } from 'react-icons/io'

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"

function LocationMarker({ selectedPosition, setSelectedPosition }: { selectedPosition: [number, number] | null, setSelectedPosition: (position: [number, number]) => void }) {
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      setSelectedPosition([lat, lng]);
    }
  })

  return selectedPosition === null ? null : (
    <Marker position={{ lat: selectedPosition[0], lng: selectedPosition[1] }}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

function EditCity() {
  document.title = 'Cinemais - Editar Cidade'

  const { state } = useLocation()
  const navigate = useNavigate();

  if (!state) {
    navigate('/region')
  }

  const [
    initialPosition,
    setInitialPosition
  ] = useState<[number, number] | null>([parseFloat(state.latitude), parseFloat(state.longitude)]);
  const [
    selectedPosition,
    setSelectedPosition
  ] = useState<[number, number] | null>([parseFloat(state.latitude), parseFloat(state.longitude)]);

  const [regions, setRegions] = useState<{ id: number, name: string }[]>([])
  const [selectedRegions, setSelectedRegions] = useState<{ id: number, name: string }[]>([])

  const { token } = useAuth()

  // Map Position
  useEffect(() => {
    getRegions();
  }, [])

  useEffect(() => {
    if (regions.length > 0) {
      setPreviousSelectedRegions()
    }
  }, [regions]);

  async function getRegions() {
    const { data } = await api.get('/region', {
      headers: {
        Authorization: token
      },
      params: {
        all: true
      }
    })

    setRegions(data.data)
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    const name = event.target.elements["Name"].value;

    if (selectedPosition === null) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `É obrigatório escolher uma posição no mapa!`
      })
      return;
    }

    if (selectedRegions.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `É obrigatório escolher uma região para a cidade!`
      })
      return;
    }

    console.log(selectedRegions)

    const response = await api.put(`/city/${state.id}`, {
      name,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
      regions: selectedRegions
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Cidade ${name} editada!`
      })

      navigate('/city')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível editar a cidade ${name}.`
      })
    }
  }
  

  function setPreviousSelectedRegions() {
    setSelectedRegions([...state.regions])
  }

  function handleSelectRegion(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value !== "") {
      const regionId = parseInt(event.target.value);
      const selectedRegion = regions.filter(region => region.id === regionId)[0];

      setSelectedRegions([...selectedRegions, selectedRegion])
      event.target.value = "";
    }
  }

  function handleUnselectRegion(unselectedRegion: { id: number, name: string }) {
    const serializedSelectedRegions = selectedRegions.filter(region => region.id !== unselectedRegion.id);

    setSelectedRegions([...serializedSelectedRegions])
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Criar Cidade
            </h1>
            <div className="w-full">
              <input
                type="hidden"
                name="Id"
                id="Id"
                value={state.id}
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
                  placeholder="Ex: Itanhaém"
                  defaultValue={state.name}
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
                  Localização
                </label>
                <div
                  className="w-full rounded-md border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  {(initialPosition !== null) && (
                    <MapContainer
                      center={{
                        lat: initialPosition[0],
                        lng: initialPosition[1],
                      }}
                      zoom={13}
                      zoomControl={false}
                      style={{ height: 300, borderRadius: "0.375rem" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} />
                    </MapContainer>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Regions"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Regiões
                </label>
                <ul className="flex flex-row flex-wrap items-center gap-2 mb-2">
                  {selectedRegions.map(region => (
                    <li className="flex flex-row items-center gap-1 bg-rose-800 px-2 py-1 rounded text-white">
                      {region.name}
                      <IoMdCloseCircle className='cursor-pointer' size={16} color="#FFF" onClick={() => handleUnselectRegion(region)} />
                    </li>
                  ))}
                </ul>
                <select
                  name="Regions"
                  id="Regions"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={handleSelectRegion}
                >
                  <option value="" disabled selected>Selecione as Regiões</option>
                  {regions.filter(region => !selectedRegions.map(item => item.id).includes(region.id)).map(region => (
                    <option value={region.id}>{region.name}</option>
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
                  navigate('/city');
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

export default EditCity
