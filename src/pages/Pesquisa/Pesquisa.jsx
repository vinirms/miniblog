import styles from "./Pesquisa.module.css";

//hooks
import { useFetchDocumentos } from "../../Hooks/useFetchDocumentos";
import { usePesquisa } from "../../Hooks/usePesquisa";
import { Link } from "react-router-dom";

//componentes
import PostsDetalhes from "../../componentes/PostsDetalhes/PostsDetalhes";

const Pesquisa = () => {
  const query = usePesquisa();
  const search = query.get("q");

  const { documentos: posts } = useFetchDocumentos("posts", search);
  return (
    <div className={styles.posts_container}>
      <h1 className={styles.titulo}>Pesquisa</h1>
      <div className={styles.btn_condicional}>
        {posts && posts.length === 0 && (
          <>
            <p>Nao encontramos post com a tag que voce digitou...</p>
            <Link to="/" className={styles.btn_search_voltar}>
              Voltar
            </Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostsDetalhes key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Pesquisa;
