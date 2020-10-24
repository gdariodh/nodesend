import Layout from "../components/Layout";
import React, { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";
import Link from "next/link";
// component
import Dropzone from "../components/Dropzone";

export default function Home() {
  // extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    // fn que revisa si hay un token en el localStorage - se ejecuta apenas carga la app
    usuarioAutenticado();
  }, []);

  return (
    <>
      <Layout>
        <div className='md:w-4/5 xl:3/5 mx-auto mb-32'>
          <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
            <Dropzone />

            <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
              <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                Compartir archivos de forma sencilla y privada
              </h2>
              <p className='text-lg leading-loose'>
                <span className='text-red-500 font-bold'>ReactNodeSend</span> te
                permite compartir archivos con cifrado extremo a extremo y un
                archivo que es elimando despues de ser descargado. Asi que
                puedes mantener lo que compartes en privado y asegurarte de que
                tus cosas no permanezcan en linea para siempre.
              </p>
              <Link href='/crear-cuenta'>
                <a className='text-red-500 font-bold text-lg hover:text-red-400'>
                  Crea una cuenta para mayores beneficios!
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
