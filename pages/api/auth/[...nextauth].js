import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../services/db.auth'
import { UserAccount } from '../../../models/UserAccount.models'
import connectDB from '../../../services/db'
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    // more information on params https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB()
      const userAccount = await UserAccount.findOne({ email: user?.email })
      if (!userAccount) {
        // insert en base
        const newUserAccount = new UserAccount({
          email: user.email,
        })
        await newUserAccount.save()
        console.log('EEEEEEEEE')
      }
      console.log('help me')
      return true
    },
  },
}

export default NextAuth(authOptions)
