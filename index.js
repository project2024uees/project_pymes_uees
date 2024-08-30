require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const app = express();

app.use(express.json()); // Para manejar JSON en las requests

// Configurar el middleware para sesiones
app.use(session({
    secret: 'barcelona',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambia a true si usas HTTPS
}));

// Middleware para verificar la sesión
function verificarSesion(req, res, next) {
    if (req.session && req.session.usuario) {
        // Si la sesión y la variable de sesión existen, continúa
        next();
    } else {
        // Si no existe, redirige a la raíz
        res.redirect('/');
    }
}


// Endpoint para servir la página de login
app.get('/loginx', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/login.html'));
});

// Endpoint para procesar el inicio de sesión
app.post('/login', verificarSesion, (req, res) => {
    // Simulación de autenticación exitosa
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        req.session.user = { username }; // Guardar el usuario en la sesión
        return res.redirect('/principal'); // Redirigir a la página principal después de iniciar sesión
    }
    res.redirect('/login'); // Redirigir de nuevo a login si la autenticación falla
});

// Endpoint para cerrar sesión
app.get('/logout', verificarSesion, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Endpoint para la página principal
app.get('/principal', verificarSesion, (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public/pages/principal.html'));
});

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

connectDB(); // Conectar a la base de datos

/*
// Configurar una ruta de ejemplo
app.get('/', (req, res) => {
    res.send('Inicio de app');
});
*/

// Configurar una ruta para servir index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Una clave secreta para firmar los JWT
const SECRET_KEY = 'barcelona';

// Ejemplo de usuarios guardados en memoria (por simplicidad)
const users = [
    {
        id: 1,
        username: 'admin',
        password: bcrypt.hashSync('admin123', 8)  // Contraseña encriptada
    }
];

// Ruta para loguearse y generar un JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token con el ID del usuario
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Retornar el token
    res.status(200).json({ token });
});

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        // Guardar el ID del usuario en la solicitud para usarlo en otras rutas
        req.userId = decoded.id;
        next();
    });
};

// Ruta protegida, solo accesible con un JWT válido
app.get('/api', verificarSesion, (req, res) => {
    res.status(200).json({ message: `Bienvenido al área protegida, usuario ${req.userId}` });
});


// Endpoint para verificar si la sesión está activa
app.get('/api/check-session', verificarSesion, (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/dashboard', (req, res) => {
    // Aquí podrías pasar datos dinámicos al dashboard
    res.render('dashboard', {
        title: 'Dashboard',
        chartData: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
            data: [12, 19, 3, 5, 2, 3]
        }
    });
});



app.use('/api',  userRoutes); // Usar rutas de usuarios

// Iniciar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});