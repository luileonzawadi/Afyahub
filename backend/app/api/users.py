from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.user import User
from ..models.course import Enrollment, Progress
from ..schemas.user import UserResponse
from .auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/progress")
def get_progress(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    from ..models.course import Course, Module
    
    enrollments = db.query(Enrollment).filter(Enrollment.user_id == current_user.id).all()
    progress = db.query(Progress).filter(Progress.user_id == current_user.id).all()
    
    enrolled_courses_data = []
    for enrollment in enrollments:
        course = db.query(Course).filter(Course.id == enrollment.course_id).first()
        if course:
            modules = db.query(Module).filter(Module.course_id == course.id).all()
            completed_modules = [p for p in progress if p.module_id in [m.id for m in modules] and p.completed]
            
            course_progress = 0
            if len(modules) > 0:
                course_progress = int((len(completed_modules) / len(modules)) * 100)
            
            enrolled_courses_data.append({
                "id": course.id,
                "title": course.title,
                "description": course.description,
                "thumbnail": course.image,
                "progress": course_progress,
                "enrolled": True
            })
    
    return {
        "enrolledCourses": len(enrollments),
        "completedModules": len([p for p in progress if p.completed]),
        "certificatesEarned": 0,
        "enrolledCoursesData": enrolled_courses_data,
        "stats": {
            "coursesEnrolled": len(enrollments),
            "modulesCompleted": len([p for p in progress if p.completed]),
            "certificatesEarned": 0
        }
    }
