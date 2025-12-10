from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ModuleBase(BaseModel):
    title: str
    content: Optional[str] = None
    video_url: Optional[str] = None
    order: int

class ModuleCreate(ModuleBase):
    course_id: int

class ModuleResponse(ModuleBase):
    id: int
    course_id: int
    
    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    image: Optional[str] = None
    duration: Optional[str] = None
    level: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    created_at: datetime
    modules: List[ModuleResponse] = []
    
    class Config:
        from_attributes = True

class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    enrolled_at: datetime
    
    class Config:
        from_attributes = True

class ProgressUpdate(BaseModel):
    completed: bool

class ProgressResponse(BaseModel):
    id: int
    user_id: int
    module_id: int
    completed: bool
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
