from typing import List
from sqlmodel import Field, SQLModel
from sqlalchemy import ARRAY, Float, Column

class TBL_Face(SQLModel, table=True):
    __tablename__ = 'tbl_face'
    id_face : int = Field (primary_key=True)
    id_user : int
    face : List[float] = Field(sa_column=Column(ARRAY(Float)))