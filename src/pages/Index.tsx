import { GiPopcorn } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import BannerImage from '../assets/banner.png'

function Index() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-800 p-4" style={{
      backgroundImage: "url(https://img.freepik.com/premium-vector/cinema-pattern-seamless-background-with-symbols-cinema-films-production-vector-cinema-production-film-camera-entertainment-background-illustration_80590-13282.jpg)",
      backgroundRepeat: 'repeat',
      backgroundBlendMode: 'darken'
    }}>
      <section id="login" className="py-4 min-h-screen max-w-6xl w-full flex flex-row justify-center gap-4 sm:flex-col md:flex-row">
        <div className="w-full flex flex-col justify-center gap-8">
          <h1 className="flex font-bold text-left text-white text-6xl items-center">
            <span className="text-amber-400">
              <GiPopcorn />
            </span>
            Cinemais
            <span className="text-amber-400">+</span>
          </h1>
          <p className="text-gray-100 text-xl font-medium text-left drop-shadow-lg">
            Gerencie cinemas e sessões de filmes de<br />modo prático e digital!
          </p>
          <div className="w-full flex flex-row justify-center gap-2">
            <Link to="/login" type="button" className="transition duration-200 bg-amber-400 hover:bg-amber-600 focus:bg-amber-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Entrar</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <button type="button" className="flex justify-center transition duration-200 bg-green-400 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Sobre o projeto</span>
              <FaAngleDown size={20} />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={BannerImage} alt="Banner" className="w-full h-auto rounded-lg shadow-2xl" />
        </div>
      </section>
      <section id="sobre" className="bg-white min-w-screen w-full flex flex-col justify-center rounded-lg p-4">
        <h1 className="flex font-bold text-center text-gray-700 text-2xl mb-5 justify-center items-center">
          Sobre o projeto
          <div className="ml-2 flex justify-center items-center text-white bg-rose-800 p-1 rounded">
            <span className="text-amber-400">
              <GiPopcorn />
            </span>
            Cinemais
            <span className="text-amber-400">+</span>
          </div>
        </h1>
        <p className="text-gray-700 text-center">
          O Cinemais é um projeto de conclusão de curso do curso de Engenharia da Computação da Universidade São Judas Tadeu - Campus Unimonte.
        </p>
        <p className="text-gray-700 text-center">
          Este projeto envolve um sistema de gerenciamento de cinema, que possibilita o cadastro, edição e exclusão de informações relacionadas a filmes, salas, sessões e usuários.
        </p>
        <p className="text-gray-700 text-center">
          Para sua implementação, foram empregadas as tecnologias ReactJS, NodeJS e SQLite.
        </p>
        <h1 className="flex font-bold text-center text-gray-700 text-2xl mt-5 mb-2 justify-center items-center">
          Integrantes
        </h1>
        <div className="p-4 bg-white rounded-lg" id="stats" role="tabpanel" aria-labelledby="stats-tab">
          <dl className="grid max-w-2xl grid-cols-2 gap-8 pb-4 mx-auto text-gray-900 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center text-center">
              <dd className="text-gray-500">Enzo Micael Silva Gaeta de Moraes</dd>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <dd className="text-gray-500">Jovanny Leite Marques da Silva</dd>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <dd className="text-gray-500">Lucas Galatro da Costa</dd>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <dd className="text-gray-500">Luiz Gustavo da Silva Vasconcellos</dd>
            </div>
          </dl>
        </div>
      </section>
      <span className="text-gray-100 mt-4">© Copyright 2023 - Todos os direitos reservados a Cinemais</span>
    </div>
  )
}

export default Index