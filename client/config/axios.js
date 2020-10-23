import axios from 'axios'
// las variables de entorno estan en next.config.js - asi se tienen que crear las var de env
const clienteAxios = axios.create({
    baseURL:process.env.backendURL
});

export default clienteAxios;