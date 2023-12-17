import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import SingleResume from "./pages/SingleResume";
import UpdateResume from "./pages/UpdateResume";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create/resume" element={<Resume />} />
          <Route path="/resume/:id" element={<SingleResume />} />
          <Route path="/update/:id" element={<UpdateResume />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
