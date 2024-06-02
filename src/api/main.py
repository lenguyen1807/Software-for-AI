from fastapi import FastAPI
from Route.bookRoute import bookRoute
from Route.borrowRoute import borrowRoute
from Route.libraryRoute import libraryRoute
from Database.connection import Settings
import uvicorn
from fastapi.responses import RedirectResponse

app = FastAPI()

settings = Settings()

app.include_router(bookRoute, prefix="/api/books")
app.include_router(libraryRoute, prefix="/api/libraries")
app.include_router(borrowRoute, prefix="/api/borrows")


@app.on_event("startup")
async def init_db():
    await settings.initialize_database()


if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)