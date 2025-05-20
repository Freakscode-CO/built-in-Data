from datetime import datetime
from sqlmodel import Field, SQLModel

class TBL_Time_Out_Output(SQLModel, table=True):
    __tablename__ = 'tbl_time_out_output'
    id_time : int = Field (primary_key=True)
    time_out : datetime
    time_output : datetime
    id_user : int