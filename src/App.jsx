import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Footer from "@/components/footer/Footer.jsx";
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
      <Footer />
    </>
  );
}

export default App;
