import pandas as pd
from datetime import datetime, timedelta
import random

src = 'exportados.csv'
data = pd.read_csv(src, sep=';', encoding='utf-8')

marcas = [
    'Danone', 'Nestlé', 'Lactalis', 'Yoplait', 'Müller', 'Arla Foods', 'Fonterra', 'FrieslandCampina',
    'Parmalat', 'Meiji', 'La La', 'Colanta', 'Vigor', 'Bonlé', 'Central Lechera Asturiana', 'Fage',
    'Valio', 'Tnuva', 'Kiri', 'Philadelphia', 'Organic Valley', 'Wallaby Organic', 'So Delicious', 'Silk',
    'Alpro', 'Emmental', 'Cheddar', 'Gouda', 'Parmesano', 'Mozzarella', 'Kerrygold', 'Président',
    'Carnation', 'Eagle Brand', 'Similac', 'Enfamil', 'Aptamil', 'Breyers', 'Häagen-Dazs', 'Ben & Jerry\'s',
    'Magnum', 'Cornetto', 'Twister', 'Eskimo', 'Milka', 'Kinder', 'Lidl', 'Aldi', 'Auchan', 'Carrefour'
]

proveedores = [
    'Danone', 'Nestlé', 'Lactalis', 'Yoplait', 'Müller', 'Arla Foods', 'Fonterra', 'FrieslandCampina',
    'Parmalat', 'Meiji', 'La La', 'Colanta', 'Vigor', 'Bonlé', 'Central Lechera Asturiana', 'Fage',
    'Valio', 'Tnuva', 'Kiri', 'Philadelphia', 'Organic Valley', 'Wallaby Organic', 'So Delicious', 'Silk',
    'Alpro', 'Emmental', 'Cheddar', 'Gouda', 'Parmesano', 'Mozzarella', 'Kerrygold', 'Président',
    'Carnation', 'Eagle Brand', 'Similac', 'Enfamil', 'Aptamil', 'Breyers', 'Häagen-Dazs', 'Ben & Jerry\'s',
    'Magnum', 'Cornetto', 'Twister', 'Eskimo', 'Milka', 'Kinder', 'Lidl', 'Aldi', 'Auchan', 'Carrefour',
    'Saputo', 'Schreiber Foods', 'Leprino Foods', 'Glanbia', 'DMV International', 'Yili', 'Mengniu', 'Bright Dairy',
    'Amul', 'Britannia', 'Arla Foods', 'Bongrain', 'Bel Group', 'Savencia Fromage & Dairy', 'Lactalis',
    'Groupe Lactalis', 'Groupe Danone', 'Unilever', 'Kraft Heinz', 'General Mills', 'Conagra Brands', 
    'Dean Foods', 'Borden Dairy', 'Land O\'Lakes', 'Dairy Farmers of America', 'Darigold', 'Organic Valley',
    'Stonyfield Organic', 'Horizon Organic', 'Clover Sonoma', 'Maple Hill Creamery', 'Straus Family Creamery',
    'Cowgirl Creamery', 'Jasper Hill Farm', 'Beecher\'s Handmade Cheese', 'Rogue Creamery', 'Cypress Grove',
    'Point Reyes Farmstead Cheese', 'Vella Cheese', 'Di Bruno Bros.', 'Murray\'s Cheese', 'Formaggio Kitchen',
    'Zingerman\'s', 'Cowgirl Creamery', 'Jasper Hill Farm', 'Beecher\'s Handmade Cheese', 'Rogue Creamery',
    'Cypress Grove', 'Point Reyes Farmstead Cheese', 'Vella Cheese'
]

uomp = ['Metro','Litro','Gramo','Kiligramo','Unidad']

origin = ['Ecuador','Extranjero']

cat = ['Leches', 'Polvo de leche', 'Quesos', 'Yogures', 'Dulces']

valores = [random.uniform(0.1,25) for _ in range(10000)]

def asignar_atributo(dataframe, material_columna, lista, nueva_columna):
    materiales_unicos = dataframe[material_columna].unique()
    material_proveedor = {material: random.choice(lista) for material in materiales_unicos}
    dataframe[nueva_columna] = dataframe[material_columna].map(material_proveedor)

    return dataframe

data = asignar_atributo(data, 'Material', proveedores, 'Marca')
data = asignar_atributo(data, 'Material', proveedores, 'Proveedor')
data = asignar_atributo(data, 'Material', uomp, 'unitOfMeasurePurchase')
data = asignar_atributo(data, 'Material', uomp, 'unitOfMeasureSale')
data = asignar_atributo(data, 'Material', origin, 'origin')
data = asignar_atributo(data, 'Material', cat, 'Categoria')
data = asignar_atributo(data, 'Material', valores, 'pricePurchase')
data['priceSale'] = data['pricePurchase'] * 1.25
data['productStatus'] = '1'

print(data.head(10000))

data.to_csv('exportados_completos.csv', index=False, sep=';', encoding='utf-8')