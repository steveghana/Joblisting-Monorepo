'use client';
import React, { useState } from 'react';
// import "../../styles/global.scss";
import { signIn, signOut, useSession } from 'next-auth/react';
// import { Link } from 'react-router-dom';;

import { cn } from '../../lib/utils';
import { buttonVariants } from '../../lib/button';
import { UserAuthForm } from '../../components/auth/userAuthForm';
import LoginPage from '../../components/auth/login';
import { Link } from 'react-router-dom';

export default function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  return (
    <>
      {/*  <div className="md:visible">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative sm:h-30  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link>
        <div className="relative md:h-[400px]  lg:h-full sm:h-[400px] flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* Logo */}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo; &rdquo;</p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          {' '}
          {!registerPage ? (
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
              <UserAuthForm />
              <p className="registrationLink">
                Or login&nbsp;
                <div onClick={() => setRegisterPage(false)}> login</div>
              </p>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <Link
                  to="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
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
