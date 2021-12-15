import requests 
import json 

text_file = open("movies.txt", "r")
output_file = open("insertionSQL.txt","a")

lines = text_file.readlines()
actors = []
directors = []

string = "http://www.omdbapi.com/?"
string2 = "&apikey=67ab6726" 

MTH = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

z = 100
i = 0
for i in range(len(lines)):   
    mID = "m" + str(z + i) 
    apicall = string + lines[i] + string2
    response = requests.get(apicall)
 

    resDate = response.json()["Released"] 
    Year = resDate[7:11] 
    Month = MTH.index(resDate[3:6])  
    Day = resDate[0:3] 
    Date = str(Year) + "-" + str(Month) + "-" + str(Day) 

    output_file.write("INSERT INTO movie VALUES (\"" + mID + "\",\""+ response.json()["Title"] + "\"," + response.json()["Runtime"][0:3] + ",\"" +
    response.json()["Plot"] + "\",\"" + Date + "\"," + response.json()["imdbRating"] + ",\"" + response.json()["Poster"] +"\");" + "\n")
    print(i)
    
    act = response.json()["Actors"]  
    if("," in act):
        actors = actors + act.split(',') 
    else:
        actors = actors + [act]
        
    dir = response.json()["Director"]
    if("," in dir):
        directors = directors + dir.split(',')
    else:
        directors = directors + [dir]
        

s = [""]

output_file.write(" ");
actors = map(lambda x: x.strip(), actors)
actors = list(dict.fromkeys(actors))  
for j in range(len(actors)):
    aID = "a" + str(j+z)
    act = actors[j].split(" ",1) + s
    output_file.write("INSERT INTO actor VALUES(\"" + aID + "\",\"" + act[0] + "\",\"" + act[1] + "\");" + "\n"); 
 
directors = map(lambda x: x.strip(), directors)
directors = list(dict.fromkeys(directors)) 
for k in range(len(directors)):
    dID = "d" + str(k+z)
    dir = directors[k].split(" ",1) + s
    output_file.write("INSERT INTO director VALUES(\"" + dID + "\",\"" + dir[0] + "\",\"" + dir[1] + "\");" + "\n"); 

j=0
Dict = []
p=0
Dict2 = []
for i in range(len(lines)):
    mID = "m" + str(z + i) 
    apicall = string + lines[i] + string2
    response = requests.get(apicall)
    
    dire = response.json()["Director"].split(", ")   
    acto = response.json()["Actors"].split(", ")    
    
    for k in range(len(dire)):
        if((dire[k].strip()) in Dict):
            ind = Dict.index(dire[k].strip())
            dID = "d" + str(z + ind)
            output_file.write("INSERT INTO DIRECTS VALUES(\"" + mID + "\",\"" + dID + "\");" + "\n")
        else:
            Dict = Dict + [dire[k].strip()]
            dID = "d" + str(z + j)
            output_file.write("INSERT INTO DIRECTS VALUES(\"" + mID + "\",\"" + dID + "\");" + "\n")
            j+=1 
    
    for k in range(len(acto)):
        if((acto[k].strip()) in Dict2):
            ind = Dict2.index(acto[k].strip())
            aID = "a" + str(z + ind)
            output_file.write("INSERT INTO ACTS_IN VALUES(\"" + mID + "\",\"" + aID + "\");" + "\n")
        else:
            Dict2 = Dict2 + [acto[k].strip()]
            aID = "a" + str(z + p)
            output_file.write("INSERT INTO ACTS_IN VALUES(\"" + mID + "\",\"" + aID + "\");" + "\n")
            p+=1   
    print(i)    
    
text_file.close()

        
    
    
    






