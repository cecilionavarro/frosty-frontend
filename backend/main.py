from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from api.user_route import router

app = FastAPI()

app.include_router(router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.backend_cors_origin,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)