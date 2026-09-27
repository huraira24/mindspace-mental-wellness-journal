function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <div className="about-icon">🌿</div>

        <h1>About MindSpace</h1>

        <p>
          A calm digital space to pause, reflect, and
          understand yourself a little better.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>🌱 Our Purpose</h2>

          <p>
            MindSpace was created to encourage mindful
            reflection and emotional awareness through
            simple journaling and mood tracking.
          </p>

          <p>
            It provides a private space where you can
            record your thoughts, keep track of your
            moods, and receive gentle AI-powered
            reflections on your journal entries.
          </p>
        </div>

        <div className="about-card">
          <h2>✨ What You Can Do</h2>

          <div className="feature-list">

            <div className="feature-item">
              <span>📝</span>
              <div>
                <h3>Journal</h3>
                <p>
                  Write down your thoughts and
                  reflections in your personal journal.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span>😊</span>
              <div>
                <h3>Track Your Mood</h3>
                <p>
                  Record how you're feeling and
                  observe your mood patterns over time.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span>🤖</span>
              <div>
                <h3>AI Journal Insights</h3>
                <p>
                  Get supportive reflections and
                  simple wellness suggestions from AI.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span>🔐</span>
              <div>
                <h3>Private & Personal</h3>
                <p>
                  Your journal and mood data are
                  associated with your own account.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="about-card">

          <h2>🛠️ Built With</h2>

          <div className="tech-stack">

            <span>React</span>
            <span>JavaScript</span>
            <span>Firebase</span>
            <span>Firestore</span>
            <span>Express.js</span>
            <span>Gemini AI</span>
            <span>Recharts</span>
            <span>CSS</span>

          </div>

        </div>

      </section>

      <section className="about-note">

        <h2>A little space can make a difference. 🌿</h2>

        <p>
          Take a breath. Write something down.
          Check in with yourself.
        </p>

      </section>

    </main>
  );
}

export default About;