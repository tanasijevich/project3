# import necessary libraries
# from models import create_classes
import pandas as pd
import os
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlite3 import connect 

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    jsonify)

# Read data from csv
#csv_file = "data/Chicago Health Atlas.csv"
#df = pd.read_csv(csv_file)
#df.head()
#df.rename(columns={"VRDIBR_2015-2019":"VRDIBR_2015_2019","VRDIAR_2015-2018":"VRDIAR_2015_2018","VRDTH_2015-2019":"VRDTH_2015_2019","VRCAR_2015-2019":"VRCAR_2015_2019","VRADR_2015-2019":"VRADR_2015_2019","HDX_2015-2019":"HDX_2015_2019"},inplace=True)

#creating sqlite engine to create database
#engine = create_engine('sqlite:///data/Chicago_Health_database.db')
#engine = create_engine('sqlite:///C:/Users/doyel/Desktop/project3_flask_ex1/data/mydatabase.db')
#Table name : Chicago_Health_Atlas

#df.to_sql('Chicago_Health_Atlas',con=engine,if_exists='replace')
#####################################################################
engine = create_engine("sqlite:///data/mydatabase.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
print(Base.classes.keys())

Healthatlas = Base.classes.healthatlas
#Actors = Base.classes.actors

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# ---------------------------------------------------------
# Web site
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():

    return render_template("data.html")


# ---------------------------------------------------------

# API to call "when data.html" page is loading with community information table
@app.route("/api/community")
def community_grid():
    session = Session(engine)
    
    
    results = session.query(Healthatlas.Name,Healthatlas.Median_Household_Income,Healthatlas.Poverty_Rate,Healthatlas.Receiving_Food_Stamps,Healthatlas.Public_Assistance_Income,Healthatlas.High_School_Grad_Rate, Healthatlas.College_Grad_Rate,Healthatlas.Non_Hispanic_White,Healthatlas.Non_Hispanic_Black,Healthatlas.Asian_Pacific_Islander,Healthatlas.Hispanic_or_Latino,Healthatlas.Population_All,Healthatlas.Population_Infants,Healthatlas.Population_Juveniles,Healthatlas.Population_Young_Adults,Healthatlas.Population_Middle_Aged_Adults,Healthatlas.Population_Seniors).all()
    #results = session.query(Healthatlas.Name,Healthatlas.GEOID, Healthatlas.Population,Healthatlas.Longitude, Healthatlas.Latitude).all()
    #results = pd.read_sql('SELECT Name,GEOID,Population,Longitude,Latitude FROM Chicago_Health_Atlas', engine)
    #results = engine.execute("SELECT Name,GEOID,Population,Longitude,Latitude FROM Chicago_Health_Atlas").fetchall()
    #session.query(Movies.title, Movies.director, Movies.year, Movies.rating, Movies.imdb_votes, Movies.imdb_score).all()

    results = [list(r) for r in results]

    table_results = {
        "table": results
    }
    
    
    session.close()
    
    return jsonify(table_results)

# API to call when a disease is selectd from list by user in "data.html" page
@app.route("/api/deceases/<decease>")
def deceases(decease):

    session = Session(engine)

    if decease == "diabetes":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRDIAR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    elif decease == "diabetes_related":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRDIBR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018 ).all()
    elif decease == "alzheimer":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRADR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    elif decease == "cancer":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRCAR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    elif decease == "hypertension":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.HCSHYTP_2016_2018, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    elif decease == "adult_obesity":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.HCSOBP_2016_2018, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    elif decease == "coronary_heart_disease":
        results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRCHDR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
    #elif decease == "all" :
     #   results = session.query(Healthatlas.Name, Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRDTH_2015_2019, Healthatlas.HDX_2015_2019).all()        
    else:
        results = session.query(Healthatlas.Name,Healthatlas.Population_All, Healthatlas.Longitude, Healthatlas.Latitude, Healthatlas.VRADR_2015_2019, Healthatlas.HDX_2015_2019, Healthatlas.HCSSP_2016_2018, Healthatlas.HCSSMKP_2016_2018).all()
        
    
    
    results = [list(r) for r in results]
    
    name = [result[4] for result in results]
    
    hardship = [result[5] for result in results]
    
    soda = [result[6] for result in results]
    
    smoke = [result[7] for result in results]
    
    
    decease_results = {
        "decease_name": name,
        "hd_index": hardship,
        "soda_con":soda,
        "smoking":smoke,
    }

    session.close()

    return jsonify(decease_results)


if __name__ == "__main__":
    app.run()
