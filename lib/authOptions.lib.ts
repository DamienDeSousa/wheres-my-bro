import { UserAccount } from '@/models/UserAccount.models'
import { connectDB } from '@/services/db'
import clientPromise from '@/services/db.auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    // more information on params https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ user }) {
      await connectDB()
      const userAccount = await UserAccount.findOne({ email: user?.email })
      if (!userAccount) {
        // insert en base
        const newUserAccount = new UserAccount({
          email: user.email,
        })
        await newUserAccount.save()
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        }
      }

      return token
    },
    async session({ session, token }) {
      return session
    },
  },
}
