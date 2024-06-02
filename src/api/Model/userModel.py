from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import List, Optional
from pydantic.functional_validators import Annotated, BeforeValidator
import datetime

from bson import ObjectId
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date


class User(Document):
    userName: str = Field(..., unique=True)
    password: str = Field(...)
    dateOfBirth: Optional[date] = Field(default=None)
    role: str = Field(default="user")
    listOfLib: Optional[List[PydanticObjectId]] = Field(default=None)
    address: Optional[str] = Field(default=None)
    status: Optional[bool] = Field(default=True)  # Assuming status is binary, using boolean for clarity

    class Config:
        schema_extra = {
            "example": {
                "userName": "john_doe",
                "password": "securepassword123",
                "dateOfBirth": "1990-01-01",
                "role": "user",
                "listOfLib": ["60d5ec59f2954c4d5c827d1b", "60d5ec59f2954c4d5c827d1c"],
                "address": "456 User Ave, Hometown",
                "status": True
            }
        }


class UserUpdate(BaseModel):
    userName: Optional[str] = None
    password: Optional[str] = None
    dateOfBirth: Optional[date] = None
    role: Optional[str] = None
    listOfLib: Optional[List[PydanticObjectId]] = None
    address: Optional[str] = None
    status: Optional[bool] = None

    class Config:
        schema_extra = {
            "example": {
                "userName": "john_doe",
                "password": "securepassword123",
                "dateOfBirth": "1990-01-01",
                "role": "user",
                "listOfLib": ["60d5ec59f2954c4d5c827d1b", "60d5ec59f2954c4d5c827d1c"],
                "address": "456 User Ave, Hometown",
                "status": True
            }
        }
