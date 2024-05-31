    import express from 'express';
    import { createConnection } from 'mysql';
    import pkg from 'body-parser'

    const {urlencoded, json} = pkg

    const app = express();
    const PORT = 3000;

    // Configuración para analizar el cuerpo de las solicitudes
    app.use(urlencoded({ extended: true }));
    app.use(json());

    // Configuración de la conexión a la base de datos
    const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phpmyadmin'
    });

    connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
    });


    // Definir una ruta para crear la tabla
    app.get('/crear-tabla', (req, res) => {
        const createTableQuery = `
        CREATE TABLE productos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            precio DECIMAL(10, 2) NOT NULL,
            descripcion TEXT
        )
        `;
    
        connection.query(createTableQuery, (err, results) => {
        if (err) {
            console.error('Error al crear la tabla:', err);
            res.status(500).send('Error al crear la tabla');
        } else {
            console.log('Tabla creada exitosamente');
            res.send('Tabla creada exitosamente');
        }
        });
    });

    app.post('/agregar-producto', (req, res) => {
        const { nombre, precio, descripcion } = req.body;
    
        const insertQuery = `
        INSERT INTO productos (nombre, precio, descripcion)
        VALUES (?, ?, ?)
        `;
    
        connection.query(insertQuery, [nombre, precio, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar producto:', err);
            res.status(500).send('Error al agregar producto');
        } else {
            console.log('Producto agregado exitosamente');
            res.send('Producto agregado exitosamente');
        }
        });
    });
    
    app.get('/productos', (req, res) => {
        const selectQuery = 'SELECT * FROM productos';
    
        connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error al seleccionar productos:', err);
            res.status(500).send('Error al seleccionar productos');
        } else {
            console.log('Productos seleccionados exitosamente');
            res.json(results);
        }
        });
    });





    app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
    });

    export default app