import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
