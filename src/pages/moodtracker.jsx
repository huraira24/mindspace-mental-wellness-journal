import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from "firebase/firestore";

import app, { db } from "../firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MoodTracker() {

  const [selectedMood, setSelectedMood] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  const moods = [
    { emoji: "😊", name: "Happy", value: 5 },
    { emoji: "🙂", name: "Good", value: 4 },
    { emoji: "😐", name: "Neutral", value: 3 },
    { emoji: "😔", name: "Sad", value: 2 },
    { emoji: "😢", name: "Low", value: 1 }
  ];

  /* =========================
     LOAD MOOD HISTORY
  ========================= */

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {

        if (!user) {
          setMoodHistory([]);
          setLoading(false);
          return;
        }

        try {

          const q = query(
            collection(db, "moodHistory"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );

          const snapshot = await getDocs(q);

          const moods = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

          setMoodHistory(moods);

        } catch (error) {

          console.error(
            "Error loading mood history:",
            error
          );

        } finally {

          setLoading(false);

        }
      }
    );

    return () => unsubscribe();

  }, []);

  /* =========================
     SAVE MOOD
  ========================= */

  const saveMood = async (mood) => {

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {

      const newMood = {
        mood: mood.name,
        emoji: mood.emoji,
        value: mood.value,
        userId: user.uid,
        createdAt: new Date()
      };

      const docRef = await addDoc(
        collection(db, "moodHistory"),
        newMood
      );

      setMoodHistory([
        {
          id: docRef.id,
          ...newMood
        },
        ...moodHistory
      ]);

      setSelectedMood(mood.name);

    } catch (error) {

      console.error(
        "Error saving mood:",
        error
      );

    }
  };

  /* =========================
     DELETE MOOD
  ========================= */

  const deleteMood = async (id) => {

    try {

      await deleteDoc(
        doc(db, "moodHistory", id)
      );

      setMoodHistory(
        moodHistory.filter(
          (mood) => mood.id !== id
        )
      );

    } catch (error) {

      console.error(
        "Error deleting mood:",
        error
      );

    }
  };

  /* =========================
     CHART DATA
  ========================= */

  const chartData = [...moodHistory]
    .reverse()
    .map((item) => ({
      date: item.createdAt?.toDate
        ? item.createdAt.toDate().toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "short"
            }
          )
        : "",
      mood: item.value
    }));

  return (

    <main className="mood-page">

      <h1>Mood Tracker 😊</h1>

      <p>
        Take a moment to check in with yourself.
      </p>

      {/* =========================
          MOOD SELECTION
      ========================= */}

      <section className="mood-selector">

        <h2>How are you feeling today?</h2>

        <div className="mood-options">

          {moods.map((mood) => (

            <button
              key={mood.name}
              type="button"
              className={
                selectedMood === mood.name
                  ? "selected-mood"
                  : ""
              }
              onClick={() => saveMood(mood)}
            >

              <span className="mood-emoji">
                {mood.emoji}
              </span>

              <span>
                {mood.name}
              </span>

            </button>

          ))}

        </div>

        {selectedMood && (

          <p className="mood-message">
            You're feeling{" "}
            <strong>{selectedMood}</strong>{" "}
            today 🌿
          </p>

        )}

      </section>

      {/* =========================
          MOOD CHART
      ========================= */}

      {!loading && moodHistory.length > 0 && (

        <section className="mood-chart">

          <h2>Your Mood Journey 📈</h2>

          <p>
            See how your mood has changed over time.
          </p>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 5
                }}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="date" />

                <YAxis
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) => {

                    const mood =
                      moods.find(
                        (m) => m.value === value
                      );

                    return mood
                      ? mood.emoji
                      : value;

                  }}
                />

                <Tooltip
                  formatter={(value) => {

                    const mood =
                      moods.find(
                        (m) => m.value === value
                      );

                    return mood
                      ? mood.name
                      : value;

                  }}
                />

                <Line
                  type="monotone"
                  dataKey="mood"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </section>

      )}

      {/* =========================
          MOOD HISTORY
      ========================= */}

      <section className="mood-history">

        <h2>Your Mood History 📝</h2>

        {loading && (
          <p>Loading your mood history...</p>
        )}

        {!loading &&
          moodHistory.length === 0 && (

            <p>
              No mood entries yet.
              Start by selecting how you feel today.
            </p>

          )}

        <div className="mood-history-list">

          {moodHistory.map((item) => (

            <div
              className="mood-history-card"
              key={item.id}
            >

              <div>

                <span className="history-emoji">
                  {item.emoji}
                </span>

                <strong>
                  {item.mood}
                </strong>

                <small>
                  {item.createdAt?.toDate
                    ? item.createdAt
                        .toDate()
                        .toLocaleString()
                    : ""}
                </small>

              </div>

              <button
                type="button"
                onClick={() =>
                  deleteMood(item.id)
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </section>

    </main>

  );
}

export default MoodTracker;