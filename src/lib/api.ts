import { 
    Book, 
    Filter, 
    GetBookProps, 
    Library, 
    BorrowHistory, 
    Review, 
    User, 
    BookReview 
} from "@/lib/interface";
import { ResolveURL } from "@/lib/utils";
import axios from 'axios';
import FormData from "form-data";

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

export async function GetLibrary() {
    const res = await fetch(ResolveURL("libraries/"), {
        next: {
            revalidate: 60 * 30
        }
    });
    const data = await res.json();
    return data as Library[];
}

export async function GetLibraryBook({ID, page, limit} : {ID: string, page: number, limit: number}) {
    const res = await axios.get(ResolveURL(`libraries/${ID}/books?page=${page}&limit=${limit}`));
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

export async function GetBookReviews(bookID: string) {
    const res = await fetch(ResolveURL(`reviews/BookReview?bookID=${bookID}`));
    const data = await res.json();
    return data.map((value): BookReview => {
        return {
            review: value[0] as Review,
            info: value[1] as User
        }
    })
}

export async function GetChat(query: string) {
    const res = await axios.get(ResolveURL("chat/"), {
        params: {query: query}
    });
    return res.data as string;
}

export async function UploadImg(file: File) {
    const data = new FormData();
    data.append('file', file, file.name);
    const res = await axios.post(ResolveURL("upload/upload/"), data, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    });
    return res.data as { url: string };
}

export async function GetUserInfo(token: string) {
    const res = await fetch(ResolveURL("user/info"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        next: {
            tags: ["user_info"]
        }
    })
    const data = await res.json();
    return data as User;
}

export async function GetLibraryInfo(token: string) {
    const res = await fetch(ResolveURL("libraries/info"), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await res.json();
    return data as Library;
}

export async function GetBookRecommend(ID: string, num_books: number) {
    const res = await axios.post(ResolveURL("recommend"), {
        user_id: ID,
        num_recommendations: num_books,
    })
    return res.data.recommendations.map((value) => {
        return value.item_id;
    })
}