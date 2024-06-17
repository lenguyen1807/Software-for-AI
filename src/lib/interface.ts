export interface User {
    _id: string;
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

export interface BorrowHistory {
    _id:        string;
    borrowDate: string;
    returnDate: string;
    bookTitle: string;
    library: string;
    status: "Đang mượn" | "Đã trả";
}

export interface Filter {
    language: string[];
    publisher: string[];
    genres: string[];
    author: string[];
    series: string[];
}