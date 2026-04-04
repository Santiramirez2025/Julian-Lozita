import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('AUTH ATTEMPT:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('AUTH FAIL: missing credentials')
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          console.log('AUTH USER FOUND:', !!user)

          if (!user) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password, user.password)
          console.log('AUTH PASSWORD VALID:', isValid)

          if (!isValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('AUTH ERROR:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
