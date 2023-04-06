import { useRoutes } from "react-router-dom";
import routes from './routes.js';



function App() {

  const router = useRoutes(routes);
  return (
    <div className="App bg-gray-1">
      {router}
    </div>
  );
}

export default App;
