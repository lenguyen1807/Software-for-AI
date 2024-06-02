from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import List, Optional

class Library(Document):
    name: str = Field(...)
    address: str = Field(...)
    avatarImageUrl: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None)
    slug: str = Field(...)
    maxBorrowDays: Optional[int] = Field(default=None)
    lateFeePerDay: Optional[int] = Field(default=None)
    numOfRating: Optional[int] = Field(default=0)
    avgRating: Optional[float] = Field(default=0.0)

    class Config:
        schema_extra = {
            "example": {
                "name": "Central Library",
                "address": "123 Library St, Booktown",
                "avatarImageUrl": "https://example.com/image.jpg",
                "description": "A large central library with a vast collection of books.",
                "slug": "central-library",
                "maxBorrowDays": 14,
                "lateFeePerDay": 5,
                "numOfRating": 150,
                "avgRating": 4.7
            }
        }


class LibraryUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    avatarImageUrl: Optional[str] = None
    description: Optional[str] = None
    slug: Optional[str] = None
    maxBorrowDays: Optional[int] = None
    lateFeePerDay: Optional[int] = None
    numOfRating: Optional[int] = None
    avgRating: Optional[float] = None

    class Config:
        schema_extra = {
            "example": {
                "name": "Central Library",
                "address": "123 Library St, Booktown",
                "avatarImageUrl": "https://example.com/image.jpg",
                "description": "A large central library with a vast collection of books.",
                "slug": "central-library",
                "maxBorrowDays": 14,
                "lateFeePerDay": 5,
                "numOfRating": 150,
                "avgRating": 4.7
            }
        }