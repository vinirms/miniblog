import styles from "./EditarPost.module.css";

//hooks
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAutenticacaoValue } from "../../contexto/AutenticacaoContext";
import { useFetchPost } from "../../Hooks/useFetchPost";
import { useEffect } from "react";
import { useUpdatePost } from "../../Hooks/useUpdatePost";

const EditarPost = () => {
  const { id } = useParams();
  const { post } = useFetchPost("posts", id);

  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState([]);
  const [erros, setErros] = useState("");
  const { user } = useAutenticacaoValue();

  const { updatePost, respota } = useUpdatePost("posts");

  useEffect(() => {
    if (post) {
      setTitulo(post.titulo);
      setBio(post.bio);
      setImagem(post.imagem);

      const textTags = post.listaTags.join(", ");
      setTags(textTags);
    }
  }, [post]);

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

    const data = {
      titulo,
      imagem,
      bio,
      listaTags,
      uid: user.uid,
      criadoPor: user.displayName,
    };
    updatePost(id, data);

    //redirecionar para home pos post
    navigate("/dashboard");
  };

  return (
    <main className={styles.edit_container}>
      {post && (
        <>
          <h2>Editando: {post.titulo}</h2>

          <form onSubmit={handleSubmit} className={styles.edit_form}>
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
            </div>
            <p>Imagem atual</p>
            <img src={post.imagem} alt={post.titulo} />
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

            <button className={styles.btn_edit}>Editar</button>
          </form>
        </>
      )}
    </main>
  );
};

export default EditarPost;
("");
