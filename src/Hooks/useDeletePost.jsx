import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

const estadoInicial = {
  carregamento: null,
  erro: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { carregamento: true, erro: null };
    case "DELETED_DOC":
      return { carregamento: false, erro: null };
    case "ERROR":
      return { carregamento: false, erro: action.payload };
    default:
      return state;
  }
};

export const useDeletePost = (docCollection) => {
  const [resposta, dispatch] = useReducer(deleteReducer, estadoInicial);

  const [cancelado, setCancelado] = useState(false);

  const checarCancelado = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const deletePost = async (id) => {
    checarCancelado({
      tipo: "LOADING",
    });

    try {
      const deletedPost = await deleteDoc(doc(db, docCollection, id));

      checarCancelado({
        tipo: "DELETED_DOC",
        payload: deletedPost,
      });
    } catch (erro) {
      checarCancelado({
        tipo: "ERROR",
        payload: erro.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return {
    deletePost,
    resposta,
  };
};
