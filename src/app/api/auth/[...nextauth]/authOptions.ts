import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) return null;
        //    {
        //   throw new Error("Invalid credentials");
        // }

        const user = await UserModel.findOne({
          email: credentials.email,
        }).select("+password +tokenVersion");

        if (!user) return null;
        //    {
        //   throw new Error("Invalid credentials");
        // }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) return null;
        //   {
        //   throw new Error("Invalid credentials");
        // }

        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          tokenVersion: user.tokenVersion,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
    updateAge: 60 * 60, // refresh every 1 hour
  },

  jwt: {
    maxAge: 60 * 60 * 24, // 1 day
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.tokenVersion = user.tokenVersion;
      }

      if (token._id) {
        await dbConnect();
        const dbUser = await UserModel.findById(token._id)
          .select("tokenVersion")
          .lean();

        if (!dbUser || dbUser.tokenVersion !== token.tokenVersion) {
          return {} as typeof token;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (!token._id) {
        session.user = { _id: "", name: "", email: "", role: "" };
        session.expires = new Date(0).toISOString(); // Past date = expired
        return session;
      }

      if (session.user) {
        session.user._id = token._id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
