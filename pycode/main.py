import os
#import pickle
import joblib
from datetime import datetime
from azure.storage.blob import BlobServiceClient
from pymongo import MongoClient
import numpy as np

# Configuraciones de Azure Storage
AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=storageuees;AccountKey=uSahqju2rNAGzygs9nasICLZVZsrLGT+eq+wuBB9rOnq3mhNxsfEdCHeGoVEMVOosVw7KdxEArjY+AStl+onpg==;EndpointSuffix=core.windows.net"
AZURE_CONTAINER_NAME = 'containeruees'




# Configuraciones de MongoDB
MONGODB_CONNECTION_STRING = "mongodb+srv://pymesadmin:Barcel0na1978$@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000%60"
MONGODB_DB_NAME = 'gestion_inventarios'
MONGODB_COLLECTION_NAME = 'respaldo_mov'

# Ruta temporal para almacenar los archivos .pkl descargados
TEMP_DIR = 'temp_models'

# Asegurarse de que el directorio temporal exista
os.makedirs(TEMP_DIR, exist_ok=True)

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
'''
def load_models(pkl_files):
    models = {}
    print("Cargando modelos desde archivos .pkl...")
    for file_path in pkl_files:
        sku = os.path.splitext(os.path.basename(file_path))[0]
        with open(file_path, 'rb') as file:
            model = pickle.load(file)
            models[sku] = model
            print(f"Modelo cargado para SKU: {sku}")
    return models
'''

def load_models(pkl_files):
    models = {}
    print("Cargando modelos desde archivos .pkl...")
    for file_path in pkl_files:
        sku = os.path.splitext(os.path.basename(file_path))[0]
        with open(file_path, 'rb') as file:
            model = joblib.load(file)  # Usar joblib en lugar de pickle
            models[sku] = model
            print(f"Modelo cargado para SKU: {sku}")
    return models

def connect_to_mongo(connection_string, db_name, collection_name):
    client = MongoClient(connection_string)
    db = client[db_name]
    collection = db[collection_name]
    return collection

'''
def prepare_features(date_str, total_qty):
    # Convertir la fecha a un formato numérico. Por ejemplo, timestamp
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')  # Ajusta el formato según tus datos
    timestamp = date_obj.timestamp()
    # Preparar las características tal como fueron usadas durante el entrenamiento
    # Supongamos que se usaron [timestamp, total_qty] como características
    return np.array([[timestamp, total_qty]])


def prepare_features(date_input, total_qty):
    if isinstance(date_input, str):
        date_obj = datetime.strptime(date_input, '%Y-%m-%d')  # Ajusta el formato según tus datos
    elif isinstance(date_input, datetime):
        date_obj = date_input  
    else:
        raise ValueError(f"Formato de fecha no reconocido: {date_input}")
    timestamp = date_obj.timestamp()
    return np.array([[timestamp, total_qty]])
'''

def prepare_features(date_input, total_qty):
    fecha_base = datetime(2021, 1, 1)  # Ajusta la fecha base según lo necesario

    if isinstance(date_input, str):
        date_obj = datetime.strptime(date_input, '%Y-%m-%d')  # Ajusta el formato según tus datos
    elif isinstance(date_input, datetime):
        date_obj = date_input  # Ya es un objeto datetime
    else:
        raise ValueError(f"Formato de fecha no reconocido: {date_input}")

    dias = (date_obj - fecha_base).days

    return np.array([[dias]])


def main():
    # Conectar a Azure Storage y descargar los modelos
    blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
    pkl_files = download_pkl_files(blob_service_client, AZURE_CONTAINER_NAME, TEMP_DIR)
    
    # Cargar los modelos en memoria
    models = load_models(pkl_files)
    
    # Conectar a MongoDB
    collection = connect_to_mongo(MONGODB_CONNECTION_STRING, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME)
    
    # Iterar sobre cada SKU y actualizar los documentos correspondientes
    for sku, model in models.items():
        print(f"Procesando SKU: {sku}")
        # Buscar todos los documentos para este SKU
        query = {"Product.productSKU": sku}
        documentos = collection.find(query).sort({'contador':-1})
        
        for doc in documentos:
            date_str = doc.get('date')  # Asegúrate de que el formato de la fecha sea correcto
            total_qty = doc.get('totalQTY')

            contador = doc.get('contador')
            
            if date_str is None or total_qty is None:
                print(f"Documento con _id {doc['_id']} tiene campos faltantes. Saltando...")
                continue
            
            try:
                # Preparar las características para la predicción
                #X = prepare_features(date_str, total_qty)
                X = prepare_features(contador, total_qty)
                
                # Realizar la predicción
                predicted_qty = model.predict(X)[0]
                
                # Actualizar el documento en MongoDB
                collection.update_one(
                    {"_id": doc['_id']},
                    {"$set": {"predictedQTY": predicted_qty}}
                )
                print(f"Documento _id {doc['_id']} actualizado con predictedQTY: {predicted_qty}")
            except Exception as e:
                print(f"Error al procesar documento _id {doc['_id']}: {e}")
    
    print("Actualización completada.")


import os

def listar_archivos(ruta):
    try:
        if not os.path.isdir(ruta):
            print(f"La ruta {ruta} no es válida.")
            return []
        archivos = [ruta +'/' + nombre for nombre in os.listdir(ruta) if os.path.isfile(os.path.join(ruta, nombre))]
        return archivos
    except Exception as e:
        print(f"Error al listar archivos en la ruta {ruta}: {e}")
        return []

# Ejemplo de uso
#ruta = '/ruta/a/tu/directorio'
#archivos = listar_archivos(ruta)
#print(archivos)


def execute():
    pkl_files = listar_archivos(TEMP_DIR)
    #print(pkl_files)
    models = load_models(pkl_files)
    print(models.items)

    # Conectar a MongoDB
    collection = connect_to_mongo(MONGODB_CONNECTION_STRING, MONGODB_DB_NAME, MONGODB_COLLECTION_NAME)
    
    # Iterar sobre cada SKU y actualizar los documentos correspondientes
    for sku, model in models.items():
        print(f"Procesando SKU: {sku}")
        # Buscar todos los documentos para este SKU
        query = {"Product.productSKU": sku}
        documentos = collection.find(query)
        
        for doc in documentos:
            date_str = doc.get('date')  # Asegúrate de que el formato de la fecha sea correcto
            total_qty = doc.get('totalQTY')
            
            if date_str is None or total_qty is None:
                print(f"Documento con _id {doc['_id']} tiene campos faltantes. Saltando...")
                continue
            
            try:
                # Preparar las características para la predicción
                X = prepare_features(date_str, total_qty)
                
                # Realizar la predicción
                predicted_qty = model.predict(X)[0]
                
                # Actualizar el documento en MongoDB
                collection.update_one(
                    {"_id": doc['_id']},
                    {"$set": {"predictedQTY": predicted_qty}}
                )
                print(f"Documento _id {doc['_id']} actualizado con predictedQTY: {predicted_qty}")
            except Exception as e:
                print(f"Error al procesar documento _id {doc['_id']}: {e}")
    
    print("Actualización completada.")




if __name__ == "__main__":
    #main()
    execute()
