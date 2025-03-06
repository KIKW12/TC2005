const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuración del servidor
const PORT = 3000;
const PUBLIC_DIR = './public'; // Directorio donde pondrás tus archivos

// Mapeo de extensiones de archivo a tipos MIME
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// Crear el servidor
const server = http.createServer((req, res) => {
    console.log(`Petición recibida: ${req.method} ${req.url}`);

    // Convertir la URL en una ruta del sistema de archivos
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Obtener la extensión del archivo
    const ext = path.extname(filePath);

    // Verificar si el archivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Archivo no encontrado
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 - Página no encontrada</h1>');
            return;
        }

        // Leer y servir el archivo
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h1>500 - Error interno del servidor</h1>');
                return;
            }

            // Determinar el tipo MIME
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            // Enviar la respuesta
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        });
    });
});

// Verificar si existe el directorio public, si no, crearlo
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
    console.log('Directorio public creado');
}

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Sirviendo archivos desde el directorio: ${path.resolve(PUBLIC_DIR)}`);
});