import React, { useState, useCallback } from "react";
// libreria
import { useDropzone } from "react-dropzone";
// cliente para hacer las peticiones
import clienteAxios from "../config/axios";

const Dropzone = () => {
  // el useCallback mejora los renderings que hace cuando se van pasando data por ejemplo en la fn de onDrop!

  // TODO: Mejora el perfomance y trata mejor los rendering de la app

  // fn que lee y sube el archivo, se tiene que pasar al hook de useDropzone, para funcionar, linea 41
  const onDrop = useCallback(async (acceptedFiles) => {
    // acceptedfiles es una fn que lee el archivo que subimos para tratarlo en nuestra fn onDrop
    console.log(acceptedFiles);
    // crear un form data para pasarlo en la res, para que la peticion se pueda recibir el archivo
    const formData = new FormData();
    // append lo usamos para agregar el archivo, ya que FormData es como tipo de objeto.
    // lo va a nombrar como "archivo" tal como lo espera el endpoint
    formData.append("archivo", acceptedFiles[0]);
    // hacemos la respuesta
    try {
      const res = await clienteAxios.post("/api/archivos", formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Extraer contenido para poner funcionalidad del dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop });

  // fn que muestra los archivos soltados en el dropzone
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
      <ul>{archivos}</ul>

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
                className='bg-gray-700 w-full py-4 rounded-lg text-white my-10 hover:bg-gray-800  font-semibold'
                type='button'>
                Selecciona archivos para subir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
