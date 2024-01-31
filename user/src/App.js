import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Registration"} element={<Registration />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Profile"} element={<Profile/>}/>
        <Route path={"/Cart"} element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
