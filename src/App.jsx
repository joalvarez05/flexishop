import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Footer from "@/components/footer/Footer.jsx";
import Carrito from "@/pages/Carrito.jsx";
function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={null} /> */}
        <Route
          path="/:id"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/carrito" element={<Carrito />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
