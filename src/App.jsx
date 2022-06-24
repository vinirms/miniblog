import "./App.css";
import {
  BrowserRouter,
  Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./Hooks/useAutenticacao";

//Paginas
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Dashboard from "./pages/Dashboard/Dashboard";
import CriarPost from "./pages/CreatePost/CriarPost";
import Pesquisa from "./pages/Pesquisa/Pesquisa";
import PostUnico from "./pages/PostUnico/PostUnico";
import EditarPost from "./pages/EditarPost/EditarPost";

//contexto
import { AutenticacaoProvider } from "./contexto/AutenticacaoContext";
//componentes
import NavBar from "./componentes/NavBar/NavBar";
import Rodape from "./componentes/Rodape/Rodape";

function App() {
  const [user, setUser] = useState(undefined);
  const { autenticacao } = useAuthentication();
  const carregandoUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(autenticacao, (user) => {
      setUser(user);
    });
  }, [autenticacao]);

  if (carregandoUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AutenticacaoProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/post/:id" element={<PostUnico />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/registro"
              element={<Registro />}
              // element={!user ? <Registro /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/criarpost/"
              element={user ? <CriarPost /> : <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <Pesquisa /> : <Navigate to="/login" />}
            />
            <Route
              path="/post/edit/:id"
              element={user ? <EditarPost /> : <Navigate to="/login" />}
            />
          </Routes>
          <Rodape />
        </BrowserRouter>
      </AutenticacaoProvider>
    </>
  );
}

export default App;
