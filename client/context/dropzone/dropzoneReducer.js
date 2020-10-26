import {
    LIMPIAR_ALERTA,
  MOSTRAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from '../../types';

const dropzoneReducer = (state,action) => {
    switch(action.type){
      
      case MOSTRAR_ALERTA:
          return{
              ...state,
              msg_archivo: action.payload
          }

          case LIMPIAR_ALERTA:
              return{
                  ...state,
                  msg_archivo: null
              }

        default:
            return state;
    }
}

export default dropzoneReducer;