import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const estadoInicial = {
  carregamento: null,
  erro: null,
};

const inserirReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { carregamento: true, erro: null };
    case "INSERTED_DOC":
      return { carregamento: false, erro: null };
    case "ERROR":
      return { carregamento: false, erro: action.payload };
    default:
      return state;
  }
};

export const useInserirPost = (docCollection) => {
  const [resposta, dispatch] = useReducer(inserirReducer, estadoInicial);

  const [cancelado, setCancelado] = useState(false);

  const checarCancelado = (action) => {
    if (!cancelado) {
      dispatch(action);
    }
  };

  const inserirDocumento = async (document) => {
    checarCancelado({
      tipo: "LOADING",
    });

    try {
      const novoDocumento = { ...document, createdAt: Timestamp.now() };

      const documentoInserido = await addDoc(
        collection(db, docCollection),
        novoDocumento
      );

      checarCancelado({
        tipo: "INSERTED_DOC",
        payload: documentoInserido,
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
    inserirDocumento,
    resposta,
  };
};
