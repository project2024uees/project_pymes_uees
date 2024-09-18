from pymongo import  MongoClient
import pandas as pd
import uuid
import random
from datetime import datetime
import time

cs = '''mongodb+srv://pymesadmin:Barcel0na1978$@mongodb-uees-vcore.mongocluster.cosmos.azure.com/gestion_inventarios?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000%60'''
data = pd.read_csv('exportados_completos.csv',sep=';')

def generate_unique_id():
    unique_id = str(uuid.uuid4())
    return unique_id

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

data_clean = data[['sku', 'name','brand', 'Proveedor',
       'unitOfMeasurePurchase', 'unitOfMeasureSale', 'origin', 'Categoria',
       'pricePurchase', 'priceSale', 'productStatus']].drop_duplicates()

#data_cat = data[['Categoria']].drop_duplicates()
#data_uom =  data[['unitOfMeasurePurchase']].drop_duplicates()
#data_prov = data[['Proveedor','origin']].drop_duplicates()



# Ejemplo de uso:
new_id = generate_unique_id()





def insert_categoria(df, connection_string, db_name, collection_name):
    try:
        client = MongoClient(connection_string)
        db = client[db_name]
        collection = db[collection_name]
        for _, row in df.iterrows():
            document = {
                "categoryId":  generate_unique_id(), #row["categoryId"],
                "name": row["Categoria"],
                "description": row["Categoria"],
                "notes": ""
            }
            collection.insert_one(document)
        print(f"Inserted {len(df)} documents successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

def insert_uom(df, connection_string, db_name, collection_name):
    try:
        client = MongoClient(connection_string)
        db = client[db_name]
        collection = db[collection_name]
        for _, row in df.iterrows():
            document = {
                "unitId": generate_unique_id(),
                "name": row['unitOfMeasurePurchase'],
                "symbol": row['unitOfMeasurePurchase'][0:2],
                "type": "Unidad de Medida",
                "conversionFactor": 1,
                "description": "Descripción de la unidad de medida",
                "notes": "Notas adicionales sobre la unidad"
            }            
            collection.insert_one(document)
        print(f"Inserted {len(df)} documents successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()


def insert_prov(df, connection_string, db_name, collection_name):
    try:
        client = MongoClient(connection_string)
        db = client[db_name]
        collection = db[collection_name]
        for _, row in df.iterrows():
            document = {
                "supplierId": generate_unique_id(), #"S001",
                "name": row['Proveedor'],
                "type": row['origin'],
                "primaryContact": "Nombre del Contacto",
                "phone": "+1-234-567-8900",
                "email": (row['Proveedor'][0:5]).strip() + "@proveedorx.com",
                "address": "123 Calle Principal, Ciudad, País",
                "country": "EC",
                "paymentTerms": "30 días",
                "currency": "USD",
                "taxIdentificationNumber": "123456789",
                "preferredPaymentMethod": "Transferencia Bancaria",
                "deliveryLeadTime": "7 días",
                "supplierRating": "A+",
                "returnPolicy": "Política de devolución",
                "offeredDiscounts": "Descuentos ofrecidos",
                "notes": "Notas adicionales sobre el proveedor"
                }
            collection.insert_one(document)
        print(f"Inserted {len(df)} documents successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

'''
    ['Fecha', 'sku', 'name', 'VentaUSD', 'StockUSD', 'VentaQTY', 'StockQTY',
       'Contador', 'Salidas', 'Entradas', 'brand', 'Proveedor',
       'unitOfMeasurePurchase', 'unitOfMeasureSale', 'origin', 'Categoria',
       'pricePurchase', 'priceSale', 'productStatus']'''




def buscar_campo(collection, campo_busqueda, valor_busqueda, campo_retorno):
    try:
        resultado = collection.find_one({campo_busqueda: valor_busqueda}, {campo_retorno: 1, '_id': 0})
        if resultado:
            return resultado.get(campo_retorno)
        else:
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def insert_item(df, connection_string, db_name, collection_name):
    try:
        client = MongoClient(connection_string)
        db = client[db_name]
        collection = db[collection_name]
        for _, row in df.iterrows():
            document = {
                "productId": generate_unique_id(),
                "sku": row['sku'],
                "name": row['name'],
                "description": row['name'],
                "category": {
                    "name": row['Categoria'],
                },
                "brand": row['brand'],
                "proveedor": row['Proveedor'],
                "origin": row['origin'],
                "unitOfMeasurePurchase": {
                    "name": row['unitOfMeasurePurchase'],
                },
                "unitOfMeasureSale": {
                    "name": row['unitOfMeasureSale'],
                },
                "productStatus": row['productStatus'],
                }
            collection.insert_one(document)
        print(f"Inserted {len(df)} documents successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

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

#data_mat = data[['sku','name','Categoria','brand','Proveedor','origin','productStatus','unitOfMeasurePurchase','unitOfMeasureSale']].drop_duplicates()





#resultado = buscar_campo(cs, 'gestion_inventarios', 'productos', 'sku', xxx, 'productId')
#print(f"El valor encontrado: {resultado}")





#client = MongoClient(cs)
#db = client['gestion_inventarios']
#collection = db['movimientos_inventario']

#print(data.head())


#insert_categoria(data_cat, cs, 'gestion_inventarios', 'categorias_producto')
#insert_uom(data_uom, cs, 'gestion_inventarios', 'unidades_medida')
#insert_prov(data_prov, cs, 'gestion_inventarios', 'proveedores')
#insert_item(data_mat, cs, 'gestion_inventarios', 'productos')
insert_mov(data[1001:100000], cs, 'gestion_inventarios', 'movimientos')
print(generate_id())

'''


print(data_cat)

client = connect_to_mongo(cs)
if client:
    db = client["gestion_inventarios"]
'''


#client.close()