import { IUserAccount, UserAccount } from '@/models/UserAccount.models'
import { connectDB } from '@/services/db'
import clientPromise from '@/services/db.auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

const setupToken = async (email: string, token: JWT) => {
  const userAccount = await UserAccount.findOne({ email })

  if (userAccount) {
    token.id = userAccount._id.toString()
    token.isFirstConnexion = userAccount.isFirstConnexion
    token.town = userAccount.town
    token.availabilities = userAccount.availabilities
    token.sport = userAccount.sport
    token.level = userAccount.level
    token.description = userAccount.description
    token.contact = userAccount.contact
    token.name = userAccount.name
    token.image = userAccount.image
  }
}

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
          name: user.name!,
          image: user.image!,
        }
        const newUserAccount = new UserAccount(dataToInsert)
        await newUserAccount.save()
      }
      return true
    },
    async jwt({ token, trigger, user, session }) {
      await connectDB()
      if (trigger === 'update') {
        await setupToken(session.user.email!, token)
      }

      if (user) {
        await setupToken(user.email!, token)
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
      session.user.contact = token.contact
      session.user.name = token.name
      session.user.image = token.image

      return session
    },
  },
}
