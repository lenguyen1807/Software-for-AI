from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


class BookReview(Document):
    bookID: PydanticObjectId = Field(...)
    userID: PydanticObjectId = Field(...)
    reviewDate: date = Field(...)
    content: str = Field(...)
    rating: int = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "bookID": "60d5ec59f2954c4d5c827d1b",
                "userID": "60d5ec59f2954c4d5c827d1c",
                "reviewDate": "2024-05-01",
                "content": "This is a fantastic book! Highly recommend it to everyone.",
                "rating": 5
            }
        }


class BookReviewUpdate(BaseModel):
    bookID: Optional[PydanticObjectId] = None
    userID: Optional[PydanticObjectId] = None
    reviewDate: Optional[date] = None
    content: Optional[str] = None
    rating: Optional[int] = None

    class Config:
        schema_extra = {
            "example": {
                "bookID": "60d5ec59f2954c4d5c827d1b",
                "userID": "60d5ec59f2954c4d5c827d1c",
                "reviewDate": "2024-05-01",
                "content": "This is a fantastic book! Highly recommend it to everyone.",
                "rating": 5
            }
        }
