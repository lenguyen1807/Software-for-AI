"use server"

import { auth, signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function Authenciate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
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
    } finally {
        const data = await auth();
        if (data) {
            const role = (<any>data.user).role;
            if (role === "user") {
                redirect("/user");
            } else if (role === "admin") {
                redirect("/admin");
            } else if (role === "library") {
                redirect("/library");
            }
        }
    }
}