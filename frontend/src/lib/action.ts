"use server"

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { LoginSchema } from "@/lib/zod";
import axios from "axios";
import { ResolveURL } from "./utils";
import { revalidatePath, revalidateTag } from "next/cache";

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
    revalidatePath("/admin/accounts");
}

export async function DeleteBook(ID: string, token: string) {
    await axios.delete(ResolveURL(`books/${ID}`), {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    revalidatePath("/admin/books");
}

export async function DeleteBookLibrary(ID: string, token: string) {
    await axios.delete(ResolveURL(`libraries/books/{bookID}`), {
        params: {
            id: ID
        },
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    revalidatePath("/library");
}

export async function Revalidate(name: string, tag: boolean) {
    if (tag)
        revalidateTag(name);
    else
        revalidatePath(name);
}

export async function ApproveUser(ID: string, token: string, accept: boolean) {
    try {
        await axios.delete(ResolveURL(`libraries/members/requests/${ID}`), {
            params: {
                accept: accept,
            }, 
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        revalidatePath("/library/user");
    } catch (error) {
        throw error;
    }
}

export async function SetBookReturn(ID: string, token: string) {
    await axios.put(ResolveURL(`libraries/borrows/${ID}`), null, {
        params: {
            status: "returned"
        }
    })
    revalidatePath("/library/service");
}