from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TopicCreate(BaseModel):
    title: str
    content: str
    category: str

class TopicResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str
    category: str
    created_at: datetime
    
    class Config:
        from_attributes = True
