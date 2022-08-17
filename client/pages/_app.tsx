import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { DataGridProvider } from "../context/DataGridContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataGridProvider>
      <Component {...pageProps} />
    </DataGridProvider>
  );
}

export default MyApp;
