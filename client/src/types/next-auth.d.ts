import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: number;
      userName: string;
      name: string;
      token: string;
      il: string;
    };
  }
}
