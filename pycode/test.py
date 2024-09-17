import joblib

try:
    modelo = joblib.load('temp_models/QAAAZKZW.pkl')
    print("Modelo cargado exitosamente.")
except KeyError as e:
    print(f"Error: KeyError al cargar el modelo. Detalles: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")

'''
import joblib

with open('temp_models/QAAAZKZW.pkl', 'rb') as f:
    try:
        while True:
            obj = joblib.load(f)
            print(f"Objeto cargado: {obj}")
    except EOFError:
        print("Fin del archivo alcanzado.")
    except KeyError as e:
        print(f"Error de clave al cargar el objeto: {e}")
    except Exception as e:
        print(f"Otro error: {e}")

# Verificar los parámetros del modelo
print("Parámetros del modelo:")
print(modelo.get_params())

# Ver la lista de métodos y atributos disponibles en el modelo
print("Métodos y atributos disponibles en el modelo:")
print(dir(modelo))

# Si quieres ver el kernel utilizado
if hasattr(modelo, 'kernel'):
    print(f"Kernel utilizado: {modelo.kernel}")

# Si quieres ver los datos de entrenamiento si fueron guardados
if hasattr(modelo, 'X_train_'):
    print(f"Datos de entrenamiento (X): {modelo.X_train_}")
if hasattr(modelo, 'y_train_'):
    print(f"Datos de entrenamiento (y): {modelo.y_train_}")

# Ver si hay más información sobre el ruido o incertidumbre (sigma)
if hasattr(modelo, 'alpha'):
    print(f"Nivel de ruido del modelo (alpha): {modelo.alpha}")
'''
import numpy as np

#print(modelo.X_train_)

for x in modelo.X_train_:
    print(x)
    y_pred, sigma = modelo.predict([x], return_std=True)
    print(f"Fecha: {x}, Predicción: {y_pred}, Incertidumbre: {sigma}")

# Supongamos que tienes una entrada de prueba
#X_test = np.array([[17]])  # Cambia este valor según tu entrada
#print(X_test)

# Obtener la predicción y la incertidumbre (sigma)
#y_pred, sigma = modelo.predict(X_test, return_std=True)

#print(f"Predicción: {y_pred}, Incertidumbre: {sigma}")
