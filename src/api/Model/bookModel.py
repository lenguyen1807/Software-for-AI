from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import List, Optional

class Book(Document):
    title: str = Field(...)
    slug: str = Field(...)
    author: List[str] = Field(...)
    genres: Optional[List[str]] = Field(default=None)
    description: Optional[str] = Field(...)
    language: str = Field(...)
    numPages: int = Field(...)
    imageUrl: str = Field(...)
    publisher: str = Field(...)
    publishDate: str = Field(...)
    series: Optional[List[str]] = Field(default=None)
    totalBorrow: Optional[int] = Field(default=0)  # Assuming default value of 0 if not provided
    libraryID: PydanticObjectId = Field(...)
    totalNum: Optional[int] = Field(default=0)  # Assuming default value of 0 if not provided
    currentNum: int = Field(...)
    numOfRating: Optional[int] = Field(default=0)  # Assuming default value of 0 if not provided
    avgRating: Optional[float] = Field(default=0.0)  # Assuming default value of 0.0 if not provided

    class Config:
        schema_extra = {
            "example": {
                "title": "The book",
                "slug": "the-book",
                "author": ["Vu Minh Thu", "Nguyen Phuong"],
                "genres": ["Fiction", "Adventure"],
                "description": "This book is delicious",
                "language": "en",
                "numPages": 255,
                "imageUrl": "https://example.com/image.jpg",
                "publisher": "NXB NP",
                "publishDate": "02-03-2003",
                "series": ["Series 1"],
                "totalBorrow": 10,
                "libraryID": "60d5ec59f2954c4d5c827d1b",
                "totalNum": 10,
                "currentNum": 10,
                "numOfRating": 100,
                "avgRating": 4.5
            }
        }


class BookUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    author: Optional[List[str]] = None
    genres: Optional[List[str]] = None
    description: Optional[str] = None
    language: Optional[str] = None
    numPages: Optional[int] = None
    imageUrl: Optional[str] = None
    publisher: Optional[str] = None
    publishDate: Optional[str] = None
    series: Optional[List[str]] = None
    totalBorrow: Optional[int] = None
    libraryID: Optional[PydanticObjectId] = None
    totalNum: Optional[int] = None
    currentNum: Optional[int] = None
    numOfRating: Optional[int] = None
    avgRating: Optional[float] = None

    class Config:
        schema_extra = {
            "example": {
                "title": "The book",
                "slug": "the-book",
                "author": ["Vu Minh Thu", "Nguyen Phuong"],
                "genres": ["Fiction", "Adventure"],
                "description": "This book is delicious",
                "language": "en",
                "numPages": 255,
                "imageUrl": "https://example.com/image.jpg",
                "publisher": "NXB NP",
                "publishDate": "02-03-2003",
                "series": ["Series 1"],
                "totalBorrow": 10,
                "libraryID": "60d5ec59f2954c4d5c827d1b",
                "totalNum": 10,
                "currentNum": 10,
                "numOfRating": 100,
                "avgRating": 4.5
            }
        }