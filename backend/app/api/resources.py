from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..models.resource import Resource

router = APIRouter(prefix="/resources", tags=["Resources"])

@router.get("/")
async def get_resources(type: str = None, db: Session = Depends(get_db)):
    query = db.query(Resource)
    if type:
        query = query.filter(Resource.type == type)
    resources = query.all()
    
    if not resources:
        # Return mock data if no resources in database
        mock_resources = [
            {
                "id": 1,
                "name": "Kenyatta National Hospital VCT",
                "type": "testing_center",
                "description": "Free HIV testing and counseling services",
                "address": "Hospital Rd, Upper Hill, Nairobi",
                "phone": "+254-20-2726300",
                "email": "info@knh.or.ke",
                "website": "https://knh.or.ke",
                "hours": "Mon-Fri 8AM-5PM, Sat 8AM-12PM",
                "services": "HIV Testing, STD Testing, Counseling, PrEP"
            },
            {
                "id": 2,
                "name": "Kenya AIDS NGOs Consortium (KANCO)",
                "type": "support_service",
                "description": "Peer support and advocacy for people living with HIV",
                "address": "Argwings Kodhek Rd, Hurlingham, Nairobi",
                "phone": "+254-20-2715790",
                "email": "info@kanco.org",
                "website": "https://kanco.org",
                "hours": "24/7 Hotline, Office: Mon-Fri 8AM-5PM",
                "services": "Peer Support, Legal Aid, Advocacy, Community Outreach"
            },
            {
                "id": 3,
                "name": "Mombasa Counseling Center",
                "type": "counseling",
                "description": "Mental health and wellness support",
                "address": "Digo Rd, Mombasa",
                "phone": "+254-41-2312345",
                "email": "help@mombasacounseling.org",
                "website": "https://mombasacounseling.org",
                "hours": "Mon-Sat 9AM-6PM",
                "services": "Individual Therapy, Group Therapy, Crisis Intervention"
            },
            {
                "id": 4,
                "name": "Kisumu District Hospital VCT",
                "type": "testing_center",
                "description": "Comprehensive HIV care and treatment",
                "address": "Kakamega Rd, Kisumu",
                "phone": "+254-57-2023456",
                "email": "vct@kisumuhospital.go.ke",
                "website": "https://kisumuhospital.go.ke",
                "hours": "Mon-Fri 8AM-5PM",
                "services": "HIV Testing, Treatment, PrEP, PEP, Specialist Care"
            },
            {
                "id": 5,
                "name": "Nakuru Family Health Options Kenya",
                "type": "support_service",
                "description": "Family planning and HIV prevention services",
                "address": "Kenyatta Ave, Nakuru",
                "phone": "+254-51-2212345",
                "email": "nakuru@fhok.org",
                "website": "https://fhok.org",
                "hours": "Mon-Fri 8AM-5PM, Sat 9AM-1PM",
                "services": "Family Planning, HIV Prevention, Youth Services"
            },
            {
                "id": 6,
                "name": "Eldoret AMPATH Center",
                "type": "testing_center",
                "description": "Academic Model Providing Access to Healthcare",
                "address": "Moi Teaching Hospital, Eldoret",
                "phone": "+254-53-2033471",
                "email": "info@ampath.org",
                "website": "https://ampath.org",
                "hours": "Mon-Fri 7AM-6PM",
                "services": "HIV Testing, Treatment, Research, Training"
            }
        ]
        
        if type:
            mock_resources = [r for r in mock_resources if r["type"] == type]
        
        return mock_resources
    
    return resources

@router.get("/{resource_id}")
async def get_resource(resource_id: int, db: Session = Depends(get_db)):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        return {"error": "Resource not found"}
    return resource