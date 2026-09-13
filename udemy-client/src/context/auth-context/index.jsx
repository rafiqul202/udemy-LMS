import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginServices, registerServices } from "@/services";
import React, { createContext, useEffect, useState } from "react";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
 
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
    if (data.status === 201) {
  console.log("register successful authProvider page")
}
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
      setLoading(false);
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

  function resetCredentials() {
    setAuth({
      authenticated: false,
      user: null,
    })
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
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
