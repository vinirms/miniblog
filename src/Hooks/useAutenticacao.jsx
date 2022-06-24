import { async } from "@firebase/util";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [carregamento, setCarregamento] = useState(null);

  // deal with memory leak
  const [cancelado, setCancelado] = useState(false);

  const autenticacao = getAuth();

  function checarcancelado() {
    if (cancelado) {
      return;
    }
  }

  const criarUsuario = async (data) => {
    checarcancelado();

    setCarregamento(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        autenticacao,
        data.email,
        data.senha
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setCarregamento(false);

      return user;
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa ter 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "email ja cadastrado";
      } else {
        systemErrorMessage = "ocorreu um erro";
      }

      setCarregamento(false);
      setError(systemErrorMessage);
    }
  };

  //logout
  const logout = () => {
    checarcancelado();
    signOut(autenticacao);
  };

  //sign in
  const login = async (data) => {
    checarcancelado();
    setError(false);

    try {
      await signInWithEmailAndPassword(autenticacao, data.email, data.senha);
      setCarregamento(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuario nao encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "senha incorreta";
      } else {
        systemErrorMessage = "ocorreu um erro";
      }

      setError(systemErrorMessage);
      setCarregamento(false);
    }
  };

  useEffect(() => {
    return () => setCancelado(true);
  }, []);

  return {
    autenticacao,
    criarUsuario,
    error,
    carregamento,
    logout,
    login,
  };
};
