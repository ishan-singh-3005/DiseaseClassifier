from collections import defaultdict
import sys

def train(train_filename):
    with open(train_filename,"r") as f:
        train_data = [ line.strip().split(',') for line in f.readlines() ]
    
    field_names, train_data = train_data[0], train_data[1:]
    field_values = { field_names[i] : { row[i] for row in train_data } for i in range(len(field_names)) }
    
    target_name = field_names[-1]
    target_values = sorted(list(field_values[target_name]))
    
    counts = defaultdict(int)
    for row in train_data:
        counts[("*","*",field_names[-1], row[-1])]+=1
        for i in range(len(field_names)-1):
            counts[(field_names[i], row[i], field_names[-1], row[-1])]+=1

    P=defaultdict(lambda: 0.0)
    for c,v in counts.items():
        if c[0]=="*" and c[1]=="*":
            P[c]=v/len(train_data)
        else: 
            P[c]=v/counts[("*","*",c[2],c[3])]

    return (field_names, field_values, target_name, target_values, counts, P)

def report_counts(counts, counts_filename):
    # Note: if (X=x n Y=y) not in count, then count(X=x n Y=y)=0
    counts_txt = []
    for c,v in counts.items():
        counts_txt.append("{},{},{},{},{}".format(c[0],c[1],c[2],c[3],v))
    counts_txt.sort()
    
    f = open(counts_filename, "w")
    for line in counts_txt:
        f.write(line+"\n")
    f.close()

def report_probabilities(P, probabilities_filename):
    P_txt = []
    for c,v in P.items():
        P_txt.append("{},{},{},{},{}".format(c[0],c[1],c[2],c[3],v))
    P_txt.sort()

    f = open(probabilities_filename, "w")
    for line in P_txt:
        f.write(line+"\n")
    f.close()

'''
P(Y=y1|X=x) = P(X1=x1|Y=y1)P(X2=x2|Y=y1)... P(Xn=xn|Y=y1) P(Y=y1)/P(X=x)
P(Y=y2|X=x) = P(X1=x1|Y=y2)P(X2=x2|Y=y2)... P(Xn=xn|Y=y2) P(Y=y2)/P(X=x)
P(Y=y3|X=x) = P(X1=x1|Y=y3)P(X2=x2|Y=y3)... P(Xn=xn|Y=y3) P(Y=y3)/P(X=x)
...
P(Y=yk|X=x) = P(X1=x1|Y=yk)P(X2=x2|Y=yk)... P(Xn=xn|Y=yk) P(Y=yk)/P(X=x)
'''
def classify(observation, P, target_name, target_values):

    Ptop={} # the numerator of the Baysean classification probabilities
    for target_value in target_values:
        Ptop[target_value]=P[("*","*",target_name,target_value)]
        for o,v in observation.items():
            Ptop[target_value]*=P[(o,v,target_name,target_value)]
    return max(Ptop, key=Ptop.get), Ptop

def test(target_name, target_values, P, test_filename, out_filename):
    '''
    Now that we have trained P, we have the target_name and
    its possible values, target_values, we run through each line
    of test_filename (which must have the same form as train_filename)
    and classify each line in test_filename, and record how well
    the classifier works.
    '''

    with open(test_filename,"r") as f:
        test_data = [ line.strip().split(',') for line in f.readlines() ]
    
    field_names, test_data = test_data[0], test_data[1:]
    
    with open(out_filename, "w") as outfile: 
        # selected_fields=[ True, True, True, False, True, True, True, True, False, True, True, False, False ]
    
        count, total = 0,0
        for row in test_data[1:]:
            observation = { field_names[i]: row[i] for i in range(len(row)-1) }
            # observation = { field_names[i]: row[i] for i in range(len(row)-1) if selected_fields[i] }
        
            classed, Ptop = classify(observation, P, target_name, target_values)
        
            is_correct="WRONG"
            if row[-1]==classed: 
                is_correct="CORRECT"
                count +=1
            total +=1
        
            ptopString = ""
            for target_value in Ptop:
                ptopString += " Ptop({}={}|X=x)={}".format(target_name, target_value,Ptop[target_value])
            outfile.write("{} class={} {} {}\n".format(",".join(row), classed, is_correct, ptopString))
        
        # https://developers.google.com/machine-learning/crash-course/classification/accuracy
        outfile.write("Accuracy: {}/{}={}\n".format(count, total, count/total))

if __name__ == "__main__":
    if len(sys.argv)!=1:
        print('''
Usage: naieveBayes.py 
       learning from train.csv
       testing on test.csv
       producing counts.csv
                 probabilities.csv
                 out.txt
       train consists of a header line and then rows, the last column is the class
       test consists of a header line and then rows, the last column is the class
''')
        sys.exit(1)
    
    (field_names, field_values, target_name, target_values, counts, P) = train("backend/heart/train.csv")
    report_counts(counts, "backend/heart/counts.csv")
    report_probabilities(P, "backend/heart/probabilities.csv")
    test(target_name, target_values, P, "backend/heart/test.csv", "backend/heart/out.csv")
    print(field_values)

    data = {
        "Smoking": "Yes",
        "AlcoholDrinking": "Yes",
        "Stroke": "Yes",
        "DiffWalking": "Yes",
        "Sex": "Male",
        "AgeCategory": "70-74",
        "Race": "White",
        "Diabetic": "Yes",
        "PhysicalActivity":"No",
        "GenHealth": "Very good",
        "Asthma": "Yes",
        "KidneyDisease": "No",
        "SkinCancer": "No"
    }
    print(field_names)

    # print(classify(data, P, target_name, target_values)[0])