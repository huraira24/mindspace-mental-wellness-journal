
import { useState, useEffect } from "react";
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

function Journal() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [analyzingId, setAnalyzingId] = useState(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEntries([]);
        return;
      }

      try {
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        const loadedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setEntries(loadedEntries);
      } catch (error) {
        console.error("Error loading journal entries:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Please write something first.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const newEntry = {
        text: text,
        userId: user.uid,
        createdAt: new Date()
      };

      const docRef = await addDoc(
        collection(db, "journalEntries"),
        newEntry
      );

      setEntries([
        {
          id: docRef.id,
          ...newEntry
        },
        ...entries
      ]);

      setText("");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  const analyzeEntry = async (entry) => {
    try {
      setAnalyzingId(entry.id);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          journalText: entry.text
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to analyze journal entry."
        );
      }

      setAnalysis((previousAnalysis) => ({
        ...previousAnalysis,
        [entry.id]: data.analysis
      }));} catch (error) {
  console.error("AI analysis error:", error);

  if (error.message.includes("503")) {
    alert("Gemini is currently busy. Please try again in a moment.");
  } else {
    alert("Unable to analyze this entry right now.");
  }
} finally {
      setAnalyzingId(null);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, "journalEntries", id));

      setEntries(
        entries.filter((entry) => entry.id !== id)
      );

      setAnalysis((previousAnalysis) => {
        const updatedAnalysis = { ...previousAnalysis };
        delete updatedAnalysis[id];
        return updatedAnalysis;
      });
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  return (
    <main className="journal-page">
      <h1>My Journal 📝</h1>

      <p>
        Take a moment to write down your thoughts.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How was your day? What are you thinking about?"
          rows="8"
        />

        <button type="submit">
          Save Entry
        </button>
      </form>

      <div className="entries">
        {entries.map((entry) => (
          <div
            className="entry-card"
            key={entry.id}
          >
            <small>
              {entry.createdAt?.toDate
                ? entry.createdAt.toDate().toLocaleString()
                : new Date(entry.createdAt).toLocaleString()}
            </small>

            <p>{entry.text}</p>

            <button
              type="button"
              onClick={() => analyzeEntry(entry)}
              disabled={analyzingId === entry.id}
            >
              {analyzingId === entry.id
                ? "Analyzing..."
                : "✨ Analyze with AI"}
            </button>

            {analysis[entry.id] && (
              <div className="ai-analysis">
                <h3>AI Journal Insight 🌱</h3>

                <p>
                  {analysis[entry.id]}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => deleteEntry(entry.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Journal;

