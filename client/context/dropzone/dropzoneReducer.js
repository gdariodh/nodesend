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

const dropzoneReducer = (state, action) => {
  switch (action.type) {
    case SUBIR_ARCHIVO_ERROR:
    case MOSTRAR_ALERTA:
    case CREAR_ENLACE_ERROR:
      return {
        ...state,
        msg_archivo: action.payload,
        cargando: null,
      };

    case LIMPIAR_ALERTA:
      return {
        ...state,
        msg_archivo: null,
      };

    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre_hash: action.payload.nombre,
        nombre: action.payload.nombre_original,
        cargando: null,
      };

    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };

    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };

    case LIMPIAR_STATE:
      return {
        ...state,
        msg_archivo:null,
        nombre:null,
        nombre_hash:null,
        cargando:null,
        descargas:null,
        password:null,
        autor:null,
        url:null,
      };

    default:
      return state;
  }
};

export default dropzoneReducer;
