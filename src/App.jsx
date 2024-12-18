import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <div className="w-full h-full fixed overflow-x-hidden text-neutral-300 antialiased bg-[#101010]">
          <div className="container ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor/:roomId" element={<EditorPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
