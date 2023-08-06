import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
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
        const dataToInsert: IUserAccount = {
          isFirstConnexion: true,
          email: user.email!,
        }
        const newUserAccount = new UserAccount(dataToInsert)
        await newUserAccount.save()
      }
      return true
    },
    async jwt({ token, trigger, session, user }) {
      await connectDB()
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        }
      }

      if (user) {
        const userAccount = await UserAccount.findOne({ email: user.email })

        if (userAccount) {
          token.id = userAccount._id.toString()
          token.isFirstConnexion = userAccount.isFirstConnexion
          token.town = userAccount.town
          token.availabilities = userAccount.availabilities
          token.sport = userAccount.sport
          token.level = userAccount.level
          token.description = userAccount.description
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.isFirstConnexion = token.isFirstConnexion
      session.user.town = token.town
      session.user.availabilities = token.availabilities
      session.user.sport = token.sport
      session.user.level = token.level
      session.user.description = token.description
      return session
    },
  },
}
