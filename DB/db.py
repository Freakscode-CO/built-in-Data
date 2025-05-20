from sqlmodel import create_engine, Session

URL_DATABASE = 'postgresql://postgres:dani1492@localhost:5432/data_hack_database'

engine = create_engine(URL_DATABASE, echo=True)

"""def create_db_tables():
    SQLModel.metadata.create_all(engine)"""

def get_session():
    return Session(engine)