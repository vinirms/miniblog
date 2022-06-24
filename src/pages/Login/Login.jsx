import styles from "./Login.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../Hooks/useAutenticacao";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, carregamento } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      senha,
    };

    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <main className={styles.login_body}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_itens}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.form_itens}>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            name="senha"
            required
            placeholder="Insira seu senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && <p className="erro-form">{error}</p>}
        </div>

        {!carregamento && <button className="btn-post-about">Entrar</button>}
        {carregamento && (
          <button className="disable-form-submit" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </main>
  );
};

export default Login;
