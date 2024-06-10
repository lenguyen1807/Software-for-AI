"use server"

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { LoginSchema } from "@/lib/zod";
import axios from "axios";
import { ResolveURL } from "./utils";

export async function Authenciate(data: z.infer<typeof LoginSchema>) {
    try {
        await signIn("credentials", data);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials";
                case "CallbackRouteError":
                {
                    const response = (<any>error.cause?.err).response;
                    switch (response.status) {
                        case 401:
                            return response.data.detail;
                    }
                }
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function SignOut() {
    await signOut({ redirectTo: "/" });
}

export async function DeleteUser(ID: string, token: string) {
    await axios.delete(ResolveURL(`user/${ID}`), {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}