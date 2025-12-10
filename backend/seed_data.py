from app.db.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.course import Course, Module
from app.models.forum import ForumTopic, ForumComment
from app.core.security import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Create admin user
admin = db.query(User).filter(User.email == "admin@afyahub.com").first()
if not admin:
    admin = User(
        name="Admin User",
        email="admin@afyahub.com",
        hashed_password=get_password_hash("admin123"),
        role="admin"
    )
    db.add(admin)
    print("Admin user created")

# Create demo user
demo = db.query(User).filter(User.email == "demo@afyahub.com").first()
if not demo:
    demo = User(
        name="Demo User",
        email="demo@afyahub.com",
        hashed_password=get_password_hash("demo123"),
        role="learner"
    )
    db.add(demo)
    print("Demo user created")

db.commit()

# Create sample courses
if db.query(Course).count() == 0:
    courses_data = [
        {
            "title": "Understanding HIV/AIDS",
            "description": "Comprehensive introduction to HIV/AIDS with video lessons, infographics, and interactive quizzes covering transmission, prevention, and treatment basics.",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
            "duration": "4 weeks",
            "level": "Beginner"
        },
        {
            "title": "Prevention Strategies",
            "description": "Learn effective prevention methods and risk reduction strategies through video lessons, infographics, and interactive quizzes.",
            "image": "https://images.unsplash.com/photo-1584515933487-779824d29309",
            "duration": "3 weeks",
            "level": "Beginner"
        },
        {
            "title": "Living with HIV",
            "description": "Support and guidance for individuals living with HIV/AIDS featuring video lessons, infographics, and interactive quizzes.",
            "image": "https://images.unsplash.com/photo-1559757175-5700dde675bc",
            "duration": "6 weeks",
            "level": "Intermediate"
        }
    ]
    
    for course_data in courses_data:
        course = Course(**course_data)
        db.add(course)
        db.commit()
        db.refresh(course)
        
        # Add modules to first course
        if course.title == "Understanding HIV/AIDS":
            modules = [
                {
                    "title": "What is HIV/AIDS?", 
                    "order": 1, 
                    "content": "<h2>Introduction to HIV/AIDS</h2><p>HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If left untreated, HIV can lead to AIDS (Acquired Immunodeficiency Syndrome).</p><h3>Key Points:</h3><ul><li>HIV weakens the immune system</li><li>Early detection is crucial</li><li>Treatment is available and effective</li></ul>",
                    "video_url": "https://www.youtube.com/embed/0d_2nk8LD-M"
                },
                {
                    "title": "How HIV is Transmitted", 
                    "order": 2, 
                    "content": "<h2>Transmission Methods</h2><p>HIV is transmitted through specific body fluids including blood, semen, vaginal fluids, and breast milk.</p><h3>Common Transmission Routes:</h3><ul><li>Unprotected sexual contact</li><li>Sharing needles</li><li>Mother to child during pregnancy/birth</li></ul>",
                    "video_url": "https://www.youtube.com/embed/GR5K756WUw0"
                },
                {
                    "title": "HIV Testing", 
                    "order": 3, 
                    "content": "<h2>Getting Tested</h2><p>Regular testing is crucial for early detection and treatment. HIV tests are confidential, quick, and widely available.</p><h3>Testing Options:</h3><ul><li>Rapid tests (results in 20 minutes)</li><li>Laboratory tests</li><li>Home testing kits</li></ul>",
                    "video_url": "https://www.youtube.com/embed/NeEF_JKF8mI"
                },
                {
                    "title": "Treatment Options", 
                    "order": 4, 
                    "content": "<h2>Antiretroviral Therapy (ART)</h2><p>Modern treatments can help people with HIV live long, healthy lives. ART suppresses the virus and prevents transmission.</p><h3>Benefits of Treatment:</h3><ul><li>Reduces viral load</li><li>Strengthens immune system</li><li>Prevents transmission (U=U)</li></ul>",
                    "video_url": "https://www.youtube.com/embed/libKVRa01L8"
                },
            ]
            
            for module_data in modules:
                module = Module(course_id=course.id, **module_data)
                db.add(module)
        
        print(f"Course created: {course.title}")

db.commit()
db.close()

print("\nDatabase seeded successfully!")
print("\nDefault credentials:")
print("Admin: admin@afyahub.com / admin123")
print("Demo: demo@afyahub.com / demo123")
