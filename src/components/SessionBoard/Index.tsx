import React, { useEffect, useState } from 'react';
import { MdClose, MdChevronRight } from 'react-icons/md';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../Spinner';
import Swal from 'sweetalert2';

type Session = {
  id: number;
  room: string;
  startDate: any;
  endDate: any;
  cine: any;
  movie: any;
  cineId: number;
  movieId: number;
}

const SessionBoardCell: React.FC<{ session: Session | null, empty?: boolean, handleDeleteSession: (session: any) => void }> = ({ session, empty = false, handleDeleteSession }) => {
  const startHour = new Date(session?.startDate).getHours().toString().padStart(2, '0');
  const startMinutes = new Date(session?.startDate).getMinutes().toString().padStart(2, '0');
  const endHour = new Date(session?.endDate).getHours().toString().padStart(2, '0');
  const endMinutes = new Date(session?.endDate).getMinutes().toString().padStart(2, '0');

  return (
    <figure className="w-52 flex flex-col p-4 mb-3 bg-white border-dashed border-2 border-gray-300 rounded-lg cursor-pointer">
      <blockquote className="text-gray-500 text-left m-0">
        {empty && <p className="text-center">Sem sessões!</p>}
        {(!empty && session) && (
          <>
            <h3 className="text-md font-semibold text-gray-900 break-words">{session.movie.name}</h3>
            <p>Sala: {session.room}</p>
            <p>Início: {`${startHour}:${startMinutes}`}</p>
            <p>Fim: {`${endHour}:${endMinutes}`}</p>
            <div className="flex flex-row justify-end">
              <button
                type="button"
                onClick={() => handleDeleteSession(session)}
                className="text-white bg-red-700 hover:bg-red-800 active:bg-red-900 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-1"
              >
                <MdClose size={16} />
              </button>
              {/* <button type="button" className="text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 focus:outline-none font-medium rounded-lg text-sm p-1 text-center inline-flex items-center">
                <MdChevronRight size={16} />
              </button> */}
            </div>
          </>
        )}
      </blockquote>
    </figure>
  )
};

const SessionBoardColumn: React.FC<{ date: Date, sessions: Session[], handleDeleteSession: (session: any) => void }> = ({ date, sessions, handleDeleteSession }) => {
  const day = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dayNumber = date.getDate();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <strong className="font-medium text-md justify-center items-center text-gray-600 pb-4">
            {dayNumber} {day}
          </strong>
          <div className="flex flex-col items-center justify-center">
            {sessions.length === 0 && <SessionBoardCell handleDeleteSession={handleDeleteSession} session={null} empty />}
            {sessions.map(session => <SessionBoardCell key={session.id} session={session} handleDeleteSession={handleDeleteSession} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

const SessionBoard: React.FC<{ cineId: number }> = ({ cineId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStartDate, setWeekStartDate] = useState<Date | null>(null);
  const [weekEndDate, setWeekEndDate] = useState<Date | null>(null);
  const [weekDateList, setWeekDateList] = useState<Date[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

  const { token } = useAuth();

  useEffect(() => {
    // javascript code to get all sessions of the current week, starting from monday and ending on sunday based um selected Date
    const weekDateList = [];

    const weekStartDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay());
    const weekEndDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay() + 6);

    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay() + i);
      weekDateList.push(date);
    }

    setWeekDateList(weekDateList);
    setWeekStartDate(weekStartDate);
    setWeekEndDate(weekEndDate);

    setIsLoading(true);
    // Get sessions
    getSessions();
  }, [selectedDate])

  async function getSessions() {
    const { data } = await api.get(`/cine/${cineId}/sessions`, {
      headers: {
        Authorization: token
      },
      params: {
        date: selectedDate,
        startDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay()),
        endDate: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - selectedDate.getDay() + 7)
      }
    })

    setSessions(data.data);
    setIsLoading(false);
  }
  
  async function handleDeleteSession(session: any) {
    const result = await Swal.fire({
      title: `Você realmente deseja excluir essa sessão?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/session/${session.id}`, {
          headers: {
            Authorization: token
          }
        })

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `Sessão excluída com sucesso!`
        })
        getSessions()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          html: `Não foi possível excluir a sessão.`
        })
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* add a input to selected date */}
      <div className="flex flex-row items-center justify-end w-full pb-4">
        <button
          className="rounded group flex h-10 cursor-pointer items-center truncate py-2 px-4 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7))} // go to previous week
        >
          {"<"}
        </button>
        <strong className="font-bold text-xl justify-center items-center px-2">
          {weekStartDate?.toLocaleDateString()} - {weekEndDate?.toLocaleDateString()}
        </strong>
        <button
          className="rounded group flex h-10 cursor-pointer items-center truncate py-2 px-4 bg-amber-500 text-white outline-none hover:bg-amber-600 active:bg-amber-700"
          onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7))} // go to next week
        >
          {">"}
        </button>
      </div>
      {/* add a table to show all sessions of the current week */}
      <div className="w-full flex flex-row items-start justify-start gap-3 overflow-auto">
        {isLoading
          ? <Spinner />
          : weekDateList && weekDateList.map((date, index) => (
            <SessionBoardColumn
              key={index}
              date={date}
              sessions={sessions.filter(session => new Date(session.startDate).getDate() === date.getDate())}
              handleDeleteSession={handleDeleteSession}
            />
          ))
        }
      </div>
    </div>
  )
}

export default SessionBoard;