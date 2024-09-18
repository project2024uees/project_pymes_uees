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

start = datetime.now()

query = {"Product.productSKU": "QAQZPBAA"}
fields = {"date":1, "contador": 1,"type": 1, "productSKU":1, "totalQTY":1, "_id": 0}

resultados = list(collection.find(query, fields).sort("date",1))



data = pd.DataFrame(resultados)


data['dias'] = (data['date'] - data['date'].min()).dt.days

X = data[['dias']]  # Usamos los días como entrada
y = data['totalQTY']  # Usamos el stock como salida

# Dividir en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size= 0.01,  random_state=42)

# Combinación de un kernel RBF con un kernel periódico
kernel = C(1.0, (1e-4, 1e1)) * RBF(10, (1e-2, 1e2)) 
kernel = Matern(length_scale=1.0, nu=1.5)

# Crear el modelo de GPR
gpr = GaussianProcessRegressor(kernel = kernel, n_restarts_optimizer=10, alpha=1e-2)

# Entrenar el modelo con los datos de entrenamiento
gpr.fit(X_train, y_train)

# Hacer predicciones en el conjunto de prueba
y_pred, sigma = gpr.predict(X_test, return_std=True)




# Calcular las métricas de rendimiento
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)
llh = gpr.log_marginal_likelihood()


# Ordenar los datos por el valor de los días
X_test_sorted = X_test.sort_values(by='dias')
y_test_sorted = y_test.loc[X_test_sorted.index]

# Como y_pred es un array de NumPy, lo ordenamos con los índices del DataFrame convertido a un array
y_pred_sorted = y_pred[X_test_sorted.index.argsort()]

'''
# Graficar las predicciones frente a los valores reales
plt.figure(figsize=(10, 6))
# Gráfico de los datos reales
plt.plot(X_test_sorted['dias'], y_test_sorted, 'r.', color='red', label='Datos reales')
# Gráfico de las predicciones
plt.plot(X_test_sorted['dias'], y_pred_sorted, 'b.', color='blue', label='Predicciones')
# Graficar las bandas de incertidumbre
plt.scatter(X_test_sorted['dias'], y_pred_sorted - 1.96 * sigma, y_pred_sorted + 1.96 * sigma,color='blue', alpha=0.2, label='Intervalo de confianza (95%)')
plt.title('Predicción de Stock usando Procesos Gaussianos')
plt.xlabel('Días desde el inicio')
plt.ylabel('Stock')
plt.legend()
plt.show()
'''

# Supongamos que quieres predecir los próximos 30 días
n_dias_prediccion = 30

nuevos_dias = np.arange(len(data) , len(data) + n_dias_prediccion).reshape(-1,1)

fecha_max = data['date'].max()  #+ pd.Timedelta(days= n_dias_prediccion)

y_pred_nuevo, sigma_nuevo = gpr.predict(nuevos_dias, return_std=True)

# Crear un rango de fechas que se extienda a los días predichos
fechas_prediccion = pd.date_range(fecha_max, periods=n_dias_prediccion + 1, freq='D')[1:]

'''
# Visualización de las predicciones
plt.figure(figsize=(14, 6))
plt.plot(data['date'], data['totalQTY'], 'r.', markersize=10, label='Datos Observados')
plt.plot(fechas_prediccion, y_pred_nuevo, 'b+', label='Predicción')
plt.fill_between(fechas_prediccion, y_pred_nuevo - 1.96*sigma_nuevo, y_pred_nuevo + 1.96*sigma_nuevo, alpha=0.2, color='k', label='Intervalo de confianza 95%')
plt.title(f'Predicción del GPR para los próximos {n_dias_prediccion} días')
plt.xlabel('Fecha')
plt.ylabel('Cantidad en Stock')
plt.legend()
plt.show()
'''

# Imprimir los resultados de las predicciones
for i, (fecha, pred, incert) in enumerate(zip(fechas_prediccion, y_pred_nuevo, sigma_nuevo)):
    if pred > 1:
        print(f"Predicción para el {fecha.strftime('%Y-%m-%d')}: {pred:.2f} con incertidumbre de {incert:.2f}")
    else:
        fecha_quiebre = fecha.strftime('%Y-%m-%d')
        prediccion = pred
    

connection_string = "DefaultEndpointsProtocol=https;AccountName=storageuees;AccountKey=uSahqju2rNAGzygs9nasICLZVZsrLGT+eq+wuBB9rOnq3mhNxsfEdCHeGoVEMVOosVw7KdxEArjY+AStl+onpg==;EndpointSuffix=core.windows.net"
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Nombre del contenedor y el blob (archivo) donde guardarás el modelo
container_name = "containeruees"
nombre_modelo = query['Product.productSKU']+'.pkl'
blob_name = "training_models/" + nombre_modelo

joblib.dump(gpr, nombre_modelo)

# Guardar el modelo entrenado en Blob Storage
blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

with open(nombre_modelo, "rb") as file:
    blob_client.upload_blob(file, overwrite=True)

#print(f"Modelo subido a Blob Storage: {blob_name}")
print(f"Modelo guardado como {nombre_modelo}")
end = datetime.now()

insert_training(database, nombre_modelo, mae, rmse, r2, start, end, fecha_quiebre, prediccion)

