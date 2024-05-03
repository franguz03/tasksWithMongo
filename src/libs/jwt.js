import jwt from "jsonwebtoken"; // Importa el módulo 'jsonwebtoken' para manejar tokens JWT.
import { TOKEN_SECRET } from "../config.js"; // Importa la clave secreta del token desde un archivo de configuración.

// Función para crear un token de acceso.
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => { // Retorna una promesa para manejar la asincronía.
    jwt.sign( // Utiliza el método 'sign' de 'jsonwebtoken' para firmar el token.
        payload, // Payload de datos que se incluirán en el token.
        TOKEN_SECRET, // Clave secreta utilizada para firmar el token.
        { expiresIn: "1d" }, // Opciones del token, en este caso, expira en un día.
        (err, token) => { // Callback que maneja el resultado de la firma del token.
        if (err) reject(err); // Si hay un error, rechaza la promesa con el error.
        resolve(token); // Si no hay errores, resuelve la promesa con el token generado.
    });
  });
}

