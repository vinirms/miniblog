import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchPost = (docCollection, id) => {
  const [post, setPost] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregamento, setCarregamento] = useState(null);

  //memory leak
  const [cancelado, setCancelado] = useState(false);

  useEffect(() => {
    async function carregarPost() {
      if (cancelado) return;

      setCarregamento(true);

      try {
        const refDoc = await doc(db, docCollection, id);

        const snapDoc = await getDoc(refDoc);

        setPost(snapDoc.data());

        setCarregamento(false);
      } catch (error) {
        setErro(erro.message);

        setCarregamento(false);
      }
    }
    carregarPost();
  }, [docCollection, id, cancelado]);

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { post, carregamento, erro };
};
