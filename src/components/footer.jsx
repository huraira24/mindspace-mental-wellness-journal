import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>🌿 MindSpace</h2>

          <p>
            A simple space to reflect, track your mood,
            and understand yourself better.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/mood">Mood Tracker</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <a href="mailto:your-email@example.com">
            📧 huraira.rahemeen.27@gmail.com
          </a>

          <a
            href="https://github.com/huraira24"
            target="_blank"
            rel="noreferrer"
          >
            💻 GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/huraira-rahemeen-9451a8332"
            target="_blank"
            rel="noreferrer"
          >
            🔗 LinkedIn
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 MindSpace. Built with React 🌿
        </p>
      </div>

    </footer>
  );
}

export default Footer;