from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours for development
    DATABASE_URL: str = "sqlite:///./afyahub.db"
    
    class Config:
        env_file = ".env"

settings = Settings()
