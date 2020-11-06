import React, { useState, useContext } from "react";
import dropzoneContext from "../context/dropzone/dropzoneContext";

// TODO: componente del selector de descargas.

// TODO: el componente de formulario de inicio y registro de usuarios esta en useFormulario.

const Formulario = () => {
  const [tienePassword, setTienePassword] = useState(false);

  // TODO:  context del dropzone
  const DropzoneContext = useContext(dropzoneContext);
  // lee el password que escribe el usuario
  const { agregarPassword, agregarDescargas, descargas } = DropzoneContext;

  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        {/** TODO: recordar que parseInt convierte un string a un numero, lo hicimos pq las descargas son numbers */}
        <select
          onChange={(e) => agregarDescargas(parseInt(e.target.value))}
          value={descargas}
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-center text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
        >
          <option value='' selected disabled>
            --Seleccione--
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Proteger con contraseña:
          </label>

          {/**TODO: esta fn de onChage lo que hace es si esta true "tienePassword" lo pone false y TODO: viceversa */}
          <input
            onChange={() => setTienePassword(!tienePassword)}
            type="checkbox"
          />
        </div>
        {tienePassword && (
          <>
            {/**TODO: agregarPassword proviene del context de dropzone */}
            <input
              onChange={(e) => agregarPassword(e.target.value)}
              type="password"
              className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-2 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Formulario;
