from fastapi import FastAPI
import classifier
import time

app = FastAPI()


@app.get("/heart")
async def create_item(Smoking, AlcoholDrinking, Stroke, DiffWalking, Sex, AgeCategory, Race, Diabetic, PhysicalActivity, GenHealth, Asthma, KidneyDisease, SkinCancer):
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("heart/train.csv")
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
    time.sleep(5)
    return classifier.classify(data, P, target_name, target_values)[0]

@app.get("/diabetes")
async def create_item(HighBP, HighChol, CholCheck, BMI, Smoker, Stroke, HeartDiseaseorAttack, PhysActivity, Fruits, Veggies, HvyAlcoholConsump, AnyHealthcare, NoDocbcCost, GenHlth, MentHlth, PhysHlth, DiffWalk, Sex, Age, Education, Income):
    (field_names, field_values, target_name, target_values, counts, P) = classifier.train("diabetes/train.csv")
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
    time.sleep(5)
    return classifier.classify(data, P, target_name, target_values)[0]