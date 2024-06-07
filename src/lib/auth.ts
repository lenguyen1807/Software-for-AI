import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { GetLoginToken } from "@/lib/api";
import { LoginSchema } from "@/lib/zod";
import { ResolveURL } from "./utils";
import { Library, User } from "@/lib/interface";
import { jwtDecode } from "jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials) => {
                const { username, password } = await LoginSchema.parseAsync(credentials)
                const token = await GetLoginToken({ username, password });
                const role = (<any>jwtDecode(token)).role;

                if (token && role === "user") {
                    const response = await fetch(ResolveURL("user/info"), {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    const data = (await response.json()) as User;

                    return {
                        ...data,
                        jwt: token,
                        role: role
                    };
                }

                if (token && role === "library") {
                    const response = await fetch(ResolveURL("libraries/info"), {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    const data = (await response.json()) as Library;

                    return {
                        ...data,
                        jwt: token,
                        role: role
                    };
                }

                if (token && role === "admin") {

                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
})