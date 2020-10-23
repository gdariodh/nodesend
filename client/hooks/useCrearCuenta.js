import { useContext } from "react"; // CUSTOM HOOK PARA EXTRAER CODIGO REPETITIVO DE VALIDACIONES
// librerias
// para leer datos y entregar datos de formularios
import { useFormik } from "formik";
// yup para reglas de validacion
import * as Yup from "yup";
// context
import authContext from "../context/auth/authContext";

export default function useCrearCuenta() {
  // extraemos lo que necesitamos del authContext
  const AuthContext = useContext(authContext);
  // fns o values del context auth
  const { registrarUsuario } = AuthContext;

  // Validacion de formularios con Yup y Formik
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("el nombre es obligatorio"),
      email: Yup.string()
        .email("el email no es valido")
        .required("el email es obligatorio"),
      password: Yup.string()
        .required("el password es obligatorio")
        .min(6, "Debe tener al menos 6 caracteres"),
    }),

    onSubmit: (valores) => {
      // fn del context
      registrarUsuario(valores);
    },
  });
  // extraemos las funciones de formik
  const { handleChange, handleSubmit, handleBlur } = formik;
  // mandamos estos value a useFormularios, donde esta el html de formularios
  return {
    formik,
    handleChange,
    handleSubmit,
    handleBlur,
  };
}
