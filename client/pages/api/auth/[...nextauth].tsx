import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
    throw new Error("GITHUB_ID or GITHUB_SECRET is not set");
  }
  
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)