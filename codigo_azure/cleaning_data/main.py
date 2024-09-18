import pandas as pd
from datetime import datetime, timedelta

src = 'data_origin.xlsx'
data = pd.read_excel(src,'COMP')

def reemplazar_numeros_por_letras(df, columna):
    equivalencias = {'0': 'A','1': 'K','2': 'P','3': 'W','4': 'Q','5': 'T','6': 'M','7': 'C','8': 'B','9': 'Z'}
    df[columna] = df[columna].astype(str)
    df[columna] = df[columna].apply(lambda x: ''.join(equivalencias.get(char, char) for char in x))
    return df

def filtrar_dataframe(df, columna, valor):
    df_filtrado = df[df[columna] == valor]
    return df_filtrado

def obtener_dia_anterior(fecha_str):
    fecha = datetime.strptime(fecha_str, '%Y-%m-%d')
    dia_anterior = fecha - timedelta(days=1)
    return dia_anterior.strftime('%Y-%m-%d')

def reemplazar_nan_por_cero(df, columna):
    df[columna] = df[columna].fillna(0)
    return df

def reemplazar_caracter(df, columna, caracter_a, caracter_b):
    df[columna] = df[columna].str.replace(caracter_a, caracter_b, regex=False)
    return df

def find_faltantes(data):
    materiales = data['Material'].unique()
    for m in materiales:
        data_f = data[data['Material'] == m]
        data_f = data_f.sort_values(by='Fecha')
        fecha_minima = data_f['Fecha'].min()
        fecha_maxima = data_f['Fecha'].max()
    
        rango_fechas = pd.date_range(start=fecha_minima, end=fecha_maxima)
        for r in rango_fechas:
            try:
                df = filtrar_dataframe(data_f, 'Fecha', r)
            except Exception as e:
                print(f"{m}, {r}")
    return materiales

def organizar_data(data, campo_orden, grupo):
    data[campo_orden] = pd.to_datetime(data[campo_orden])
    data = data.sort_values(by=[grupo, campo_orden])
    data['Contador'] = data.groupby(grupo).cumcount() + 1
    return data



def calcula_movimientos(dataframe, stock, orden, grupo):
    df = pd.DataFrame()
    dataframe = dataframe.sort_values(by=[grupo, orden])
    dataframe['Salidas'] = 0
    dataframe['Entradas'] = 0
    for g, group_data in dataframe.groupby(grupo):
        group_data = group_data.reset_index(drop=True)
        max = group_data['Contador'].max()
        for i in range(1, max-1):
            
            s0 = group_data[group_data['Contador'] == i]
            s1 = group_data[group_data['Contador'] == i + 1]
            res = s0[stock].values[0] - s1[stock].values[0]

            if res > 0:
                group_data.loc[group_data.index[i], 'Salidas'] = abs(res)
                group_data.loc[group_data.index[i], 'Entradas'] = 0
            elif res < 0:
                group_data.loc[group_data.index[i], 'Salidas'] = 0
                group_data.loc[group_data.index[i], 'Entradas'] = abs(res)
            else:
                group_data.loc[group_data.index[i], 'Salidas'] = 0
                group_data.loc[group_data.index[i], 'Entradas'] = 0
        df = pd.concat([df, group_data], axis=0)

    return df

import pandas as pd

def obtener_palabras_distintas(dataframe, columna):
    texto_completo = ' '.join(dataframe[columna].astype(str))
    
    todas_las_palabras = texto_completo.split()
    
    palabras_distintas = list(set(todas_las_palabras))
    return todas_las_palabras, palabras_distintas

# Ejemplo de uso:
# df = pd.DataFrame({'C': ['hola mundo', 'mundo de python', 'python es genial']})
# todas, distintas = obtener_palabras_distintas(df, 'C')
# print(todas)        # Todas las palabras
# print(distintas)    # Palabras distintas





#print(data.head())

data = reemplazar_nan_por_cero(data, 'VentaUSD')
data = reemplazar_nan_por_cero(data, 'VentaQTY')
data = reemplazar_caracter(data, 'Material_name', ';'," ")
data = reemplazar_numeros_por_letras(data, 'Material')
data = organizar_data(data, 'Fecha', 'Material')

data = calcula_movimientos(data, 'StockQTY', 'Fecha', 'Material')
#mat = find_faltantes(data)




#data.to_csv('exportados.csv', index=False, sep=';', encoding='utf-8')

#print(data.head(2000))

todas, distintas = obtener_palabras_distintas(data, 'Material_name')

print(distintas)
#with open('distintas.csv','+a') as f:
#    f.write(distintas)