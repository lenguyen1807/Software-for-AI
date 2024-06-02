from typing import Optional
from beanie import PydanticObjectId
from fastapi import HTTPException

from Model.borrowModel import Borrow, BorrowUpdate
from Database.connection import Database

borrowDatabase = Database(Borrow)

class BorrowController:
    @staticmethod
    async def get_borrows(
            libraryID: Optional[PydanticObjectId] = None,
            userID: Optional[PydanticObjectId] = None,
            sort_by: Optional[str] = "_id",
            limit: Optional[int] = 10,
            page:  Optional[int] = 1
    ) -> list[Borrow]:
        query = {}
        if libraryID is not None:
            query.update({"libraryID": libraryID})
        if userID is not None:
            query.update({"userID":userID})

        borrows = await borrowDatabase.get_all(limit=limit, page=page, sort_by=sort_by, query=query)

        return borrows

    @staticmethod
    async def get_borrow(
            borrowID: Optional[PydanticObjectId]
    ) -> Borrow:
        borrow = await borrowDatabase.get_one(borrowID)
        if not borrow:
            raise HTTPException(status_code=404, detail="Borrow not found")
        return borrow

    @staticmethod
    async def delete_borrow(
            borrowID: Optional[PydanticObjectId]
    ) -> dict or None:
        is_deleted = await borrowDatabase.delete(borrowID)
        if not is_deleted:
            raise HTTPException(status_code=404, detail="Borrow not found")
        return {"message": "Borrow deleted successfully"}

    @staticmethod
    async def update_borrow(
            borrowID: Optional[PydanticObjectId],
            body: BorrowUpdate
    ) -> Borrow or None:
        borrow = await borrowDatabase.update(borrowID, body=body)
        if not borrow:
            raise HTTPException(status_code=404, detail="Borrow not found")
        return borrow

    @staticmethod
    async def create_borrow(
            body: Borrow
    ) -> dict or None:
        try:
            await borrowDatabase.create(body)
        except HTTPException as e:
            raise HTTPException(status_code=e.status_code)
        return {"message": "Borrow created successfully"}





