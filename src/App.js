import { useRoutes } from "react-router-dom";
function App() {
  const router = useRoutes();
  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;
