from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"  # Replace with your MongoDB URI
client = AsyncIOMotorClient(MONGO_URL)
db = client.user_auth_db  # Your DB name
user_collection = db.users  # Your collection
