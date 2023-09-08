"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Button } from "@/lib/button";
// import { Input } from "./input"
import { Label } from "./label";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import RoleAuth from "./roleAuthForm";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isNew, setisNew] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log("role:", role);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  if (isNew) {
    return (
      <RoleAuth
        setSelectedValue={setRole}
        selectedValue={role}
        setisNew={() => setisNew(false)}
      />
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              FirstName
            </Label>
            <Input
              id="email"
              placeholder="First Name"
              type="text"
              value={firstName}
              autoCapitalize="none"
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1 py-1">
            <Label className="sr-only" htmlFor="email">
              LastName
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoCapitalize="none"
              autoComplete="lastName"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              autoCapitalize="none"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          {/* <div className="grid gap-1"> */}
          <Input
            label="Password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Visibility className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          {/* <Label className="sr-only" htmlFor="email">
              Password
            </Label> */}
          {/* <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            /> */}
          {/* </div> */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        {/* <Google/> */}
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}
