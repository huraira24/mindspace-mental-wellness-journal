import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🌿 MindSpace
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/mood">Mood Tracker</Link>
        <Link to="/about">About</Link>
      </div>

    </nav>
  );
}

export default Navbar;