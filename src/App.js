import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
