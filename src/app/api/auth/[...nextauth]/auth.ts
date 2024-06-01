import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }): Promise<any> {
      try {
        await dbConnect();
        const user = await UserModel.findOne({ email: profile?.email });

        if (!user) {
          const newUser = new UserModel({
            username: profile?.name,
            email: profile?.email,
            isVerified: true,
          });
          await newUser.save();

          return newUser;
        }
        return user;
      } catch (error) {
        console.log(error);
        console.error("error while signing in from google")
      }
    },
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/dashboard"
  },
  secret: process.env.AUTH_SECRET
});
