from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db.database import engine, Base
from .api import auth, courses, users, forum, admin, resources

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AfyaHub API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(courses.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(forum.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(resources.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AfyaHub API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
