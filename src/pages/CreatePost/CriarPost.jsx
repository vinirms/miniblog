import styles from "./CriarPost.module.css";

//hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacaoValue } from "../../contexto/AutenticacaoContext";
import { useInserirPost } from "../../Hooks/useInserirPost";

const CriarPost = () => {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);
  const [erros, setErros] = useState("");
  const { user } = useAutenticacaoValue();
  const { inserirDocumento, resposta } = useInserirPost("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErros("");

    //validar url da imagem
    try {
      new URL(imagem);
    } catch (error) {
      setErros("A imagem precisa ter uma URL");
    }

    //array de tags
    const listaTags = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (erros) return;

    inserirDocumento({
      titulo,
      imagem,
      bio,
      listaTags,
      uid: user.uid,
      criadoPor: user.displayName,
    });

    //redirecionar para home pos post
    navigate("/");
  };

  return (
    <main className={styles.post_container}>
      <h2>Criar Post</h2>
      <p>Compartilhe com a comunidade</p>
      <form onSubmit={handleSubmit} className={styles.form_post}>
        <div className={styles.form_itens}>
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            name="titulo"
            required
            placeholder="Insira seu titulo"
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
          />
        </div>
        <div className={styles.form_itens}>
          <label htmlFor="imagem">Url da Imagem</label>
          <input
            type="text"
            name="imagem"
            required
            placeholder="Insira sua imagem"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
          />
          {erros && <p className="erro-form">{erros}</p>}
        </div>
        <div className={styles.form_itens}>
          <label htmlFor="bio">Escreva sua bio</label>
          <textarea
            name="bio"
            required
            placeholder="Insira uma descrição"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div className={styles.form_itens}>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            required
            placeholder="Tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </div>

        {!resposta.carregamento && (
          <button className="btn-post-about">Registrar</button>
        )}

        {resposta.carregamento && (
          <button className="btn-post-about disable-form-submit" disabled>
            Aguarde
          </button>
        )}
        {resposta.erro && <p className="erro-form">{resposta.erro}</p>}
      </form>
    </main>
  );
};

export default CriarPost;
