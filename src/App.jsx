import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import Home from "@/pages/Home";
import Footer from "@/components/footer/Footer.jsx";
// import { useEffect } from "react";
function App() {
  // useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     window.location.href = "https://www.uhmo.com.ar";
  //   }
  // }, []);
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
