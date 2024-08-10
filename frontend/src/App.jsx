import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Send from "./components/Send";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
