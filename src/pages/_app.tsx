import type { AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default api.withTRPC(App);
