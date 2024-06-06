"use server"

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LoginSchema } from "./zod";

// export async function Authenciate(
//     prevState: string | undefined,
//     formData: FormData,
// ) {
//     try {
//         await signIn("credentials", formData);
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return "Invalid credentials";
//                 case "CallbackRouteError":
//                 {
//                     const response = (<any>error.cause?.err).response;
//                     switch (response.status) {
//                         case 401:
//                             return response.data.detail;
//                     }
//                 }
//                 default:
//                     return 'Something went wrong.';
//             }
//         }
//         throw error;
//     } finally {
//         redirect("/");
//     }
// }

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