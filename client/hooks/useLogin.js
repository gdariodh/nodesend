import { useContext, useEffect } from "react"; // CUSTOM HOOK PARA EXTRAER CODIGO REPETITIVO DE VALIDACIONES
import {useRouter} from 'next/router'
// librerias
// para leer datos y entregar datos de formularios
import { useFormik } from "formik";
// yup para reglas de validacion
import * as Yup from "yup";
// context
import authContext from "../context/auth/authContext";

export default function useLogin() {
  // extraemos lo que necesitamos del authContext
  const AuthContext = useContext(authContext);
  const { iniciarSesion, autenticado } = AuthContext;

  // para redirecciones programadas
  const router = useRouter()

  // revisa si esta autenticado o registrado y lo hace el redirect al login
  useEffect(() => {
    if(autenticado) router.push('/')
 },[autenticado])

  
  // Validacion de formularios con Yup y Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("el email no es valido")
        .required("el email es obligatorio"),
      password: Yup.string().required("el password no puede ir vacio"),
    }),

    onSubmit: (valores) => {
      // fn del authState -> pasamos los valores a la fn para que se reciban en el authState
      iniciarSesion(valores);
    },
  });
  // extraemos las funciones de formik
  const { handleChange, handleSubmit, handleBlur } = formik;

  return {
    formik,
    handleChange,
    handleSubmit,
    handleBlur,
  };
}
