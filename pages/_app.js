import { AppProps } from "next/app";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";
import { MantineProvider } from "@mantine/core";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <Head>
        <title>Fizikas konsultācijas</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </AuthProvider>
  );
}
