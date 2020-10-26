import React, { useContext } from "react";
import authContext from "../context/auth/authContext";

export default function Alerta({ mensaje }) {
  const AuthContext = useContext(authContext);
  const { color_alerta } = AuthContext;

  return (
    <>
      {!color_alerta ? (
        <div className='bg-purple-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto uppercase font-bold'>
          {mensaje}
        </div>
      ) : (
        <div
          className={`bg-${color_alerta}-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto uppercase font-bold`}>
          {mensaje}
        </div>
      )}
    </>
  );
}
