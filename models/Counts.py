from sqlmodel import Field, SQLModel

class TBL_Counts(SQLModel, table=True):
    __tablename__ = 'tbl_counts'
    id_count : int = Field (primary_key=True)
    count_p : int
    id_user : int