//css
import styles from "./Home.module.css";
//componentes
import NavBar from "../../componentes/NavBar/NavBar";
import PostsDetalhes from "../../componentes/PostsDetalhes/PostsDetalhes";
//hooks
import { useState } from "react";
import { useFetchDocumentos } from "../../Hooks/useFetchDocumentos";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pesquisa, setPesquisa] = useState();
  const { documentos: posts, carregamento } = useFetchDocumentos("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pesquisa) {
      return navigate(`/search?q=${pesquisa}`);
    }
  };

  return (
    <main className={styles.home}>
      <h1>Posts Recentes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button className="btn_search">Search</button>
      </form>

      <div>
        {carregamento && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => <PostsDetalhes key={post.id} post={post} />)}
      </div>
    </main>
  );
};

export default Home;
