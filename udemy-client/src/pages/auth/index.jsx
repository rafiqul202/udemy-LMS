import AuthNavbar from "@/components/AuthNavbar";
import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
// import { GraduationCapIcon } from "lucide-react";
import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  console.log("signInform data value", signInFormData);
  const checkIfSignInformValid = () => {
    return signInFormData.userEmail !== "" && signInFormData.password !== "";
  };
  const checkIfSignUpFormValid = () => {
    return (
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  };
  return (
    <div className="flex flex-col w-full h-full">
      <AuthNavbar />

      <div className="flex items-center justify-center min-h-svh w-full mx-auto bg-background">
        <Tabs
          defaultValue="signin"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid grid-cols-2 w-full" variant="line">
            <TabsTrigger value="signin">Sign-In</TabsTrigger>
            <TabsTrigger value="signup">Sign-Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="py-10 flex flex-col gap-4">
              <CardHeader>
                <CardTitle className="text-center text-3xl font-semibold">
                  Sign-in to your account
                </CardTitle>
                <CardDescription className="pb-6 text-center text-xs">
                  Enter you email and password to access your account
                </CardDescription>
                <CardContent className="space-y-2">
                  <CommonForm
                    handleSubmit={handleLoginUser}
                    formControls={signInFormControls}
                    buttonText={"Sign-In"}
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonFormDisabled={!checkIfSignInformValid()}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="py-10 flex flex-col gap-4">
              <CardHeader>
                <CardTitle className="text-center text-3xl font-semibold">
                  Create a new account
                </CardTitle>
                <CardDescription className="pb-6 text-center text-xs">
                  Enter your details to get started
                </CardDescription>
                <CardContent className="space-y-2">
                  <CommonForm
                    handleSubmit={handleRegisterUser}
                    formControls={signUpFormControls}
                    buttonText={"Sign-Up"}
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonFormDisabled={!checkIfSignUpFormValid()}
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
