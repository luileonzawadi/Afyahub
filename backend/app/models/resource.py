from sqlalchemy import Column, Integer, String, Text, Float
from datetime import datetime
from ..db.database import Base

class Resource(Base):
    __tablename__ = "resources"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)  # testing_center, support_service, counseling, etc.
    description = Column(Text)
    address = Column(String)
    phone = Column(String)
    email = Column(String)
    website = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    hours = Column(String)
    services = Column(Text)  # JSON string of services offered