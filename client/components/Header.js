import React,{useContext, useEffect} from 'react';
import authContext from '../context/auth/authContext'
import Link from "next/link";

export default function Header() {

  // extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext)
  const {usuario, usuarioAutenticado,cerrarSesion} = AuthContext

  // respaldo si el usuario recarga la pagina y no estaba en index "/", vuelve a ejecutar la fn para revisar si hay token
  // y si es asi lo devuelve, lo mismo que en index.js de pages
  useEffect(() => {
    usuarioAutenticado()
  },[])

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img className='w-64 mb-8 md:mb-0 cursor-pointer' src='/logo.svg' />
      </Link>

      <div>

      {
        usuario ? 
        (
          <> 
          <div className='flex items-center'>
          <p
           className='mr-4 font-semibold'
           >Hola! {usuario.nombre} :)</p>
           <button 
           className='bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5  rounded-lg shadow uppercase'
           type="button"
           onClick={() => cerrarSesion()}
           >
              Cerrar sesion
           </button>
          </div>
           
          </>
        )
        : (
          <>
          <Link href='/login'>
          <a className='bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5  rounded-lg shadow uppercase'>
            Iniciar sesion
          </a>
        </Link>
        <Link href='/crear-cuenta'>
          <a className='bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-5 ml-3 rounded-lg shadow uppercase'>
            Crear cuenta
          </a>
        </Link>
        </>
        )
      }

        
      </div>
    </header>
  );
}
