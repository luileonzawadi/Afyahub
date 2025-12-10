from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.forum import ForumTopic
from .dependencies import get_current_user
from ..models.user import User
from datetime import datetime

router = APIRouter(prefix="/forum", tags=["Forum"])

@router.get("/topics")
async def get_topics(db: Session = Depends(get_db)):
    topics = db.query(ForumTopic).order_by(ForumTopic.created_at.desc()).all()
    return [{
        "id": t.id,
        "title": t.title,
        "excerpt": t.content[:150] + "..." if len(t.content) > 150 else t.content,
        "category": t.category,
        "author": t.user.name if t.user else "Anonymous",
        "createdAt": t.created_at.isoformat(),
        "commentsCount": 0,
        "votesCount": 0
    } for t in topics]

@router.get("/topics/{topic_id}")
async def get_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(ForumTopic).filter(ForumTopic.id == topic_id).first()
    if not topic:
        return {"id": topic_id, "title": "Not Found", "content": "Topic not found"}
    return {
        "id": topic.id,
        "title": topic.title,
        "content": topic.content,
        "category": topic.category,
        "author": topic.user.name if topic.user else "Anonymous",
        "createdAt": topic.created_at.isoformat()
    }

@router.post("/topics")
async def create_topic(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    data = await request.json()
    topic = ForumTopic(
        title=data.get("title"),
        content=data.get("content"),
        category=data.get("category", "general"),
        user_id=current_user.id,
        created_at=datetime.utcnow()
    )
    db.add(topic)
    db.commit()
    db.refresh(topic)
    return {
        "id": topic.id,
        "title": topic.title,
        "content": topic.content,
        "category": topic.category,
        "author": current_user.name,
        "createdAt": topic.created_at.isoformat()
    }

@router.delete("/topics/{topic_id}")
async def delete_topic(
    topic_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    topic = db.query(ForumTopic).filter(ForumTopic.id == topic_id).first()
    if not topic:
        return {"error": "Topic not found"}
    if topic.user_id != current_user.id and current_user.role != "admin":
        return {"error": "Not authorized"}
    
    db.delete(topic)
    db.commit()
    return {"message": "Topic deleted successfully"}
