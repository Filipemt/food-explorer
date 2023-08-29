import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { toastUtils } from "../components/Toast";
import { AES, enc } from 'crypto-js';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(false);


  function encryptData(data, key) {
    const encryptedData = AES.encrypt(JSON.stringify(data), key).toString();
    return encryptedData;
  }

  function decryptData(encryptedData, key) {
    const decryptedData = AES.decrypt(encryptedData, key).toString(enc.Utf8);
    return decryptedData;
  }

  const encryptionKey = "b5121d30-9863-4417-9446-f9ea0931e630";

  async function signIn({ email, password }) {
    setShowLoading(true);
    try {
      const response = await api.post("/sessions", { email, password })
      const { token, user } = response.data;

      const encryptedUserData = encryptData(user, encryptionKey);

      localStorage.setItem("@foodexplorer:user", encryptedUserData);
      localStorage.setItem("@foodexplorer:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ token, user });


      setShowLoading(false);
      const greetingMessage = () => {
        const isAdmin = user && user.admin ? 1 : 0;
        let hour = new Date().getHours();
        switch (true) {
          case hour <= 5: return !isAdmin ? '👋 Boa madrugada!' : '👋 Boa madrugada! Bom trabalho';
          case hour < 12: return !isAdmin ? '👋 Bom dia!' : '👋 Bom dia! Bom trabalho';
          case hour < 18: return !isAdmin ? '👋 Boa tarde!' : '👋 Boa tarde! Bom trabalho';
          default: return !isAdmin ? '👋 Boa noite!' : '👋 Boa noite! Bom trabalho';
        }
      }

      toastUtils.handleDefault(greetingMessage);
    } catch (error) {
      setShowLoading(false);
      if (error.response) {
        toastUtils.handleError(error.response.data.message);
      } else {
        toastUtils.handleError("Erro ao entrar, tente novamente mais tarde");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@foodexplorer:user");
    localStorage.removeItem("@foodexplorer:token");

    setData({});
  }

  useEffect(() => {
    const encryptedUserData = localStorage.getItem("@foodexplorer:user");

    if (encryptedUserData) {
      const user = decryptData(encryptedUserData, encryptionKey);
      const token = localStorage.getItem("@foodexplorer:token");

      if (user && token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({
          token,
          user: JSON.parse(user)
        })
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        showLoading,
        user: data.user
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };