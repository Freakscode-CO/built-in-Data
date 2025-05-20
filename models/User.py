from sqlmodel import Field, SQLModel

class TBL_user(SQLModel, table=True):
    __tablename__ = 'tbl_users'
    id_user : int = Field (primary_key=True)
    name_user : str 
    id_student : int 
    id_admin : int 
