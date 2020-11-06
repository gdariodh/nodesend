// Son las funciones que ejecutan las funciones que tenemos en el reducer. o las funciones que engloban la app
import React, { useReducer } from "react";
import { useRouter } from "next/router";
// context
import authContext from "./authContext";
// reducer - modifica o altera el state
import authReducer from "./authReducer";
// types - describen las acciones que van pasando en la app
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  REGISTRO_REDIRECCION,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../../types";
// axios configurado -> para usar variables de env - TODO: RECUERDA TENER EL CORS HABILITADO! en el backend de node
import clienteAxios from "../../config/axios";
// fn que envia el token en los headers del clienteAxios
import tokenAuth from "../../config/tokenAuth";

export default function AuthState({ children }) {
  // TODO: para hacer redirecciones programadas
  const router = useRouter();
  // definir state inicial -> se va modificando con el authReducer
  const initialState = {
    // asi se hace en next la obtencion del localStorage
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
    color_alerta: null,
  };
  // definir reducer -> useReducer(reducer,initialState)
  const [state, dispatch] = useReducer(authReducer, initialState);
  /* 
   - payload -> datos que modificaran al state 
   - dispath -> fn que se encarga de manejar los envios sobre las modificaciones del state, que se haran luego en el reducer, 
   y tambien es que quien mandar a llamar los diferentes cases que estan en el reducer, por eso los types deben ser iguales */

  // fns app

  // -> se manda a useCrearCuenta, que el tiene la validaciones de formulario con formik
  const registrarUsuario = async (datos) => {
    try {
      // los datos se van a mandar a req.body
      const response = await clienteAxios.post("/api/usuarios", datos);
      const alerta = {
        msg: response.data.msg,
        color: "green",
      };
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: alerta,
      });

      //TODO: crea el token
     try {
      const response = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: REGISTRO_REDIRECCION,
        payload: response.data.token,
      });
     } catch (error) {
       console.log(error)
     }

      // TODO: redireccionar al inicio 
      setTimeout(() => {
        router.push("/");
      }, 1750);
    } catch (error) {
      // asi se leen los msg de error
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        color: "purple",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
    // limpia la alerta despues de 3sg
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // -> se manda a useLogin
  const iniciarSesion = async (datos) => {
    try {
      const response = await clienteAxios.post("/api/auth", datos);
      // pasamos el token para los roles de usuario
      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data.token,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        color: "purple",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // fn que revisa si hay un token en el LocalStorage, y si es asi retorna el usuario en base al jwt, se ejecuta apenas inicia la app
  // se manda al index.js de pages
  const usuarioAutenticado = async () => {
    // obtenemos el token guardado en el storage
    const token = localStorage.getItem("token");
    // luego mandamos el token a la fn que inyecta al clienteAxios
    if (token) {
      // fn que inyecta el token los headers del clienteAxios
      tokenAuth(token);

      /* a partir de aca ya el token esta inyectado en los headers del clienteAxios, ahora toca hacer la peticion
    para extraer el usuario que tiene la sesion o el jwt
    */
      try {
        // obtenemos el usuario
        const res = await clienteAxios("/api/auth");
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: res.data.usuario,
        });
      } catch (error) {
        const alerta = {
          msg: error.response.data.msg,
          color: "purple",
        };
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta,
        });
      }
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  // lo que estara disponible en los componentes hijos
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        color_alerta: state.color_alerta,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

/*
 Provider - El que proporciona los valores a los componentes hijos.
 Consumer - Los hijos que lo consumen.
 TODO:
 en create-react-app este se plasma en el fichero app.js para que el context este disponible en toda la app, 
 pero en nextjs se plasma en pages/_app.js, porque _app.js es el fichero principal de nextjs.
*/
