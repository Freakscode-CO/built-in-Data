from fastapi import FastAPI
from sqlmodel import select
from DB.db import get_session
from models.User import TBL_user
from models.Face import TBL_Face
from models.Time_out_output import TBL_Time_Out_Output
from models.Counts import TBL_Counts
from models.Categories import TBL_Categories
from models.Alerts import TBL_Alerts

app = FastAPI()

# get the data of all for frontend
@app.get("/dashboard_stats")
def Statistics():
    session = get_session()
    users = session.exec(select(TBL_user)).all()
    time_out_output = session.exec(select(TBL_Time_Out_Output)).all()
    counts = session.exec(select(TBL_Counts)).all()
    
    return {
        "users": [
            {
                "id_user": user.id_user,
                "name_user": user.name_user,
                "id_student": user.id_student,
                "id_admin": user.id_admin
            } for user in users
        ],
        "time_out_output": [
            {
                "id_time": record.id_time,
                "time_out": record.time_out,
                "time_output": record.time_output,
            } for record in time_out_output
        ],
        "counts": [
            {
                "id_count": count.id_count,
                "id_user": count.id_user,
                "count_p": count.count_p
            } for count in counts
        ]
    }
# get the data of video for analysis there face and comparate if the user is in the list of the students
# and add a datetime for the time out and the counts the person who enter to the
# college and leave the college 
@app.get("/vision_data/{data}")
def Vision_data(data):
    session = get_session()

    face = session.exec(select(TBL_Face).where(TBL_Face.face == data.face)).first()
    if face:
        user = session.exec(select(TBL_user).where(TBL_user.id_user == face.id_user)).first()
        if user:
            if user.id_student:
                return{
                    "message": "User exist in the list"
                }
            else:
                return{
                    "message": "User not exist in the list"
                }

# create alert for when the user enter to the college and they aren't in the
# list of the students
@app.get("/create_alert/{data}")
def Create_alert(data):
    session = get_session()
    alert = TBL_Alerts(
        id_alert = data.id_alert,
        id_user = data.id_user,
        alert_time = data.alert_time
    )
    session.add(alert)
    return{}

# pull the alert from the database and send it to the frontend
@app.get("/alerts")
def Alerts():
    session = get_session()
    
    return{}

# create the users that will be in the database
@app.post("/create_user/{data}")
def Create_user(data):
    session = get_session()
    user = TBL_user(
        id_user = data.id_user,
        name_user = data.name_user,
        id_student = data.id_student,
        id_admin = data.id_admin
    )
    session.add(user)
    session.commit()
    return{
        "message": "User created successfully"
    }

# create the user if they are student or admin
@app.post("/create_user/{data}")
def Create_user(data):
    if data.id_admin != "":
        admin = TBL_Admin(
            id_admin = data.id_admin,
            name_admin = data.name_admin,
            id_user = data.id_user
        )
    else:
        student = TBL_Student(
            id_student = data.id_student,
            name_student = data.name_student,
            id_user = data.id_user
        )
    return{
        "message": "User created successfully"
    }

# get the kind of the categories
@app.get("/categories")
def Categories():
    session = get_session()
    categories = session.exec(select(TBL_Categories)).all()
    return{
        "categories": [
            {
                "id_category": category.id_category,
                "name_category": category.name_category
            } for category in categories
        ]
    }