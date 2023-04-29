import { useRoutes, useLocation, ScrollRestoration } from "react-router-dom";
import routes from './routes.js';
// Components 
import Header from "./layout/Header/Header.js";
import Footer from "./layout/Footer/Footer.js";
import ScrollToTop from "./components/ScrollToTop.js";

function App() {
  const router = useRoutes(routes);
  const location = useLocation();

  return (
    <div className="App bg-gray-100 text-sm font-yekan">
      <ScrollToTop />
      {!location.pathname.includes('/panel') && (
        <>
          <Header />
        </>
      )}
      {router}
      {!location.pathname.includes('/panel') && (
        <>
          <Footer />
        </>
      )}

    </div>
  );
}

export default App;
