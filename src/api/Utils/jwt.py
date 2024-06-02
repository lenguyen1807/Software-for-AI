from typing import Any

import jwt
from fastapi import Depends, HTTPException, status
database = {"username": "admin", "password": "123"}
async def check_login(username, password):
    if username == "admin" and password == "123":
        return True
    else:
        return False


def generate_token(
        username: str = None,
        password: str = None,
        is_valid: Any = Depends(check_login)
):
    print("Hello")
    print(is_valid)
    if is_valid == True:
        print("Valid login")

if __name__ == "__main__":
    generate_token("admin", "123")
