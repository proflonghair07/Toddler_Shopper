import React from "react";
import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
