import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App__main">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
