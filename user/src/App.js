import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Registration"} element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
