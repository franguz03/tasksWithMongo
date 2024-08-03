import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest,loginRequest,verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie'

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
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if (errosRegister.length>0){
            const timer =setTimeout(()=>{
                setErrosRegister([])
            },5000)
            return ()=> clearTimeout(timer)
        }
    },[errosRegister])

    useEffect(()=>{

        async function checkLogin(){
        const cookies = Cookies.get()
        if (!cookies.token) {
           setIsAuthenticated(false)
           setLoading(false)
           return setUser(null)
        }
        try {
            const res = await verifyTokenRequest(cookies.token)
            console.log("validacion token res",res)
            if (!res.data){
                setIsAuthenticated(false)
                setLoading(false)
                return
            }
            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
            
        }

        }
        checkLogin()
    },[])

    const logout=()=>{
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }
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
            setUser(res.data)
            setIsAuthenticated(true);
            console.log(res.data)
        } catch (error) {
            setErrosRegister(error.response.data)
            
        }
    }
    // Proveer el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{signin, signup, user, isAuthenticated,errosRegister,loading,logout }}>
            {children}
        </AuthContext.Provider>
    );
};
