import React, { useContext } from "react";
// Components
import Layout from "../components/Layout";
import Alerta from "../components/Alerta";
// Custom Hook - que extrae el codigo repetitivo de los formularios
import useFormularios from "../hooks/useFormularios";
//  Contexts
import authContext from "../context/auth/authContext";

export default function crearCuenta() {
  // custom hook -> extrae codigo html que repetimos en login, y esta toda la logica y el otro hook useCrearCuenta y useLogin
  const { Formulario } = useFormularios("registro");
  // extraemos lo que necesitamos del authContext
  const AuthContext = useContext(authContext);
  // fns o values del context auth
  const { mensaje } = AuthContext;

  return (
    <Layout>
      <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-black text-center'>
          Crear cuenta
        </h2>
        {mensaje && <Alerta mensaje={mensaje} />}
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>{Formulario()}</div>
        </div>
      </div>
    </Layout>
  );
}
