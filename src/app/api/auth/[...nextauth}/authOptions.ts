import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "../../../../models/user.model";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user) throw new Error("Invalide Credentials");
        const isMatch = await bcrypt.compare(
          credentials?.password,
          user.password,
        );
        if (!isMatch) throw new Error("Invalide Credentials");
        return {
          _id: user._id.toString(),
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
