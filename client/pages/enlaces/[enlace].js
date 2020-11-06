// TODO: [enlace].js es la forma que se trabaja en next para hacer un routing dinamico, siempre debe ir en esa nomenclatura.
// TODO: [enlace] es la variable dinamica que recibe la url
// Los console.log se mostraran la consola de next, los unico clg que se muestran en el navegador son los del template.
// TODO: MAS INFORMACION sobre el routing dinamico TODO: https://nextjs.org/docs/basic-features/data-fetching

import React, { useState } from "react";
import clienteAxios from "../../config/axios";
// component
import Layout from "../../components/Layout";
import Alerta from "../../components/Alerta";
// TODO: Vamos hacer el routing dinamico con data fetching que es para que cargue mas rapido, el de phunt lo hicimos con dynamic routes

// TODO: fn que retornara las props que se utilizara el componente template "Enlace"
// TODO: las props que recibe, son los parametros que retorna getServerSidePaths.
// En este caso las props que retorna getServerSidePaths es "params"
export async function getServerSideProps({ params }) {
  // extraemos enlace que es el url que contiene el archivo que queremos compartir
  const { enlace } = params;
  // ponemos enlace en la request que obtiene un archivo en base a la url
  const resultado = await clienteAxios(`/api/enlaces/${enlace}`);
  // TODO: luego pasamos los props que estaran disponible en el template de Enlace
  return {
    props: {
      enlace: resultado.data,
    },
  };
}

// TODO: genera el routing dinamico o las url dinamicas en este caso
export async function getServerSidePaths() {
  // obtenemos todos los enlaces para el routing dinamico
  const enlaces = await clienteAxios("/api/enlaces");
  //console.log(enlaces.data);

  // retornamos los parametros que seran consumidos
  return {
    //TODO: hay dos parametros que van obligatorios que es paths y fallback
    // paths siempre va como una arreglo
    paths: enlaces.data.enlaces.map((enlace) => ({
      //TODO: ponemos en los params "enlace" de [enlace] que es la variable dinamica
      params: { enlace: enlace.url },
    })),
    // si el fallback esta comoo false, si la url no es valida, muestra la pagina 404!
    fallback: false,
  };
}

// TODO: los props que recibe el template Enlace provienen de getServerSideProps

// template que consume las props de getServerSideProps
// Template "Enlace"
const Enlace = ({ enlace }) => {
  //TODO: enlace es la url del archivo a compartir
  //console.log(enlace);

  // useState para controlar la interfaz de pedir password del enlace, por defecto viene True, si es hay un password
  const [pedir_password, setPedirPassword] = useState(enlace.password);

  // useState para encapsular la response cuando verificado el password
  const [password, setPassword] = useState("");
  const [password_error, setPasswordError] = useState(null);

  // verifica el password -> TODO: se usa cuando el que crea el enlace le asigna un password, si no, no aparece  en la interfaz.
  const verificarPassword = async (e) => {
    console.log(enlace);
    e.preventDefault();
    // TODO:  password viene del useState

    // lo ponemos asi porque asi recibe el req en el endpoint .post /api/enlace/:url, si no se pone asi, no retorna
    const data = {
      password,
    };

    try {
      // TODO: el parametro es el ${enlace.enlace} que es el /:url, y data es el password que se pasa por el body
      const res = await clienteAxios.post(`/api/enlaces/${enlace.url}`, data);
      //console.log(res);
      // si es correcto, el pedir_password pasara a false y se mostrara la otra interfaz
      setPedirPassword(res.data.password);
    } catch (error) {
      setPasswordError(error.response.data.msg);
      setTimeout(() => {
        setPasswordError(null);
      }, 2500);
    }
  };

  //TODO: si el enlace no tiene password, va a mostrar la interfaz para descargar el archivo, pero si tiene, pide password!

  return (
    <Layout>
      {/** Si el usuario se equivoca de password */}
      {password_error && <Alerta mensaje={password_error} />}

      {/** Si el enlace tiene password, mostrar interfaz que pide password, sino muestra la otra que descarga el archivo */}
      {pedir_password ? (
        <>
          {/** Formulario reutilizado de useFormulario */}
          <div>
            <p className="text-center font-semibold">
              Este enlace esta protegido por un password, ingresa el password:
            </p>

            <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                <form
                  onSubmit={(e) => verificarPassword(e)}
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-black text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="password del enlace"
                      id="password"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    className="bg-red-500 hover:bg-gray-900 w-full p-3 border rounded text-white uppercase font-bold"
                    value="validar password"
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            {/** TODO: ANTES -> redireccionamos a la carpeta del backend, ver index.js de server para entender,
      En pocas palabras, habilitamos la carpeta donde se guardan los archivos subidos. 
      antes estaba como {`${process.env.backendURL}/${enlace.archivo}`} que nada mas nos mostraba el archivo
       */}
            {/**TODO: AHORA -> ya tenemos habilitada la carpeta, y creamos un controlador que nos permite descargar archivos. 
       Y cambiamos el href, ahora estaremos conectado con el controlador que creamos.
        */}
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
              download
            >
              Aqui
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Enlace;
