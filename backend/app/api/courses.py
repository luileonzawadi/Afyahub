from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from ..db.database import get_db
from ..models.user import User
from ..models.course import Course, Module, Enrollment, Progress
from ..schemas.course import CourseCreate, CourseResponse, ModuleCreate, ModuleResponse, EnrollmentResponse, ProgressUpdate, ProgressResponse
from .auth import get_current_user

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/")
def get_courses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    courses = db.query(Course).all()
    
    # Add enrollment status for each course
    result = []
    for course in courses:
        enrollment = db.query(Enrollment).filter(
            Enrollment.user_id == current_user.id,
            Enrollment.course_id == course.id
        ).first()
        
        course_dict = {
            "id": course.id,
            "title": course.title,
            "description": course.description,
            "image": course.image,
            "duration": course.duration,
            "level": course.level,
            "created_at": course.created_at,
            "enrolled": enrollment is not None,
            "modules": course.modules
        }
        result.append(course_dict)
    
    return result

@router.get("/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    # Calculate progress
    modules = db.query(Module).filter(Module.course_id == course_id).all()
    progress_records = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.module_id.in_([m.id for m in modules])
    ).all()
    
    completed_count = len([p for p in progress_records if p.completed])
    progress_percentage = 0
    if len(modules) > 0:
        progress_percentage = int((completed_count / len(modules)) * 100)
    
    return {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "image": course.image,
        "duration": course.duration,
        "level": course.level,
        "created_at": course.created_at,
        "enrolled": enrollment is not None,
        "progress": progress_percentage,
        "modules": course.modules
    }

@router.post("/", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_course = Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.post("/{course_id}/enroll", response_model=EnrollmentResponse)
def enroll_course(course_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    existing = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    if existing:
        return existing
    
    enrollment = Enrollment(user_id=current_user.id, course_id=course_id)
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return enrollment

@router.get("/{course_id}/modules", response_model=List[ModuleResponse])
def get_modules(course_id: int, db: Session = Depends(get_db)):
    modules = db.query(Module).filter(Module.course_id == course_id).order_by(Module.order).all()
    return modules

@router.post("/{course_id}/modules", response_model=ModuleResponse)
def create_module(course_id: int, module: ModuleCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    new_module = Module(**module.dict())
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module

@router.post("/modules/{module_id}/progress", response_model=ProgressResponse)
def update_progress(module_id: int, progress_data: ProgressUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    progress = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.module_id == module_id
    ).first()
    
    if progress:
        progress.completed = 1 if progress_data.completed else 0
        progress.completed_at = datetime.utcnow() if progress_data.completed else None
    else:
        progress = Progress(
            user_id=current_user.id,
            module_id=module_id,
            completed=1 if progress_data.completed else 0,
            completed_at=datetime.utcnow() if progress_data.completed else None
        )
        db.add(progress)
    
    db.commit()
    db.refresh(progress)
    return progress

@router.get("/user/progress")
def get_user_progress(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    enrollments = db.query(Enrollment).filter(Enrollment.user_id == current_user.id).all()
    progress = db.query(Progress).filter(Progress.user_id == current_user.id).all()
    
    return {
        "enrolledCourses": len(enrollments),
        "completedModules": len([p for p in progress if p.completed]),
        "certificatesEarned": 0
    }
