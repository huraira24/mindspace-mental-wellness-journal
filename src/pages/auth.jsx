import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import app from "../firebase";

const auth = getAuth(app);

function Auth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        setMessage("Account created successfully! 🌱");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("You have been logged out successfully. 🌿");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Show logout screen if user is already logged in
  if (user) {
    return (
      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">
            🌿
          </div>

          <h1>You're Logged In</h1>

          <p className="auth-subtitle">
            You are currently signed in to MindSpace.
          </p>

          <button
            type="button"
            className="auth-submit"
            onClick={handleLogout}
          >
            Logout
          </button>

          <button
            type="button"
            className="switch-auth"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          🌿
        </div>

        <h1>
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h1>

        <p className="auth-subtitle">
          {isLogin
            ? "Login to continue your MindSpace journey."
            : "Create an account and begin your MindSpace journey."}
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <p className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          type="button"
          className="switch-auth"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
        >
          {isLogin
            ? "Create an Account"
            : "Login Instead"}
        </button>

      </div>
    </main>
  );
}

export default Auth;