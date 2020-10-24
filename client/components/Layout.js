import React from "react";
import Head from "next/head";
// Components
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>ReactNodeSend</title>
        <link
          href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossOrigin='anonymous'
        />
      </Head>

      <div className='bg-gray-400 bg-opacity-25 min-h-screen'>
        <div className='container mx-auto'>
          <Header />

          <main className='mt-20'>{children}</main>
        </div>
      </div>
    </>
  );
}
