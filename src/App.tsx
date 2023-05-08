import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import RestrictedRoute from "./components/RestrictedRoute";
import User from "./pages/user/User";
import CreateUser from "./pages/user/CreateUser";

function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/" element={<RestrictedRoute />}>
        <Route path="home" element={<Home />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="user" element={<User />} />
      </Route>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
