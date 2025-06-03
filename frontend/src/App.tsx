import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormulaSheet from "./pages/FormulaSheet";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interactive-formula" element={<FormulaSheet />} />
      </Routes>
    </BrowserRouter>
  );
}
