import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
//hooks
import { useFetchDocumentos } from "../../Hooks/useFetchDocumentos";
import { useAutenticacaoValue } from "../../contexto/AutenticacaoContext";
import { useDeletePost } from "../../Hooks/useDeletePost";

const Dashboard = () => {
  const { user } = useAutenticacaoValue();
  const uid = user.uid;

  const { documentos: posts } = useFetchDocumentos("posts", null, uid);

  const { deletePost } = useDeletePost("posts");

  return (
    <main className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerenciamento de Post</p>
      {posts && posts.length === 0 ? (
        <div className={styles.sem_post}>
          <p>Não encontramos post</p>
          <Link to="/criarpost" className={styles.btn_dashboard}>
            Post Algo
          </Link>
        </div>
      ) : (
        <>
          <div>
            <div className={styles.header_post}>
              <span>Título</span>
              <span>Ações</span>
            </div>

            <div className={styles.row}></div>

            <div>
              {posts &&
                posts.map((post) => (
                  <div key={post.id} className={styles.post_container}>
                    <h4>{post.titulo}</h4>
                    <div>
                      <Link to={`/post/${post.id}`} className={styles.btn_ver}>
                        Ver
                      </Link>
                      <Link
                        to={`/post/edit/${post.id}`}
                        className={styles.btn_editar}
                      >
                        Editar
                      </Link>
                      <button
                        className={styles.btn_excluir}
                        onClick={() => deletePost(post.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
