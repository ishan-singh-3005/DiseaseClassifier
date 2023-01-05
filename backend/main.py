from fastapi import FastAPI
import classifier
import time
from fastapi.middleware.cors import CORSMiddleware
import database

app = FastAPI()

origins = [
    "http://localhost",
    "http://127.0.0.1:8000",
    "https://ishan-singh-3005.github.io",
    "https://gnu0os.deta.dev",
    "http://localhost:3000",
    "http://localhost:3000/DiseaseClassifier"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"message": "HealthML working"}


@app.post("/train/heart")
def heart_train():
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("heart/train.csv")
    for i in P:
        database.db["heart"].insert_one({"feild1" : i[0], "value1": i[1], "feild2" : i[2], "value2": i[3], "prob": P[i]})
    return 0

@app.post("/train/diabetes")
def diabetes_train():
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("diabetes/train.csv")
    for i in P:
        database.db["diabetes"].insert_one({"feild1" : i[0], "value1": i[1], "feild2" : i[2], "value2": i[3], "prob": P[i]})
    return 0

(field_names_h, field_values_h, target_name_h, target_values_h, counts_h, P_h) = classifier.train("heart/train.csv")
@app.get("/heart")
async def create_item(Smoking, AlcoholDrinking, Stroke, DiffWalking, Sex, AgeCategory, Race, Diabetic, PhysicalActivity, GenHealth, Asthma, KidneyDisease, SkinCancer):
    data = {
        "Smoking": Smoking,
        "AlcoholDrinking": AlcoholDrinking,
        "Stroke": Stroke,
        "DiffWalking": DiffWalking,
        "Sex": Sex,
        "AgeCategory": AgeCategory,
        "Race": Race,
        "Diabetic": Diabetic,
        "PhysicalActivity":PhysicalActivity,
        "GenHealth": GenHealth,
        "Asthma": Asthma,
        "KidneyDisease": KidneyDisease,
        "SkinCancer": SkinCancer
    }
    # time.sleep(5)
    return classifier.classify(data, P_h, target_name_h, target_values_h)[0]
    # return "this endpoint is functional"

(field_names_d, field_values_d, target_name_d, target_values_d, counts_d, P_d) = classifier.train("diabetes/train.csv")
@app.get("/diabetes")
async def create_item(HighBP, HighChol, CholCheck, BMI, Smoker, Stroke, HeartDiseaseorAttack, PhysActivity, Fruits, Veggies, HvyAlcoholConsump, AnyHealthcare, NoDocbcCost, GenHlth, MentHlth, PhysHlth, DiffWalk, Sex, Age, Education, Income):
    data = {
        "HighBP":HighBP,
        "HighChol":HighChol,
        "CholCheck":CholCheck,
        "BMI":BMI,
        "Smoker":Smoker,
        "Stroke":Stroke,
        "HeartDiseaseorAttack":HeartDiseaseorAttack,
        "PhysActivity":PhysActivity,
        "Fruits":Fruits,
        "Veggies":Veggies,
        "HvyAlcoholConsump":HvyAlcoholConsump,
        "AnyHealthcare":AnyHealthcare,
        "NoDocbcCost":NoDocbcCost,
        "GenHlth":GenHlth,
        "MentHlth":MentHlth,
        "PhysHlth":PhysHlth,
        "DiffWalk":DiffWalk,
        "Sex":Sex,
        "Age":Age,
        "Education":Education,
        "Income":Income
    }
    # time.sleep(5)
    return classifier.classify(data, P_d, target_name_d, target_values_d)[0]