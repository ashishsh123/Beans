const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");

// OpenAI API Configuration
const config = new Configuration({
  organization: "org-3KoojXGycJQ1YL7x2rhQeRSN",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

/*CONTENT SUMMARIZATION */ ///////////////////////////////////////////////////////////////////////////////
app.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Please provide a story." });
    }

    const prompt = `Please summarize the following story in  bullet points:\n\n${text}\n\nSummary for news article:`;

    const completions = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: `${prompt}`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const summary = completions.data.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("Error during summary generation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during summary generation." });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*CONTENT GENERATION */
app.post("/generation", async (req, res) => {
  try {
    const {
      optionSelected,
      genreSelected,
      writingStyleSelected,
      natureSelected,
      editorialSelected,
      inputText,
    } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: "Please provide a story." });
    }

    // Create a conversation with the user message
    const conversation = [
      {
        role: "user",
        content: `Generate Content on the basis of given input:-  ${optionSelected}\n Genre: ${genreSelected}\n Editorial: ${editorialSelected}\n Write Style: ${writingStyleSelected}\n Nature: ${natureSelected}\n ${inputText}`,
      },
    ];

    const completions = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: conversation, // Use the conversation as messages
      max_tokens: 4000,
      temperature: 0.5,
      top_p: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const summary = completions.data.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("Error during Content generation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during Content generation." });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////

/*CONTENT PROOFREADING */
app.post("/improve-text", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Please provide text to improve." });
    }

    const conversation = [
      {
        role: "system",
        content:
          "You are a helpful assistant that improves text. Please perform the following tasks: Spelling, Grammar, Punctuation, Capitalization, Consistency errors in style and formatting, Missing words or phrases, Repeated words, Incorrect facts, Logic inconsistencies.",
      },
      {
        role: "user",
        content: text,
      },
    ];

    const completions = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: conversation,
      max_tokens: 1000, // You can adjust this based on the length of the text
      temperature: 0.5,
      top_p: 0.7,
    });

    const summary = completions.data.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("Error during text improvement:", error);
    res
      .status(500)
      .json({ error: "An error occurred during text improvement." });
  }
});
// Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
