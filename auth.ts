import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pb } from "./lib/pb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "PocketBase",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await pb
            .collection("users")
            .authWithPassword(
              credentials.username as string,
              credentials.password as string
            );
          console.log("Kullanıcı Bilgisi:", user); // Kullanıcı bilgilerini kontrol et
          if (user) {
            return {
              id: user.record.id,
              name: user.record.name,
              email: user.record.email,
              username: user.record.username,
              role: user.record.role,
              verified: user.record.verified,
            }; // Kullanıcı bilgilerini döndür
          }
        } catch (error) {
          console.error("Kimlik doğrulama hatası:", error);
        }
        return null; // Kimlik doğrulama başarısızsa null döndür
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Kullanıcı bilgileri varsa token'a ekle
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.verified = user.verified;
      }
      return token;
    },
    async session({ session, token }) {
      // Token'dan kullanıcı bilgilerini session'a ekle
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.verified = token.verified;
      }
      return session;
    },
  },
});
