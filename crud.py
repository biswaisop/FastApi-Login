from database import user_collection
from models import UserInDB
from bson.objectid import ObjectId

async def get_user(username: str) -> UserInDB | None:
    user = await user_collection.find_one({"username": username})
    return UserInDB(**user) if user else None

async def create_user(user: UserInDB):
    await user_collection.insert_one(user.dict())
