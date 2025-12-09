from fastapi import APIRouter, HTTPException
from models.user import User
from db.mongo import collection_name
from schema.user import individual_serial
from bson import ObjectId

router = APIRouter()

@router.post("/user")
async def post_user(user: User):
  res = collection_name.insert_one(dict(user))
  return {"id": str(res.inserted_id), **user.model_dump()}

@router.get("/user")
async def get_user(user_id: str):
  user = collection_name.find_one({"_id": ObjectId(user_id)})
  if not user:
    raise HTTPException(status_code=404, detail="No user found")
  return individual_serial(user)