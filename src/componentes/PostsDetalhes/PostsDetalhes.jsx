import styles from "./PostsDetalhes.module.css";

import { Link } from "react-router-dom";

const PostsDetalhes = ({ post }) => {
  return (
    <div className={styles.post_container}>
      <img src={post.imagem} alt={post.titulo} />
      <div className={styles.user_post}>
        <h1>{post.titulo}</h1>
        <span>publicado por:</span>
        <span className={styles.user}>{post.criadoPor}</span>
      </div>
      <p>{post.bio}</p>
      <div className={styles.post_tags}>
        {post.listaTags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/post/${post.id}`} className={styles.btn_post_container}>
        Ler
      </Link>
      <hr />
    </div>
  );
};

export default PostsDetalhes;
