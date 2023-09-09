import NextAuth from "next-auth";

declare module "next-auth" {
  //@ts-ignore
  interface Session extends Session {
    auth_token: string;
  }
}
