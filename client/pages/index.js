import Layout from "../components/Layout";
import React,{useContext, useEffect} from 'react';
import authContext from '../context/auth/authContext'

export default function Home() {

  // extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext)
  const {usuarioAutenticado} = AuthContext

  useEffect(() => {
    // fn que revisa si hay un token en el localStorage - se ejecuta apenas carga la app
    usuarioAutenticado()
  },[])

  return (
    <>
      <Layout>
        <h1>Esto es el index</h1>
        
      </Layout>
    </>
  );
}
