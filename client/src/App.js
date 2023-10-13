import "./App.css";
import { router } from "./Routes/Router/Routes";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <div className="max-w-full mx-auto">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
