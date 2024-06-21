import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Define the NextAuth options
export const options: NextAuthOptions = {
  providers: [
    // Set up the credentials provider for custom email/password login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Authorization logic
      async authorize(credentials, req) {
        // Send a POST request to the backend authentication endpoint
        const res = await fetch(`${process.env.SERVER_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        // Parse the response from the server
        const responsJson = await res.json();

        // Check if the response is successful
        if (responsJson && res.status == 200) {
          // Return the response JSON with tokens
          return responsJson;
        } else {
          // Throw an error if authentication fails
          throw new Error(responsJson?.message || "Login faile");
        }
      },
    }),
  ],
  session: {
    // Use JWT strategy for session management
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback to handle token logic
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // Assign user details to token
        token = user;
        // Set token expiration
        token.exp = Math.floor(Date.now() / 1000) + 999999;
      }
      // Return the updated token
      return token;
    },

    // Session callback to handle session logic
    async session({ session, token }: { session: any; token: any }) {
      // Assign token to session user
      session.user = token;
      if (token.exp) {
        // Set session expiration
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      // Return the updated session
      return session;
    },
  },

  // Use environment variable for secret
  secret: process.env.NEXTAUTH_SECRET,
};

// Export GET and POST handlers for NextAuth
export const GET = NextAuth(options);
export const POST = NextAuth(options);
// Export authentication methods
export const { auth, signIn, signOut, unstable_update } = NextAuth(options);
