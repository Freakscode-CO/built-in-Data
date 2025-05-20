from sqlmodel import Field, SQLModel

class TBL_Contacts(SQLModel, table=True):
    __tablename__ = 'tbl_contacts'
    id_contact : int = Field (primary_key=True)
    email : str
    cellphone : str 