from sqlalchemy import Column, String, Integer, CHAR
from database import Base

class Persona(Base):
    __tablename__ = "personas"
    rut = Column(String, primary_key=True, index=True)
    nombre = Column(String)
    edad = Column(Integer)
    genero = Column(CHAR)