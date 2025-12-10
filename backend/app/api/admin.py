from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.user import User
from ..models.course import Course, Module, Enrollment, Progress
from ..schemas.course import CourseCreate, ModuleCreate
from .auth import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin"])

def verify_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    total_users = db.query(User).count()
    total_courses = db.query(Course).count()
    total_enrollments = db.query(Enrollment).count()
    total_modules = db.query(Module).count()
    
    return {
        "totalUsers": total_users,
        "totalCourses": total_courses,
        "totalEnrollments": total_enrollments,
        "totalModules": total_modules
    }

@router.get("/users")
def get_users(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    users = db.query(User).all()
    return users

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.role == "admin":
        raise HTTPException(status_code=403, detail="Cannot delete admin users")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

@router.get("/courses")
def get_admin_courses(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    courses = db.query(Course).all()
    return courses

@router.post("/courses")
def create_admin_course(course: CourseCreate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    new_course = Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course

@router.put("/courses/{course_id}")
def update_course(course_id: int, course: CourseCreate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    for key, value in course.dict().items():
        setattr(db_course, key, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course

@router.delete("/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(db_course)
    db.commit()
    return {"message": "Course deleted successfully"}

@router.post("/courses/{course_id}/modules")
def create_admin_module(course_id: int, module: ModuleCreate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    new_module = Module(course_id=course_id, **module.dict())
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module

@router.put("/modules/{module_id}")
def update_module(module_id: int, module: ModuleCreate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    for key, value in module.dict().items():
        setattr(db_module, key, value)
    
    db.commit()
    db.refresh(db_module)
    return db_module

@router.delete("/modules/{module_id}")
def delete_module(module_id: int, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    db_module = db.query(Module).filter(Module.id == module_id).first()
    if not db_module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    db.delete(db_module)
    db.commit()
    return {"message": "Module deleted successfully"}
