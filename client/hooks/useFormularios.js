import React from "react";
// CUSTOM HOOK DE VALIDACIONES - Que creamos - con el fin de extraer el codigo repetido
import useCrearCuenta from "../hooks/useCrearCuenta";
import useLogin from "../hooks/useLogin";

export default function useFormularios(registro) {
  /* extrameos la fns y formik para usuarlos -> cuando pasamos el valor de registro indica que el usuario cargo el componente crear-cuenta*/
  const { handleChange, handleSubmit, handleBlur, formik } = registro ? useCrearCuenta() : useLogin();

  // extraemos los valores de formik
  const { nombre, password, email } = formik.values;

  const Formulario = () => (
    <>
      <form
        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}>
        {registro === "registro" && (
          <div className='mb-4'>
            <label
              className='block text-black text-sm font-bold mb-2'
              htmlFor='nombre'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='nombre de usuario'
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              id='nombre'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-gray-900 p-4'>
                <p className='font-bold'>Error</p>
                <span>{formik.errors.nombre}</span>
              </div>
            )}
          </div>
        )}

        <div className='mb-4'>
          <label
            className='block text-black text-sm font-bold mb-2'
            htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            placeholder='ejemplo@email.com'
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            id='email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-gray-900 p-4'>
              <p className='font-bold'>Error</p>
              <span>{formik.errors.email}</span>
            </div>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='block text-black text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            placeholder='123456'
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            id='password'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {formik.touched.password && formik.errors.password && (
            <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-gray-900 p-4'>
              <p className='font-bold'>Error</p>
              <span>{formik.errors.password}</span>
            </div>
          )}
        </div>
        <input
          type='submit'
          className='bg-red-500 hover:bg-gray-900 w-full p-3 border rounded text-white uppercase font-bold'
          value={registro ? "crear cuenta" : "iniciar sesion"}
        />
      </form>
    </>
  );

  return {
    Formulario,
  };
}
