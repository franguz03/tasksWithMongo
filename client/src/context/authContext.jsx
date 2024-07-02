import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest,loginRequest } from '../api/auth.js';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    // Verificar si el contexto está disponible
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;// retorna el useContext
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para almacenar el usuario
    const [errosRegister, setErrosRegister]=useState([]) // estado para manejar los errores de la peticion register
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para almacenar si el usuario está autenticado
    useEffect(()=>{
        if (errosRegister.length>0){
            const timer =setTimeout(()=>{
                setErrosRegister([])
            },5000)
            return ()=> clearTimeout(timer)
        }
    },[errosRegister])
    // Función para registrarse
    const signup = async (user) => {
        try {
            const res = await registerRequest(user); // Realizar la solicitud de registro
            console.log(res.data);
            setUser(res.data); // Establecer el usuario en el estado
            setIsAuthenticated(true); // Marcar como autenticado
        } catch (error) {
            console.log(error.response); // Manejar errores de registro
            setErrosRegister(error.response.data)
        }
    };
    // Función para iniciar sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res.data)
        } catch (error) {
            setErrosRegister(error.response.data)
            
        }
    }
    // Proveer el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{signin, signup, user, isAuthenticated,errosRegister }}>
            {children}
        </AuthContext.Provider>
    );
};
