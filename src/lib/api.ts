import { Book, GetBookProps, Library } from "@/lib/interface";
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

export async function GetLoginToken({...props} : {username: string, password: string}) {
    const res = await axios.post(ResolveURL(`login`), null, { params: props});
    return res.data.access_token;
}

export async function GetUserLibrary() {
    const res = await axios.get(ResolveURL("user/libraries"), {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgxMDA0MzMuNzcwNjkzMywiaWQiOiI2MGQ5ZjRmMWUxYTNlNTZhM2MzZjNiM2YiLCJyb2xlIjoidXNlciJ9.xJqDaUTyGsXlt6rqREvr8wq0-PLrRrp40jWXzYDveOo`
                        }
                    });
    return res.data as Library[];
}

export async function GetUserBorrows() {
    const res = await axios.get(ResolveURL("user/borrows"), {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgxMDA0MzMuNzcwNjkzMywiaWQiOiI2MGQ5ZjRmMWUxYTNlNTZhM2MzZjNiM2YiLCJyb2xlIjoidXNlciJ9.xJqDaUTyGsXlt6rqREvr8wq0-PLrRrp40jWXzYDveOo`
                        }
                    });
    return res.data as Book[];
}