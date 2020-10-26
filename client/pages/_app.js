// TODO: el app es el padre de todos y es donde se deberian poner los state centralizados.

// TODO: Los states centralizados siempre van asi con Capitalize.
import AuthState from "../context/auth/authState";
import DropzoneState from "../context/dropzone/dropzoneState";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/**Provider del context de Auth */}
      <AuthState value={{}}>
        <DropzoneState>
         {/*Esto se refiere a las paginas estaticas hijos*/}
          <Component {...pageProps} />
        </DropzoneState>
      </AuthState>
    </>
  );
}

export default MyApp;
