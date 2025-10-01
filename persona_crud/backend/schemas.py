from pydantic import BaseModel

class PersonaBase(BaseModel):
    rut: str
    nombre: str
    edad: int
    genero: str

class PersonaCreate(PersonaBase):
    pass

class Persona(PersonaBase):
    class Config:
        orm_mode = True