import clienteAxios from "./axios"

// fn que le inyecta el token en los headers del clienteAxios, TODO: Si es que hay un token!
const tokenAuth = (token) => {
 if(token){
     // asi se le pasa el token por los headers
   clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 }else{
    // si hay nadie con sesion o limpio el token del localStorage manualmente o no hay token
    // limpiamos el headers del clienteAxios
    delete clienteAxios.defaults.headers.common['Authorization']
 }
}

export default tokenAuth;