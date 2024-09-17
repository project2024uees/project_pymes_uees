import joblib
import os
import joblib
from datetime import datetime
from azure.storage.blob import BlobServiceClient
from pymongo import MongoClient
import numpy as np
import pandas as pd
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module='pymongo')
warnings.filterwarnings("ignore", category=UserWarning, module='sklearn')

# Configuraciones de Azure Storage
AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=storageuees;AccountKey=uSahqju2rNAGzygs9nasICLZVZsrLGT+eq+wuBB9rOnq3mhNxsfEdCHeGoVEMVOosVw7KdxEArjY+AStl+onpg==;EndpointSuffix=core.windows.net"
AZURE_CONTAINER_NAME = 'containeruees'

# Configuraciones de MongoDB
MONGODB_CONNECTION_STRING = "mongodb+srv://pymesadmin:Barcel0na1978$@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"
MONGODB_DB_NAME = 'gestion_inventarios'
MONGODB_COLLECTION_NAME = 'movimientos'

# Ruta temporal para almacenar los archivos .pkl descargados
TEMP_DIR = 'temp3'

def connect_to_mongo(connection_string, db_name, collection_name):
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    return client, collection

def cargar_modelo(path):
    try:
        modelo = joblib.load(path)
        print("Modelo cargado exitosamente.")
        return modelo
    except KeyError as e:
        print(f"Error: KeyError al cargar el modelo. Detalles: {e}")
    except Exception as e:
        print(f"Error inesperado: {e}")
    return None

def download_pkl_files(blob_service_client, container_name, download_path):
    container_client = blob_service_client.get_container_client(container_name)
    pkl_files = []
    print("Descargando archivos .pkl desde Azure Storage...")
    for blob in container_client.list_blobs():
        if blob.name.endswith('.pkl'):
            download_file_path = os.path.join(download_path, os.path.basename(blob.name))
            with open(download_file_path, "wb") as download_file:
                download_stream = container_client.download_blob(blob)
                download_file.write(download_stream.readall())
            pkl_files.append(download_file_path)
            print(f"Descargado: {blob.name}")
    return pkl_files

def listar_archivos(ruta):
    try:
        archivos = [nombre for nombre in os.listdir(ruta) if os.path.isfile(os.path.join(ruta, nombre))]
        return archivos
    except Exception as e:
        print(f"Error al listar archivos en la ruta {ruta}: {e}")
        return []

def borrar_archivo(ruta_archivo):
    try:
        if os.path.isfile(ruta_archivo):
            os.remove(ruta_archivo)  # Eliminar el archivo
            print(f"Archivo {ruta_archivo} eliminado con éxito.")
        else:
            print(f"El archivo {ruta_archivo} no existe.")
    except Exception as e:
        print(f"Error al intentar eliminar el archivo: {e}")




def main():
    client, collection = connect_to_mongo(MONGODB_CONNECTION_STRING, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME)
    #blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    #pkl_files = download_pkl_files(blob_service_client, AZURE_CONTAINER_NAME, TEMP_DIR)
    archivos = listar_archivos(TEMP_DIR)
    arc = 0
    for a in archivos:
        #query = {"Product.productSKU": a.replace('.pkl','')}
        product_sku = a.replace('.pkl','')

        modelo = cargar_modelo(TEMP_DIR + '/' + a)
        if modelo:
            X_test = modelo.X_train_
            for x in X_test:
                #dias = pd.DataFrame([x], columns=['dias'])
                y_pred, sigma = modelo.predict([x], return_std=True)

                c = int(x[0]) + 1
                # Actualizar el documento en MongoDB
                collection.update_one(
                    {   "contador": c,           # Condición del contador
                        "Product.productSKU": product_sku      # Condición del SKU del producto
                    },
                    {
                        "$set": {
                            "predictedQTY": y_pred[0], 
                            "uncertainty": sigma[0]
                        }
                    }
                )
        arc = arc + 1
        print(f"Archivo #: {arc}, Producto: {product_sku}")     
        borrar_archivo(TEMP_DIR + '/' + a )
    client.close()            

        
main()