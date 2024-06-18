import { Book, IBorrowColumns, Filter, GetBookProps, Library, BorrowHistory } from "@/lib/interface";
import { ResolveURL } from "@/lib/utils";
import axios from 'axios';

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
    const res = await axios.get(ResolveURL("books"), { 
        params: props,
        paramsSerializer: {
            indexes: null
        }
    });
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

export async function GetUserLibrary(token: string) {
    const res = await axios.get(ResolveURL("user/libraries"), {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
    return res.data as Library[];
}

export async function GetUserJoinLibrary(token: string) {
    const res = await axios.get(ResolveURL("user/libraries/request"), {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return res.data as Library[];
}

export async function GetUserBorrows(token: string) {
    const res = await fetch(ResolveURL("user/borrows"), {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        next: {
            tags: ["user_borrow"]
        }
    })
    const data = await res.json();
    return data as BorrowHistory[];
}

export async function GetFilter() {
    const res = await fetch(ResolveURL("books/book/filter"), {
        next: {
            tags: ["filters"]
        }
    });
    const data = await res.json();
    return data as Filter;
}