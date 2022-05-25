import "../styles/globals.css";
import type { AppProps } from "next/app";
import Providers from "../providers";

const App = ({ Component, pageProps }: AppProps) => (
  <Providers>
    <Component {...pageProps} />
  </Providers>
);

export default App;
