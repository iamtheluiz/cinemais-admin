import { Routes, Route, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RestrictedRoute from "./components/RestrictedRoute";
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
import Index from "./pages/Index";
import EditGenre from "./pages/Genre/EditGenre";
import EditRegion from "./pages/Region/EditRegion";
import EditCity from "./pages/City/EditCity";
import EditCast from "./pages/Cast/EditCast";
import EditCine from "./pages/Cine/EditCine";

import { User } from "./pages/User/User";
import { CreateUser } from "./pages/User/CreateUser";
import { EditUser } from "./pages/User/EditUser";

function AdminRoute({ returnTo, children }: { returnTo: string, children: React.ReactNode }) {
  const { role } = useAuth();

  if (role !== 'Admin') {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      html: `Você não tem permissão para acessar essa página.`
    })
    return <Navigate to={returnTo} />
  }

  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RestrictedRoute />}>
        <Route path="home" element={<Home />} />
        <Route
          path="user/create"
          element={
            <AdminRoute returnTo="/user">
              <CreateUser />
            </AdminRoute>
          }
        />
        <Route
          path="user/edit/:id"
          element={
            <AdminRoute returnTo="/user">
              <EditUser />
            </AdminRoute>
          }
        />
        <Route path="user" element={<User />} />
        <Route
          path="cine/create"
          element={
            <AdminRoute returnTo="/cine">
              <CreateCine />
            </AdminRoute>
          }
        />
        <Route
          path="cine/edit/:id"
          element={
            <AdminRoute returnTo="/cine">
              <EditCine />
            </AdminRoute>
          }
        />
        <Route
          path="cine/:id/session/create"
          element={
            <AdminRoute returnTo="/cine">
              <CreateSession />
            </AdminRoute>
          }
        />
        <Route path="cine/:id" element={<CineManagement />} />
        <Route path="cine" element={<Cine />} />
        <Route
          path="city/create"
          element={
            <AdminRoute returnTo="/city">
              <CreateCity />
            </AdminRoute>
          }
        />
        <Route
          path="city/edit/:id"
          element={
            <AdminRoute returnTo="/city">
              <EditCity />
            </AdminRoute>
          }
        />
        <Route path="city" element={<City />} />
        <Route
          path="region/create"
          element={
            <AdminRoute returnTo="/region">
              <CreateRegion />
            </AdminRoute>
          }
        />
        <Route
          path="region/edit/:id"
          element={
            <AdminRoute returnTo="/region">
              <EditRegion />
            </AdminRoute>
          }
        />
        <Route path="region" element={<Region />} />
        <Route
          path="movie/create"
          element={
            <AdminRoute returnTo="/movie">
              <CreateMovie />
            </AdminRoute>
          }
        />
        <Route path="movie" element={<Movie />} />
        <Route
          path="genre/create"
          element={
            <AdminRoute returnTo="/genre">
              <CreateGenre />
            </AdminRoute>
          }
        />
        <Route
          path="genre/edit/:id"
          element={
            <AdminRoute returnTo="/genre">
              <EditGenre />
            </AdminRoute>
          }
        />
        <Route path="genre" element={<Genre />} />
        <Route
          path="cast/create"
          element={
            <AdminRoute returnTo="/cast">
              <CreateCast />
            </AdminRoute>
          }
        />
        <Route
          path="cast/edit/:id"
          element={
            <AdminRoute returnTo="/cast">
              <EditCast />
            </AdminRoute>
          }
        />
        <Route path="cast" element={<Cast />} />
      </Route>
      <Route index path="/" element={<Index />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
