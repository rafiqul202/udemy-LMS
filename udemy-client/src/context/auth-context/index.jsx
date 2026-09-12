import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginServices, registerServices } from "@/services";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    const data = await registerServices(signUpFormData);
    // console.log("register form data", data)
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    const data = await loginServices(signInFormData);
    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticated: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
    }
  };

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticated: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticated: false,
          user: data.data.user,
        });
      }
    } catch (e) {
      console.log("checkAuthUser error details", e);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    }
  }
  useEffect(() => {
    checkAuthUser();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
