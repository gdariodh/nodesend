import React, { useReducer } from "react";
import {
  LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types";
import dropzoneReducer from "./dropzoneReducer";
import dropzoneContext from "./dropzoneContext";

const DropzoneState = ({ children }) => {
  const initialState = {
      msg_archivo:null
  };

  const [state, dispatch] = useReducer(dropzoneReducer, initialState);

  // TODO:    FUNCTIONS

  const mostrarAlerta = (msg) => {
      console.log('nono')
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg
    });
    setTimeout(() => {
      dispatch({
          type: LIMPIAR_ALERTA
      })
    },2500)
  };

  return (
    <dropzoneContext.Provider
      value={{
        msg_archivo: state.msg_archivo,
        mostrarAlerta,
      }}>
      {children}
    </dropzoneContext.Provider>
  );
};

export default DropzoneState;
