import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import { Marker, MapContainer, TileLayer, useMapEvents, Popup } from "react-leaflet";

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

function EditRegion() {
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

  const { token } = useAuth()

  async function handleSubmit(event: any) {
    event.preventDefault();

    const id = event.target.elements["Id"].value;
    const name = event.target.elements["Name"].value;

    if (selectedPosition === null) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `É obrigatório escolher uma posição no mapa!`
      })
      return;
    }

    const response = await api.put(`/region/${state.id}`, {
      name,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1]
    }, {
      headers: {
        Authorization: token
      }
    })

    if (response.data.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `Região ${name} editada!`
      })

      navigate('/region')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        html: `Não foi possível editar a região ${name}.`
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md w-full" style={{ maxWidth: 600 }}>
          <form onSubmit={handleSubmit} className="p-6">
            <h1 className="font-bold text-3xl justify-center items-center mb-4">
              Editar Região
            </h1>
            <div className="w-full">
              <input
                type="hidden"
                name="Id"
                id="Id"
                defaultValue={state.id}
                required
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
                  placeholder="Ex: Baixada Santista"
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
            <footer className="flex flex-row items-center justify-center gap-2">
              <button
                className="rounded group flex h-10 cursor-pointer items-center truncate py-4 px-6 bg-gray-400 text-white outline-none hover:bg-gray-500 active:bg-gray-600"
                type="reset"
                onClick={event => {
                  event.preventDefault();
                  navigate('/region');
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

export default EditRegion
