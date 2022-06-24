import React from "react";
import styles from "./PostUnico.module.css";
import { useParams } from "react-router-dom";
import { useFetchPost } from "../../Hooks/useFetchPost";
import { Link } from "react-router-dom";

const PostUnico = () => {
  const { id } = useParams();
  const { post } = useFetchPost("posts", id);

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <img src={post.imagem} alt={post.titulo} />
          <h1>{post.titulo}</h1>
          <p>{post.bio}</p>
          <div className={styles.post_tags}>
            {" "}
            {post.listaTags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </div>
        </>
      )}
      <Link className={styles.ver_post} to="/">
        Voltar
      </Link>
    </div>
  );
};

export default PostUnico;
