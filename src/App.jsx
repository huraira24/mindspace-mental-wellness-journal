import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home";
import Journal from "./pages/journal.jsx";
import MoodTracker from "./pages/moodtracker";
import About from "./pages/about";
import Auth from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <Routes>

          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected pages */}
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <MoodTracker />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;