from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import date


class Borrow(Document):
    bookID: PydanticObjectId = Field(...)
    libraryID: PydanticObjectId = Field(...)
    userID: PydanticObjectId = Field(...)
    borrowDate: date = Field(...)
    returnDate: Optional[date] = Field(default=None)
    status: Literal["not returned", "returned", "missed"] = Field(default="not returned")

    class Config:
        schema_extra = {
            "example": {
                "bookID": "60d5ec59f2954c4d5c827d1b",
                "libraryID": "60d5ec59f2954c4d5c827d1c",
                "userID": "60d5ec59f2954c4d5c827d1d",
                "borrowDate": "2024-05-01",
                "returnDate": "2024-05-15",
                "status": "not returned"
            }
        }


class BorrowUpdate(BaseModel):
    bookID: Optional[PydanticObjectId] = None
    libraryID: Optional[PydanticObjectId] = None
    userID: Optional[PydanticObjectId] = None
    borrowDate: Optional[date] = None
    returnDate: Optional[date] = None
    status: Optional[Literal["not returned", "returned", "missed"]] = None

    class Config:
        schema_extra = {
            "example": {
                "bookID": "60d5ec59f2954c4d5c827d1b",
                "libraryID": "60d5ec59f2954c4d5c827d1c",
                "userID": "60d5ec59f2954c4d5c827d1d",
                "borrowDate": "2024-05-01",
                "returnDate": "2024-05-15",
                "status": "returned"
            }
        }
