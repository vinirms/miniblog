import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const estadoInicial = {
  carregamento: null,
  erro: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { carregamento: true, erro: null };
    case "UPDATED_DOC":
      return { carregamento: false, erro: null };
    case "ERROR":
      return { carregamento: false, erro: action.payload };
    default:
      return state;
  }
};

export const useUpdatePost = (docCollection) => {
  const [resposta, dispatch] = useReducer(updateReducer, estadoInicial);

  const [cancelado, setCancelado] = useState(false);

  const checarCancelado = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const updatePost = async (id, data) => {
    const docRef = await doc(db, docCollection, id);
    const updatedPost = await updateDoc(docRef, data);

    checarCancelado({
      tipo: "LOADING",
    });

    try {
      checarCancelado({
        tipo: "UPDATED_DOC",
        payload: updatedPost,
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
    updatePost,
    resposta,
  };
};
