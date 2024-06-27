export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    username: string;
    dateOfBirth: string;
    role: string;
    email: string;
    listOfLib: string[];
    address: string;
    status: boolean;
};

export interface Book {
    _id:         string;
    title:       string;
    slug:        string;
    author:      string[];
    genres:      string[];
    description?: string;
    language:    string;
    numPages:    number;
    imageUrl:    string;
    publisher:   string;
    publishDate: string;
    series?:     string[];
    totalBorrow: number;
    libraryID:   string;
    totalNum:    number;
    currentNum:  number;
    numOfRating: number;
    avgRating:   number;
    libraryName: string;
}

export interface Library {
    _id:            string;
    name:           string;
    address:        string;
    avatarImageUrl: string;
    description:    string;
    slug:           string;
    maxBorrowDays:  number;
    lateFeePerDay:  number;
    numOfRating:    number;
    avgRating:      number;
    managerID:      string;
}

export interface GetBookProps {
    limit: number;
    sort_by?: string | string[] | undefined;
    genres?: string | string[] | undefined;
    publisher?: string | string[] | undefined;
    language?: string | string[] | undefined;
    series?: string | string[] | undefined;
    author?: string | string[] | undefined;
    slug?: string | undefined;
};

export interface IBorrowColumns {
    borrowDate: string;
    returnDate: string;
    bookTitle: string;
    library: string;
    status: "not returned" | "dated" | "returned";
}

export interface BorrowHistory {
    _id: string;
    bookID: string;
    libraryID: string;
    userID: string;
    borrowDate: string;
    returnDate: string;
    status: string;
}

export interface Filter {
    language: string[];
    publisher: string[];
    genres: string[];
    author: string[];
    series: string[];
}

export interface Review {
    _id: string;
    bookID: string;
    userID: string;
    reviewDate: string;
    content: string;
    rating: number
}

export interface BookReview {
    review: Review,
    info: User
}

export interface UserJoin extends User {
    libCheck: boolean,
    frontImageUrl?: string,
    backImageUrl?: string,
    dateCreated?: string,
    userID?: string,
    libraryID?: string
    _id?: string,
};

export interface UserBorrow extends BorrowHistory {
    bookTitle: string,
    username: string,
}