//css
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

//hooks
import { useAutenticacaoValue } from "../../contexto/AutenticacaoContext";
import { useAuthentication } from "../../Hooks/useAutenticacao";

const NavBar = () => {
  const { user } = useAutenticacaoValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.barra_navegacao}>
      <div className={styles.logo}>
        <span className={styles.mini}>Mini</span>
        <span className={styles.blog}>Blog</span>
      </div>

      <button className={styles.btn_mobile}>
        <div className={styles.trace_mobile}></div>
        <div className={styles.trace_mobile}></div>
        <div className={styles.trace_mobile}></div>
      </button>
      <ul className={styles.container_itens}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/registro"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/criarpost"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li className={styles.logout}>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
