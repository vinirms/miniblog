import { useEffect, useState } from "react";
import { useAuthentication } from "../../Hooks/useAutenticacao";

import styles from "./Registro.module.css";

const Registro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [error, setError] = useState("");

  const { criarUsuario, error: authError, carregamento } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const user = {
      displayName,
      email,
      senha,
    };

    if (senha !== confirmeSenha) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    const res = await criarUsuario(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <main className={styles.registro_body}>
      <h3>Realize seu cadastro</h3>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.form_itens}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            required
            placeholder="Insira seu nome"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
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
        <div className={styles.form_itens}>
          <label htmlFor="confirmeSenha">Confirmação de Senha:</label>
          <input
            type="password"
            name="confirmeSenha"
            required
            placeholder="Confirme sua senha"
            value={confirmeSenha}
            onChange={(e) => setConfirmeSenha(e.target.value)}
          />
          {error && <p className="erro-form">{error}</p>}
        </div>
        {!carregamento && <button className="btn-post-about">Registrar</button>}
        {carregamento && (
          <button className="btn-post-about disable-form-submit" disabled>
            Aguarde
          </button>
        )}
      </form>
    </main>
  );
};

export default Registro;
