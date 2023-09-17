import React, { useState } from "react";
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { Link } from 'react-router-dom';;
import { UserAuthForm } from "../../../components/auth/userAuthForm";
import LoginPage from "../../../components/auth/login";
import { Link } from "react-router-dom";

export default function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  console.log(registerPage);
  return (
    <>
      <div className="container relative sm:h-30  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          {" "}
          {!registerPage ? (
            // <div></div>
            <LoginPage setRegisterPage={setRegisterPage} />
          ) : (
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <UserAuthForm setRegisterPage={setRegisterPage} />
              <p className="registrationLink">
                Or login&nbsp;
                <div onClick={() => setRegisterPage(false)}> login</div>
              </p>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
