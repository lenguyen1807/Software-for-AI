import { Book, GetBookProps, Library } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils";
import axios from 'axios';
import { auth } from "./auth";

export async function GetBooks() {
    const res = await axios.get(ResolveURL("books"));
    return res.data as Book[];
}

export async function GetBookByID(ID: string) {
    const res = await axios.get(ResolveURL(`books/${ID}`));
    return res.data as Book;
}

interface GetBookPropsPage extends GetBookProps {
    page: number
}

export async function GetBooksParam({...props} : GetBookPropsPage ) {
    const res = await axios.get(ResolveURL("books"), { params: props });
    return res.data as Book[];
}

export async function GetLibraryByID(ID: string) {
    const res = await axios.get(ResolveURL(`libraries/${ID}`));
    return res.data as Library;
}

export async function GetLibraryBook({ID, page} : {ID: string, page: number}) {
    const res = await axios.get(ResolveURL(`libraries/${ID}/books?page=${page}`));
    return res.data as Book[];
}

export async function GetLoginData({...props} : {username: string, password: string}) {
    const res = await axios.post(ResolveURL(`login`), null, { params: props});
    return res.data;
}
