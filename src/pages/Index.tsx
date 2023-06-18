import { GiPopcorn } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-800 p-4" style={{
      backgroundImage: "url(https://img.freepik.com/premium-vector/cinema-pattern-seamless-background-with-symbols-cinema-films-production-vector-cinema-production-film-camera-entertainment-background-illustration_80590-13282.jpg)",
      backgroundRepeat: 'repeat',
      backgroundBlendMode: 'darken',
      backgroundPosition: '50% 50%'
    }}>
      <section id="login" className="max-w-md w-full flex flex-col justify-center">
        <h1 className="flex font-bold text-center text-white text-3xl mb-5 justify-center items-center">
          <span className="text-amber-400">
            <GiPopcorn size={32} />
          </span>
          Cinemais
          <span className="text-amber-400">+</span>
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={(event) => {event.preventDefault()}} className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" value={''} required />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Senha</label>
            <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" value={''} required />
            <button type="submit" className="transition duration-200 bg-amber-400 hover:bg-amber-600 focus:bg-amber-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Entrar</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-200 hover:bg-gray-400 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="inline-block ml-1">Retornar para tela inicial</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index