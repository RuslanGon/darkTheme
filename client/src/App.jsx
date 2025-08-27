import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Applications from "./pages/Applications/Applications.jsx";
import GetStart from "./components/GetStart/GetStart.jsx";
import MyApp from "./pages/MyApp/MyApp.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-start" element={<GetStart />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/my-app" element={<MyApp />} />

        <Route path="*" element={<Navigate to="/" />} ></Route>
      </Routes>
    </>
  );
}

export default App;
