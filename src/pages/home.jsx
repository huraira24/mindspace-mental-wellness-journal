import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    { emoji: "😊", name: "Happy" },
    { emoji: "🙂", name: "Good" },
    { emoji: "😐", name: "Neutral" },
    { emoji: "😔", name: "Sad" },
    { emoji: "😢", name: "Low" },
  ];

  return (
    <main className="home">

      <section className="hero">
        <p className="welcome">
          Welcome to MindSpace 🌿
        </p>

        <h1>
          Take a moment to
          <br />
          check in with yourself.
        </h1>

        <p className="subtitle">
          A safe space to reflect, write, and understand
          your emotions.
        </p>

        <Link to="/journal" className="journal-btn">
          ✍️ Write Today's Journal
        </Link>
      </section>

      <section className="mood-section">

        <h2>How are you feeling today?</h2>

        <div className="moods">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        {selectedMood && (
          <p className="selected-mood">
            You're feeling <strong>{selectedMood}</strong> today 💚
          </p>
        )}

      </section>

    </main>
  );
}

export default Home;