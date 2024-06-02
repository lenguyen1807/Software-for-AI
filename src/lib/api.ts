import { Book, User, Library } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils";

/**
 * 
 * @returns Trả về 10 sách được query từ database
 */
export async function GetBooks() {
    const get = await fetch(ResolveURL("books"), {
        method: 'GET',
    });
    const response = await get.json();
    return response as Book[];
}

export async function GetBookByID(ID: string) {
    const get = await fetch(ResolveURL(`books/${ID}`), {
        method: 'GET',
    });
    const response = await get.json();
    return response as Book;
}