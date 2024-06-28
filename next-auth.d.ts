import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["User"] & {
  role: "parent" | "mum" | "dad" | "child";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
