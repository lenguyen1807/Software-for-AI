import { Book, User, Library } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils";
import axios from 'axios';

interface GetBookProps {
    limit: number,
    page: number,
    sort_by?: string | undefined,
    genres?: string[] | undefined,
    publisher?: string | undefined,
    language?: string | undefined
};

export async function GetBooks() {
    const res = await axios.get(ResolveURL("books"));
    return res.data as Book[];
}

export async function GetBookByID(ID: string) {
    const res = await axios.get(ResolveURL(`books/${ID}`));
    return res.data as Book;
}

export async function GetBooksParam({...props} : GetBookProps ) {
    const res = await axios.get(ResolveURL("books/"), { params: props });
    return res.data as Book[];
}

export async function GetLibraryByID(ID: string) {
    const res = await axios.get(ResolveURL(`libraries/${ID}`));
    return res.data as Library;
}