from fastapi import FastAPI, Request
import classifier
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


@app.get("/heart")
async def create_item(Smoking, AlcoholDrinking, Stroke, DiffWalking, Sex, AgeCategory, Race, Diabetic, PhysicalActivity, GenHealth, Asthma, KidneyDisease, SkinCancer):
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("heart/train.csv")
    # print(Race)
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
    return classifier.classify(data, P, target_name, target_values)[0]

@app.post("/diabetes")
async def create_item(request: Request):
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("diabetes/train.csv")
    a = await request.json()
    return classifier.classify(a, P, target_name, target_values)[0]