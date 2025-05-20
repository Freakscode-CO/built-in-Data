from sqlmodel import Field, SQLModel

class TBL_Categories(SQLModel, table=True):
    __tablename__ = 'tbl_categories'
    id_categorie : int = Field (primary_key=True)
    type_categorie: str
    mensaje : str