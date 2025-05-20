from sqlmodel import Field, SQLModel

class TBL_Contacts(SQLModel, table=True):
    __tablename__ = 'tbl_estudents'
    id_student : int = Field (primary_key=True)
    carrera : str
    semestre: int 