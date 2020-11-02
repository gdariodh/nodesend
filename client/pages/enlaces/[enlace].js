import React from 'react';
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'


// fn que recibe las props para poder funcionar el routing
export async function getStaticProps(){

}

// el encargado de generar las paginas estaticas con el template o routing dinamico
export async function getStaticPaths(){ 
 
}

const Enlace = () => {
    return ( 
        <Layout>
            <h1>Desde [enlace].js</h1>
        </Layout>
     );
}
 
export default Enlace;