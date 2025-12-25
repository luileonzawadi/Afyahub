from app.db.database import engine, Base
from app.models.user import User

# Drop the table
User.__table__.drop(engine, checkfirst=True)

print("Table dropped")