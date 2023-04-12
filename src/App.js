import { useRoutes } from "react-router-dom";
import routes from './routes.js';

// Components 
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";


function App() {

  const router = useRoutes(routes);
  return (
    <div className="App bg-gray-1 text-sm font-yekan">
      <Header />
      {router}
      <Footer />
    </div>
  );
}

export default App;
