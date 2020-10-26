// Son las funciones "Dispatch" que alteran o modificar el state

/* types - describen las acciones que van pasando en la app - va tambien el authState, 
y asi se conecta el state del context y el reducer del context*/
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload.msg,
        color_alerta: action.payload.color,
      };

      case LOGIN_EXITOSO:
        localStorage.setItem('token', action.payload)
        return{
          ...state,
          token: action.payload,
          autenticado: true
        }

        case USUARIO_AUTENTICADO:
          return{
            ...state,
            usuario: action.payload,
            autenticado:true
          }

          case CERRAR_SESION:
            localStorage.removeItem('token')
            return{
              ...state,
              usuario:null,
              autenticado:null,
              token:null
            }

    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };

    default:
      return state;
  }
}

export default authReducer;