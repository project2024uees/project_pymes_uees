from pymongo import  MongoClient
import pandas as pd
import uuid
import random
from datetime import datetime
import time

cs = '''mongodb+srv://pymesadmin:Barcel0na1978$@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000%60'''
data = pd.read_csv('exportados_completos.csv',sep=';')

def generate_id():
    # Obtener el timestamp actual en milisegundos
    return  int(time.time() * 1000000000)

def connect_to_mongo(connection_string):
    try:
        client = MongoClient(connection_string)
        client.admin.command('ping')
        print("Connected to MongoDB successfully!")
        return client
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def insert_mov(df, connection_string, db_name, collection_name):
    try:
        client = MongoClient(connection_string)
        db = client[db_name]
        collection = db[collection_name]
        for _, row in df.iterrows():
            document = {
                "movementId": generate_id(),
                "date": datetime.strptime(row['Fecha'], '%d/%m/%Y'),       #row['Fecha'],
                "type":  'Salidas' if row['Salidas'] > 0 else 'Entradas' if row['Entradas'] > 0 else 'Ninguna',
                "Product":{                
                    "productSKU": row['sku'],
                    "productName": row['name'],
                    "productCategory": row['Categoria'],
                },
                "quantity_d": row['Entradas'],
                "quantity_h": row['Salidas'],
                "unitOfMeasure": row['unitOfMeasureSale'],
                "reason": 'Ventas' if row['Salidas'] > 0 else 'Compras' if row['Entradas'] > 0 else 'Inventario Inicial' if row['Contador'] > 1 else 'Ninguna',
                "documentMaterial": '0000-0000-0000', #generate_unique_id(),
                "supplierOrClient": row["Proveedor"],
                "warehouseOrigin": {
                    "warehouseId": "W001",
                    "name": "Almacén Principal"
                },
                "responsibleUser": 'USER_000' + str(random.randint(1, 5)),
                "unitCost": row['StockQTY']/row['StockUSD'] if row['StockUSD'] != 0 else 0,
                "totalCost": row['StockUSD'],
                "totalQTY": row['StockQTY'],
                "VentaUSD": row['VentaUSD'],
                "VentaQTY": row['VentaQTY'],
                "movementStatus": "Completado",
                "contador":row['Contador']
                }
            collection.insert_one(document)
        print(f"Inserted {len(df)} documents successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()


insert_mov(data[30001:60000], cs, 'gestion_inventarios', 'movimientos')
print(generate_id())

