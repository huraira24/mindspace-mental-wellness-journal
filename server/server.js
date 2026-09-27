const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.get("/", (req, res) => {
  res.send("MindSpace AI server is running 🌿");
});

app.post("/analyze", async (req, res) => {
  try {
    const { journalText } = req.body;

    if (!journalText || journalText.trim() === "") {
      return res.status(400).json({
        error: "Journal text is required."
      });
    }

    const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite"
    });

    const prompt = `
You are a supportive journal reflection assistant for an app called MindSpace.

Analyze the following journal entry and provide:

1. Emotion
2. Key themes
3. A short gentle reflection
4. One simple wellness suggestion

Do not diagnose any mental health condition.
Do not provide medical advice.
Keep the response supportive, respectful, and concise.

Journal entry:
${journalText}
`;

    let result;

    // Try up to 3 times if Gemini is temporarily unavailable
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error) {
        console.error(
          `Gemini attempt ${attempt} failed:`,
          error.message
        );

        if (attempt === 3) {
          throw error;
        }

        // Wait 2 seconds before trying again
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    const response = result.response.text();

    res.json({
      analysis: response
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`MindSpace AI server running on port ${PORT}`);
});

