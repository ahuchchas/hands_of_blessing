import "./App.css";
import AuthProvider from "./Provider/AuthProvider";
import { router } from "./Routes/Router/Routes";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <div className="max-w-full mx-auto">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
