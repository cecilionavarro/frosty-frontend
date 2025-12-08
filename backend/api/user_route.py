from fastapi import APIRouter
from models.user import User
from db.mongo import collection_name
from schema.user import list_serial
from bson import ObjectId

router = APIRouter()

@router.get("/user")
async def get_users():
  users = list_serial(collection_name.find())
  return users

@router.post("/user")
async def post_users(user: User):
  collection_name.insert_one(dict(user))
  return user