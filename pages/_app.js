import { AuthProvider, CatalogProvider } from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <AuthProvider>
        <CatalogProvider>
          <Component {...pageProps} />
        </CatalogProvider>
      </AuthProvider>
    </>
  );
}
export default MyApp;
