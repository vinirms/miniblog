//css
import styles from "./Sobre.module.css";
import { Link } from "react-router-dom";

const Sobre = () => {
  return (
    <section className={styles.about_section}>
      <div className={styles.about_card}>
        <div className={styles.logo}>
          <span className={styles.mini}>Mini</span>
          <span className={styles.blog}>Blog</span>
        </div>
        <p>
          Projeto desenvolvido com ReactJs no FrontEnd e Firebase no BackEnd
        </p>
        <Link to="/criarpost" className="btn-post-about">
          Criar Post
        </Link>
      </div>
    </section>
  );
};

export default Sobre;
