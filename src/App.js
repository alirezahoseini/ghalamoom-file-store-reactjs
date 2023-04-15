import { useRoutes, useLocation } from "react-router-dom";
import routes  from './routes.js';

// Components 
import Header from "./layout/Header/Header.js";
import Footer from "./layout/Footer/Footer.js";

function App() {
  const router = useRoutes(routes);
  const location = useLocation();

  return (
    <div className="App bg-gray-1 text-sm font-yekan">
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
