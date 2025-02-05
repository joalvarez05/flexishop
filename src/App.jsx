import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
