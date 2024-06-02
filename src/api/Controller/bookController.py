from typing import List, Optional
from fastapi import HTTPException, Query
from Database.connection import Database
from Model.bookModel import Book
from  beanie import init_beanie, PydanticObjectId
from Model.bookModel import BookUpdate

book_database = Database(Book)

class BookController:
    @staticmethod
    async def get_books(
            limit: Optional[int] = 10,
            page: Optional[int] = 1,
            sort_by: Optional[str] = "_id",
            slug: Optional[str] = "",
            libraryID: Optional[PydanticObjectId] = None,
            genres: Optional[List[str]] = None,
            publisher: Optional[str] = None,
            language: Optional[str] = None,
    ) -> List[Book]:
        query = {}

        if libraryID is not None:
            query.update({"libraryID": libraryID})
        if genres is not None:
            query.update({"genres": {"$all":genres}})
        if publisher is not None:
            query.update({"publisher": publisher})
        if language is not None:
            query.update({"language": language})
        books = await book_database.get_all(limit= limit, page= page, sort_by= sort_by, slug= slug, query=query)

        return books

    @staticmethod
    async def get_book(id: PydanticObjectId) -> Book:
        book = await book_database.get_one(id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

    @staticmethod
    async def create_book(book: Book) -> dict:
        await book_database.create(book)
        return {"message": "Book is created successfully"}

    @staticmethod
    async def update_book(body: BookUpdate, id: PydanticObjectId) -> Book:
        book = await book_database.update(body=body, id=id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        return book

    @staticmethod
    async def delete_book(id: PydanticObjectId) -> dict:
        is_delete = await book_database.delete(id)
        if not is_delete:
            raise HTTPException(status_code=404, detail="Book not found")
        return {"message":"Book is deleted successfully"}

    