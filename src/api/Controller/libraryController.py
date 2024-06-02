from fastapi import HTTPException
from typing import Any, List, Optional
from Database.connection import Database
from Model.libraryModel import Library, LibraryUpdate
from Model.bookModel import Book
from beanie import PydanticObjectId
from Controller.bookController import book_database

library_database = Database(Library)

class LibraryController:

    @staticmethod
    async def get_libraries(
            limit: Optional[int] = 10,
            page: Optional[int] = 1,
            sort_by: Optional[str] = "_id",
            name: Optional[str] = None,
            slug: Optional[str] = "",

    ) -> List[Library]:

        query = {}
        if name is not None:
            query.update({"name": name})
            
        books = await library_database.get_all(limit= limit, page= page, sort_by= sort_by, slug= slug, query=query)
        return books
    @staticmethod
    async def get_library(id: PydanticObjectId) -> Library:
        library = await library_database.get_one(id)
        if not library:
            raise HTTPException(status_code=404, detail="Library not found")
        return library

    @staticmethod
    async def create_library(body: Library) -> dict:
        await library_database.create(body)
        return {"message": "Library created successfully"}

    @staticmethod
    async def update_library(body: LibraryUpdate, id: PydanticObjectId) -> Library:
        library = await library_database.update(id= id,body= body)
        if not library:
            raise HTTPException(status_code=404, detail="Library not found")
        return library

    @staticmethod
    async def delete_library(id: PydanticObjectId) -> dict:
        is_delete = await library_database.delete(id)
        if not is_delete:
            raise HTTPException(status_code=500, detail="Library not found")
        return {"message": "Library deleted successfully"}











