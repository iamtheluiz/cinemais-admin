import { GiPopcorn } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import BannerImage from '../assets/banner.png'
import { Button } from "@/components/ui/button";

import AvatarEnzo from '../assets/profiles/enzo.jpg'
import AvatarJovanny from '../assets/profiles/jovanny.jpg'
import AvatarLucas from '../assets/profiles/lucas.jpg'
import AvatarLuiz from '../assets/profiles/luiz.jpg'

function Index() {
  const navigate = useNavigate()

  const members = [
    {
      name: "Enzo Micael Silva Gaeta de Moraes",
      role: "DBA",
      ra: "519115051",
      avatar: AvatarEnzo
    },
    {
      name: "Jovanny Leite Marques da Silva",
      role: "PO e Desenvolvedor",
      ra: "51912766",
      avatar: AvatarJovanny
    },
    {
      name: "Lucas Galatro da Costa",
      role: "QA",
      ra: "51912782",
      avatar: AvatarLucas
    },
    {
      name: "Luiz Gustavo da Silva Vasconcellos",
      role: "Desenvolvedor",
      ra: "51913451",
      avatar: AvatarLuiz
    }
  ]

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
          <p className="text-muted font-medium">
            Gerencie cinemas e sessões de filmes de<br />modo prático e digital!
          </p>
          <div className="w-full flex flex-row justify-center gap-2">
            <Link to="/login" className="w-full">
              <Button className="text-foreground w-full">
                <span className="inline-block mr-2">Entrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Button variant="secondary" className="w-full">
              <span className="inline-block mr-2">Sobre o projeto</span>
              <FaAngleDown size={20} />
            </Button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={BannerImage} alt="Banner" className="w-full h-auto rounded-lg shadow-2xl" />
        </div>
      </section>
      <section id="sobre" className="bg-white min-w-screen w-full flex flex-col justify-center rounded-lg p-4">
        <h1 className="flex font-bold text-center text-gray-700 text-2xl mb-5 justify-center items-center">
          Sobre o projeto
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

        <div className="flex flex-row justify-center gap-4 flex-wrap">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-2 sm:w-64 text-center">
              <img src={member.avatar} alt="Avatar" className="rounded-full w-32 h-32" />
              <span className="text-gray-700 font-bold">{member.name}</span>
              <span className="text-gray-700">{member.role}</span>
              <span className="text-gray-700">RA: {member.ra}</span>
            </div>
          ))}
        </div>
      </section>
      <span className="text-gray-100 mt-4">© Copyright 2023 - Todos os direitos reservados a Cinemais</span>
    </div>
  )
}

export default Index