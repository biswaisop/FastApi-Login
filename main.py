from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
#for login and password hashing
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "9f3cce62b346702d8c37ef9b25a287a0e4161680e4a41ec6cac1d3c57e426f21"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

fake_db = {
    'Biswa':{
        "username":"biswaman",
        "Full_name":"Biswadip Mandal",
        "email":"biswadipmandal99@gmail.com",
        "Hashed_password":"",
        "disabled":False
    }
}

class Token(BaseModel):
    access_token:str
    token_type:str

class TokenData(BaseModel):
    username: str | None = None

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

class UserInDb(User):
    hashed_password:str

passwd_context = CryptContext(schemes=['brcypt'], deprecated = "auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return passwd_context.verify(plain_password, hashed_password)

def get_hash_passwd(password):
    return passwd_context.hash(password)

def get_user(db, username:str):
    if username in db:
        user_data = db[username]
        return UserInDb(**user_data)
    
def authenticate_user(db, username:str, password:str):
    user = get_user(db, username)
    if not user :
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_Token(data:dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes = 15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth_2_scheme)):
    credental_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail = "Can't validate credentials", headers={"www-Auhenticate":"Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credental_exception
        Token_data = TokenData(username=username)
    except JWTError:
        raise credental_exception
    user = get_user(db, username=Token_data.username)
    if user is None:
        raise credental_exception
    return user
