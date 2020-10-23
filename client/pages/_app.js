// Provider -> Context
import AuthState from "../context/auth/authState";

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      {/**Provider del context de Auth */}
      <AuthState
      value={{}}
      >
        <Component {...pageProps} />
      </AuthState>
    </>
  );
}

export default MyApp;
