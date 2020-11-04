import React, { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";
import dropzoneContext from "../context/dropzone/dropzoneContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  // extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;
  // invocamos la fn de useRouter para redireccionar en la funcion de handleRedirect
  const router = useRouter()
  // context del dropzone
  const DropzoneContext = useContext(dropzoneContext);
  const { limpiarState } = DropzoneContext;

  /* TODO: respaldo si el usuario recarga la pagina y no estaba en index "/", vuelve a ejecutar la fn para revisar si hay token
   y si es asi lo devuelve, lo mismo que en index.js de pages*/
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  // redirecciona al "/" y limpia el state
  const handleRedirect = () => {
    router.push("/")
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      {/**contiene la fn de redirect en su onClick y tambien limpia el state */}
      <img
        onClick={() => handleRedirect()}
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
      />

      <div>
        {usuario ? (
          <>
            <div className="flex items-center">
              <p className="mr-4 font-semibold">Hola! {usuario.nombre} :)</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5  rounded-lg shadow uppercase"
                type="button"
                onClick={() => cerrarSesion()}
              >
                Cerrar sesion
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5  rounded-lg shadow uppercase">
                Iniciar sesion
              </a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-5 ml-3 rounded-lg shadow uppercase">
                Crear cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
