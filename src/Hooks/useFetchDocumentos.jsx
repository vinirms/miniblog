import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocumentos = (
  docCollection,
  search = null,
  uid = null
) => {
  const [documentos, setDocumentos] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregamento, setCarregamento] = useState(null);

  //memory leak
  const [cancelado, setCancelado] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      if (cancelado) return;

      setCarregamento(true);

      const refCollection = await collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = await query(
            refCollection,
            where("listaTags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            refCollection,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(refCollection, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocumentos(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setCarregamento(false);
      } catch (error) {
        console.log(error);
        setCarregamento(false);
      }
    }
    carregarDados();
  }, [docCollection, search, uid, cancelado]);

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return { documentos, carregamento, erro };
};
