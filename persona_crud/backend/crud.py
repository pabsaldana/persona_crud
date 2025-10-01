from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter(prefix="/personas", tags=["personas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Persona)
def create_persona(persona: schemas.PersonaCreate):
    db = next(get_db())
    db_persona = models.Persona(**persona.dict())
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

@router.get("/", response_model=list[schemas.Persona])
def read_personas():
    db = next(get_db())
    return db.query(models.Persona).all()

@router.delete("/{rut}")
def delete_persona(rut: str):
    db = next(get_db())
    persona = db.query(models.Persona).filter(models.Persona.rut == rut).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    db.delete(persona)
    db.commit()
    return {"ok": True}