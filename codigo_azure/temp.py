#!/usr/bin/env python
# coding: utf-8

import pandas as pd
from pymongo import  MongoClient
from sklearn.model_selection import train_test_split
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C, ExpSineSquared, Matern
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from datetime import datetime
import numpy as np
import matplotlib.pyplot as plt
import os

def connect_to_mongo():
    cs = '''mongodb+srv://pymesadmin:Barcel0na1978$@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000%60'''
    try:
        client = MongoClient(cs)
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
        return client
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def borrar_archivos_pkl(ruta):
    if os.path.exists(ruta) and os.path.isdir(ruta):
        for archivo in os.listdir(ruta):
            if archivo.endswith(".pkl"):
                archivo_completo = os.path.join(ruta, archivo)
                os.remove(archivo_completo)
                print(f"Archivo eliminado: {archivo_completo}")
    else:
        print("La ruta no existe o no es un directorio válido.")

def insert_training(database, sku, mae, rmse, rs, start, end, fecha_quiebre, prediccion):
    try:
        duration = end - start
        collection = database['trainings']
        document = {
                "date": datetime.now(),
                "producSKU": sku,                
                "mae": mae,
                "rmse": rmse, 
                "rs": rs,
                "Duration":{
                "start": start,
                "end": end, 
                "duration": duration.total_seconds()
                },
                "fecha_quiebre": fecha_quiebre,
                "prediccion": prediccion,
                "notes": "Notas adicionales sobre el entrenamiento"
        }            
        collection.insert_one(document)
        print(f"Inserted entrenamiento de {sku}")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

borrar_archivos_pkl('./')
client = connect_to_mongo()
database = client['gestion_inventarios']
collection = database['movimientos']

data_productos = collection.distinct("Product.productSKU")

print(type(data_productos))
print(data_productos[0:10])


