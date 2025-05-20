from sqlmodel import Field, SQLModel

class TBL_Alerts(SQLModel, table=True):
    __tablename__ = 'tbl_alerts'
    id_aletr : int = Field (primary_key=True)
    id_count : int
    id_categorie : int