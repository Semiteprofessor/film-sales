import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contextApi/AuthContext";
import { PopProvider } from "./contextApi/PopContext";
import Login from "./authorization/Login";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Signup from "./authorization/Signup";
function App() {
  return (
    <AuthProvider>
      <PopProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PopProvider>
    </AuthProvider>
  );
}

export default App;
