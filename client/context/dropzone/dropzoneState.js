import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import dropzoneReducer from "./dropzoneReducer";
import dropzoneContext from "./dropzoneContext";
import {
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
} from "../../types";

const DropzoneState = ({ children }) => {
  const initialState = {
    msg_archivo: null,
    nombre: "",
    nombre_hash: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(dropzoneReducer, initialState);

  // TODO:    FUNCTIONS

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 2500);
  };

  // TODO: Subida de archivos con Dropzone al servidor -> se manda a Dropzone.js

  const subirArchivo = async (formData, nombre_archivo_original) => {
    // mientras se sube, spinner
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const res = await clienteAxios.post("/api/archivos", formData);
      console.log(res.data);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: res.data.archivo,
          nombre_original: nombre_archivo_original,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // fn onClick que crea el enlace del archivo para luego compartirlo
  const crearEnlace = async () => {
    const data = {
      nombre_original: state.nombre,
      nombre: state.nombre_hash,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
      const res = await clienteAxios.post("/api/enlaces", data);
      //console.log(res.data.msg)
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: res.data.msg,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREAR_ENLACE_ERROR,
        payload: error.response.data.msg
      })
    }
  };

  //TODO: limpia todo el state, se manda y se ejecuta en Header en el logo, cuando quieran hacer redirect al "/"
  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  return (
    <dropzoneContext.Provider
      value={{
        msg_archivo: state.msg_archivo,
        nombre: state.nombre,
        nombre_hash: state.nombre_hash,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
      }}
    >
      {children}
    </dropzoneContext.Provider>
  );
};

export default DropzoneState;
