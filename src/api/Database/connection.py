from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie, PydanticObjectId
from Model.bookModel import Book
from Model.borrowModel import Borrow
from Model.libraryModel import Library
from typing import Optional, List, Any
from pydantic import BaseModel
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    db_url: Optional[str] = "mongodb+srv://admin:nfPOPZZrWWKKim5D@haiimphuong.pehm7k8.mongodb.net/"

    async def initialize_database(self) -> None:
        client = AsyncIOMotorClient("mongodb+srv://admin:nfPOPZZrWWKKim5D@haiimphuong.pehm7k8.mongodb.net/")
        await init_beanie(database= client.get_default_database("BooksManagement"),
                          document_models=[Book, Library, Borrow])


class Database:
    def __init__(self, model):
        self.model = model

    async def get_all(
            self,
            limit: Optional[int] = 10,
            page: Optional[int] = 1,
            sort_by: Optional[str] = "_id",
            slug: Optional[str] = None,
            query: Optional[dict] = {}
    ) -> List[Any]:

        if slug is not None:
            query.update({"slug" : {"$regex": slug, "$options": "i"}})

        skip_count = (page - 1) * limit

        try:
            docs = await self.model.find(query).sort(sort_by).skip(skip_count).limit(limit).to_list()
            return docs
        except Exception as e:
            print(e)

    async def get_one(self, id: PydanticObjectId) -> bool:
        doc = await self.model.get(id)
        if doc:
            return doc
        return False

    async def create(self, document) -> None:
        await self.model.insert_one(document)

    async def update(self, id: PydanticObjectId, body) -> Any:
        body_dict = dict(body)
        body_dict = {k: v for k, v in body_dict.items() if v is not None}
        update_query = {"$set": {
            field: value for (field, value) in body_dict.items()
        }}
        doc = await self.model.get(id)
        if not doc:
            return False
        await doc.update(update_query)
        return doc


    async def delete(self, id: PydanticObjectId) -> bool:
        doc = await self.model.get(id)
        if not doc:
            return False
        await doc.delete()
        return True



