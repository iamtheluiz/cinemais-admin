import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RestrictedRoute from "./components/RestrictedRoute";
import User from "./pages/User/User";
import CreateUser from "./pages/User/CreateUser";
import Cine from "./pages/Cine/Cine";
import CreateCine from "./pages/Cine/CreateCine";
import CreateCity from "./pages/City/CreateCity";
import City from "./pages/City/City";
import Region from "./pages/Region/Region";
import CreateRegion from "./pages/Region/CreateRegion";
import CreateMovie from "./pages/Movie/CreateMovie";
import Movie from "./pages/Movie/Movie";
import CreateGenre from "./pages/Genre/CreateGenre";
import Genre from "./pages/Genre/Genre";
import CreateCast from "./pages/Cast/CreateCast";
import Cast from "./pages/Cast/Cast";
import CineManagement from "./pages/Cine/CineManagement";
import CreateSession from "./pages/Cine/CreateSession";

function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/" element={<RestrictedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="user" element={<User />} />
        <Route path="cine/create" element={<CreateCine />} />
        <Route path="cine/:id/session/create" element={<CreateSession />} />
        <Route path="cine/:id" element={<CineManagement />} />
        <Route path="cine" element={<Cine />} />
        <Route path="city/create" element={<CreateCity />} />
        <Route path="city" element={<City />} />
        <Route path="region/create" element={<CreateRegion />} />
        <Route path="region" element={<Region />} />
        <Route path="movie/create" element={<CreateMovie />} />
        <Route path="movie" element={<Movie />} />
        <Route path="genre/create" element={<CreateGenre />} />
        <Route path="genre" element={<Genre />} />
        <Route path="cast/create" element={<CreateCast />} />
        <Route path="cast" element={<Cast />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
