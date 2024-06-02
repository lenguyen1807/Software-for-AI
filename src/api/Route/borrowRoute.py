from typing import List, Optional

from beanie import PydanticObjectId
from fastapi import FastAPI, APIRouter
from Model.borrowModel import Borrow, BorrowUpdate
from Controller.borrowController import BorrowController
borrowRoute = APIRouter(tags=['Borrow'])

@borrowRoute.get('', response_model=List[Borrow])
async def get_borrows(
        libraryID: Optional[PydanticObjectId] = None,
        userID: Optional[PydanticObjectId] = None,
        sort_by: Optional[str] = "_id",
        limit: Optional[int] = 10,
        page:  Optional[int] = 1
) -> List[Borrow]:
    borrows = await BorrowController.get_borrows(libraryID=libraryID,
                                                 userID=userID,
                                                 sort_by=sort_by,
                                                 limit=limit,
                                                 page=page)
    return borrows

@borrowRoute.get('/{borrowID}', response_model=Borrow)
async def get_borrow(
        borrowID: PydanticObjectId
) -> Borrow:
    return await BorrowController.get_borrow(borrowID=borrowID)

@borrowRoute.post('', response_model=dict)
async def create_borrow(
        body: Borrow
) -> dict:
    response = await BorrowController.create_borrow(body=body)
    return response

@borrowRoute.delete('/{borrowID}', response_model=dict)
async def delete_borrow(
        borrowID: PydanticObjectId
) -> dict:
    response = await BorrowController.delete_borrow(borrowID)
    return response

@borrowRoute.put('/{borrowID}', response_model=Borrow)
async def update_borrow(
        borrowID: PydanticObjectId,
        body: BorrowUpdate
) -> Borrow:
    borrow = await BorrowController.update_borrow(borrowID=borrowID, body=body)
    return borrow
