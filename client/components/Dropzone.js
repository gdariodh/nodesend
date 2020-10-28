// TODO:  useCallback mejora los renderings que hace cuando se van pasando data por ejemplo en la fn de onDrop!
import React, { useState, useCallback, useContext } from "react";
// libreria
import { useDropzone } from "react-dropzone";
// cliente para hacer las peticiones
import clienteAxios from "../config/axios";
// context
import dropzoneContext from "../context/dropzone/dropzoneContext";

const Dropzone = () => {
  const DropzoneContext = useContext(dropzoneContext);
  const { mostrarAlerta, subirArchivo, crearEnlace, cargando } = DropzoneContext;

  // fn que lee y sube el archivo, se tiene que pasar al hook de useDropzone, para funcionar, linea 41
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // acceptedfiles es una fn que lee el archivo que subimos para tratarlo en nuestra fn onDrop
    // TODO: crear un form data para pasarlo en la res, para que la peticion se pueda recibir el archivo
    const formData = new FormData();
    // append lo usamos para agregar el archivo, ya que FormData es como tipo de objeto.
    // lo va a nombrar como "archivo" tal como lo espera el endpoint
    formData.append("archivo", acceptedFiles[0]);
    // TODO: fn del dropzoneState
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  // fn que si que se ejecuta cuando el archivo fue rechazado, ya sea por formato o por que excede el limite!
  const onDropRejected = () => {
    mostrarAlerta(
      "El archivo pesa mas de 1MB, crea una cuenta y sube tu archivo hasta 10MB"
    );
  };

  // Extraer contenido para poner funcionalidad del dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  // fn que muestra el listado de los archivos soltados en el dropzone -> componente condicional
  const archivos = acceptedFiles.map((archivo, i) => {
    console.log(archivo);
    return (
      <li
        key={`${archivo.lastModified}-${i}`}
        className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
        <p className='font-bold text-xl'>{archivo.path}</p>
        {/**Fn que calcula de kbs a MB */}
        <p className='text-sm text-gray-500 mt-2'>
          {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
        </p>
      </li>
    );
  });

  return (
    <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
      {/**TODO: Condicion que muestra el resumen de lo que subes si hay un archivo subido, pero si no hay muestra el dropzone */}
      {acceptedFiles.length > 0 ? (
        <>
          {/** return de la fn que lista los archivos*/}
          <div className='mt-10 w-full'>
            <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
            <ul>{archivos}</ul>
            {cargando ? (
              <p className='my-10 text-center text-gray-700 font-semibold'>Subiendo archivo...</p>
            ) : (
              <button
                type='button'
                className='bg-blue-700 w-full py-4 rounded-lg text-white my-10 hover:bg-blue-600  font-semibold'
                onClick={() => crearEnlace()}>
                Crear enlace
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/** Return del Dropzone */}
          <div {...getRootProps({ className: "dropzone w-full py-32" })}>
            <input className='h-100' {...getInputProps()} />
            <div className='text-center p-3'>
              {isDragActive ? (
                <p className='text-2xl text-gray-600 font-semibold'>
                  Suelta el archivo
                </p>
              ) : (
                <>
                  <p className='text-2xl text-gray-600 font-semibold'>
                    Selecciona un archivo y arrastralo aqui
                  </p>
                  <button
                    className='bg-blue-700 w-full py-4 rounded-lg text-white my-10 hover:bg-blue-600  font-semibold'
                    type='button'>
                    Selecciona archivos para subir
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropzone;
