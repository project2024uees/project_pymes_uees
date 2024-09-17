const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Producto = require('../models/Productos');  // Importamos el modelo de productos
const Usuario = require('../models/Usuarios');
const Permiso = require('../models/Permisos');
//const Movimientos = require('../models/MovimientosInventario');
const Movimientos = require('../models/Movimientos');
const Trainings = require('../models/Trainings');
const ColaTraining = require('../models/ColaTrainings');

router.post('/newProduct', async (req, res) => {
    try {
        const newProducto = new Producto(req.body);
        await newProducto.save();
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Lista todos los productos con los campos necesarios
router.get('/listProduct', async (req, res) => {
    try {
        // Seleccionar solo los campos necesarios
        const products = await Producto.find({}, 'productId sku name category.brand category.name brand').exec();
        res.json(products);
    } catch (error) {
        console.error('Error listando productos:', error);
        res.status(500).json({ error: 'Error listando productos' });
    }
});


// Obtener un producto por su ID
router.get('/findProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Producto.findOne({ productId }).exec();
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({ error: 'Error obteniendo producto' });
    }
});

// Actualizar un producto por su ID
router.put('/updateProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Producto.findOneAndUpdate(
            { productId },
            updatedProductData,
            { new: true } // Devuelve el producto actualizado
        );

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ error: 'Error actualizando producto' });
    }
});

// Crear un nuevo usuario
router.post('/createUser', async (req, res) => {
    const newUser = req.body;
    try {
        // Generar hash de la contraseña (puedes usar bcrypt o cualquier otra librería)
        //newUser.password = await bcrypt.hash(newUser.password, 10);

        const usuario = new Usuario(newUser);
        await usuario.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        // console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
});


// Ruta para obtener el kardex filtrado
router.post('/kardex', async (req, res) => {
    const { sku, name, nrecords } = req.body;

    try {
        const query = {};
        if (sku) {
            query['Product.productSKU'] = { $regex: sku, $options: 'i' }; // Búsqueda por SKU
        } else if (name) {
            query['Product.productName'] = { $regex: name, $options: 'i' };
        }
        console.log(query)
        const movimientos = await Movimientos.find(query).sort({ date: -1 }).limit(nrecords);

        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el kardex' });
    }
});





// Ruta para obtener los 20 SKU con mayor totalQTY del movimiento más reciente
router.post('/productosMovimientosTop20', async (req, res) => {
    try {
        // Paso 1: Obtener todos los productos
        const productos = await Producto.find({}, {
            "category.name": 1, // Solo traemos los campos específicos que nos interesan
            sku: 1,
            name: 1,
            proveedor: 1
        });

        // Paso 2: Crear una lista para almacenar los productos junto a su movimiento más reciente
        const productosConMovimientos = [];

        for (const producto of productos) {
            // Paso 3: Encontrar el movimiento más reciente para el SKU del producto actual
            const movimientoMasReciente = await Movimientos
                .findOne({ 'Product.productSKU': producto.sku }, {
                    date: 1,
                    totalQTY: 1,
                    totalCost: 1
                })
                .sort({ date: -1 });  // Ordenar por fecha en orden descendente y tomar el más reciente

            // Paso 4: Combinar el producto con el movimiento más reciente
            if (movimientoMasReciente) {
                productosConMovimientos.push({
                    producto: {
                        category: producto.category.name,
                        sku: producto.sku,
                        name: producto.name,
                        proveedor: producto.proveedor
                    },
                    movimiento: {
                        date: movimientoMasReciente.date,
                        totalQTY: movimientoMasReciente.totalQTY,
                        totalCost: movimientoMasReciente.totalCost
                    }
                });
            }
        }

        // Paso 5: Ordenar los productos por totalQTY de forma descendente
        productosConMovimientos.sort((a, b) => b.movimiento.totalQTY - a.movimiento.totalQTY);

        // Paso 6: Limitar el resultado a los 20 primeros SKU con mayor totalQTY
        const top20Productos = productosConMovimientos.slice(0, 20);

        // Paso 7: Devolver la lista combinada de productos con movimientos (solo top 20)
        res.json(top20Productos);

    } catch (error) {
        console.error('Error al obtener productos y movimientos:', error);
        res.status(500).json({ error: 'Error al obtener productos y movimientos' });
    }
});


// Lista todos los productos con los campos necesarios
/*
router.get('/listTrainings', async (req, res) => {
    try {
        // Seleccionar solo los campos necesarios
        const trainings = await Trainings.find({},' date productSKU mae rmse rs Duration.duration fecha_quiebre prediction').exec();
        res.json(trainings);
    } catch (error) {
        console.error('Error listando entrenamientos:', error);
        res.status(500).json({ error: 'Error listando entrenamientos' });
    }
});*/


router.get('/listTrainings', async (req, res) => {
    try {
        // Pipeline de agregación para obtener el entrenamiento más reciente por productSKU
        const pipeline = [
            {
                $sort: { "fecha_quiebre": 1 }  // Ordenar por fecha descendente
            },
            {
                $group: {
                    _id: "$productSKU",  // Agrupar por SKU
                    mostRecentTraining: { $first: "$$ROOT" }  // Obtener el documento más reciente
                }
            },
            {
                $replaceRoot: { newRoot: "$mostRecentTraining" }  // Reemplazar con el documento más reciente
            },
            {
                $project: {
                    date: 1,
                    productSKU: 1,
                    mae: 1,
                    rmse: 1,
                    rs: 1,
                    "Duration.duration": 1,
                    fecha_quiebre: 1,
                    prediccion: 1,
                    incertidumbre: 1
                }
            }

        ];

        const trainings = await Trainings.aggregate(pipeline).exec();

        res.json(trainings);
    } catch (error) {
        console.error('Error listando entrenamientos:', error);
        res.status(500).json({ error: 'Error listando entrenamientos' });
    }
});


router.get('/getProductName', async (req, res) => {
    const { sku } = req.query; // Obtenemos el SKU de los parámetros de consulta

    if (!sku) {
        return res.status(400).json({ error: 'Debes proporcionar un productSKU' });
    }

    try {
        // Buscar en la base de datos el producto que coincida con el SKU proporcionado
        const producto = await Producto.findOne({ 'sku': sku });

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Devolver el nombre del producto
        res.json({ productName: producto.name });
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        res.status(500).json({ error: 'Error al buscar el producto' });
    }
});


// Ruta para recibir los entrenamientos
router.post('/entrenar', async (req, res) => {
    const { sku } = req.body;

    if (!sku) {
        return res.status(400).send({ error: 'El SKU es requerido' });
    }

    try {
        // Crear un nuevo documento en la colección "colaTraining"
        const newTraining = new ColaTraining({
            sku: sku,
            date: new Date() // Fecha y hora actual
        });

        // Guardar en la base de datos
        await newTraining.save();

        res.status(201).send({ message: `Entrenamiento registrado para SKU: ${sku}` });
    } catch (error) {
        console.error('Error al registrar el entrenamiento:', error);
        res.status(500).send({ error: 'Hubo un error al registrar el entrenamiento' });
    }
});


// Ruta para obtener el promedio de la diferencia entre totalQTY y predictedQTY para un productSKU
router.get('/diferenciapromedio/:sku', async (req, res) => {
    const productSKU = req.params.sku;
    try {
        const pipeline = [
            {
                $match: { "Product.productSKU": productSKU } // Filtrar por SKU
            },
            {
                $project: {
                    productSKU: "$Product.productSKU",
                    diferencia: { $subtract: ["$totalQTY", "$predictedQTY"] }
                }
            },
            {
                $group: {
                    _id: "$productSKU",  // Agrupar por SKU
                    promedioDiferencia: { $avg: "$diferencia" }  // Calcular el promedio de la diferencia
                }
            }
        ];

        const resultado = await Movimientos.aggregate(pipeline);

        // Si no hay resultados, devolver un error 404
        if (!resultado || resultado.length === 0) {
            return res.status(404).json({ error: 'No se encontraron datos para ese SKU' });
        }

        // Responder con el resultado
        res.json(resultado[0]); // Enviar el primer (y único) resultado
    } catch (error) {
        console.error('Error al obtener el promedio de la diferencia:', error);
        res.status(500).json({ error: 'Error al obtener el promedio de la diferencia' });
    }
});






module.exports = router;


