from sqlmodel import Field, SQLModel

class TBL_Admins(SQLModel, table=True):
    __tablename__ = 'tbl_admin'
    id_admin : int = Field (primary_key=True)
    cargo : str