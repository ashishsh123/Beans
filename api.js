const express = require("express");
// const mongoose = require("mongoose");
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");
require("dotenv").config();
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*DATABASE CONNECTION AND CREATION */

//Connect database
// mongoose
//   .connect("mongodb://127.0.0.1:27017/AI-generate")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("Mongo Error", err));

// //Schema
// const userSchema = new mongoose.Schema({
//   loginId: {
//     type: String,
//     required: true,
//   },
//   loginTime: {
//     type: Date,
//     default: Date.now,
//   },
//   promptRequest: {
//     purpose: {
//       type: String,
//       required: true,
//     },
//     subSelections: {
//       genre: {
//         type: String,
//         required: true,
//       },
//       tone: {
//         type: String,
//         required: true,
//       },
//       nature: {
//         type: String,
//         required: true,
//       },
//       editorialWill: {
//         type: String,
//         required: true,
//       },
//       writingStyle: {
//         type: String,
//         required: true,
//       },
//     },
//     prompt: {
//       type: String,
//       required: true,
//     },
//   },
//   promptResponse: {
//     rawOutputAIEngine1: {
//       type: String,
//     },
//     rawOutputAIEngine2: {
//       type: String,
//     },
//   },
// });

// const promptUser = mongoose.model("user", userSchema);
///////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*BEDROCK CLAUDE INSTANT API INTEGRATION*/
//////////////////////////////////////////

app.post("/invoke-model", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(req.body);
    const client = new BedrockRuntimeClient({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const request = {
      prompt: `\n\nHuman:${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 250,
      temperature: 0.1,
      top_p: 0.9,
    };

    const input = {
      body: JSON.stringify(request),
      contentType: "application/json",
      accept: "application/json",
      modelId: "anthropic.claude-instant-v1",
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    console.log(response);
    const data = JSON.parse(Buffer.from(response.body).toString("utf-8"));
    // const summary = response.body[0]?.completion;
    const summary = data.completion;
    console.log(summary);
    res.json({ summary: summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Google Palm AI API Integration */
////////////////////////////////////

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyCi0Xvl962yiZ40TyqKeDqrFi66hd2RMuE";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

app.post("/generate-text", (req, res) => {
  const { prompt } = req.body;

  client
    .generateText({
      model: MODEL_NAME,

      prompt: {
        text: prompt,
      },
    })
    .then((result) => {
      // console.log("result------------------", JSON.stringify(result));
      const summary = result[0]?.candidates[0]?.output;
      console.log(summary);
      res.json({ summary: summary });
    })
    .catch((error) => {
      console.error("---------------------------------------------", error);
      res.status(500).json({ error: "An error occurred." });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Open AI API Integration */
/////////////////////////////

const { Configuration, OpenAIApi } = require("openai");

// OpenAI API Configuration
const config = new Configuration({
  organization: "org-3KoojXGycJQ1YL7x2rhQeRSN",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

/*CONTENT SUMMARIZATION */ ///////////////////////////////////////////////////////////////////////////////
// app.post("/summary", async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "Please provide a story." });
//     }

//     const prompt = `Please summarize the following story in  bullet points:\n\n${text}\n\nSummary for news article:`;

//     const completions = await openai.createChatCompletion({
//       model: "gpt-4-0613",
//       messages: [
//         {
//           role: "system",
//           content: `${prompt}`,
//         },
//       ],
//       max_tokens: 1000,
//       temperature: 0.5,
//       top_p: 0.7,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     const summary = completions.data.choices[0].message.content;

//     res.json({ summary });
//   } catch (error) {
//     console.error("Error during summary generation:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred during summary generation." });
//   }
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*CONTENT GENERATION */
app.post("/generation", async (req, res) => {
  try {
    // genreSelected,
    // writingStyleSelected,
    // natureSelected,
    // editorialSelected,
    // toneselected,
    // inputText,
    const { prompt } = req.body;

    // if (!inputText) {
    //   return res.status(400).json({ error: "Please provide a story." });
    // }

    // Create a conversation with the user message
    const conversation = [
      {
        role: "user",
        content: prompt,
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
// app.post("/improve-text", async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ error: "Please provide text to improve." });
//     }

//     const conversation = [
//       {
//         role: "system",
//         content:
//           "You are a helpful assistant that improves text. Please perform the following tasks: Spelling, Grammar, Punctuation, Capitalization, Consistency errors in style and formatting, Missing words or phrases, Repeated words, Incorrect facts, Logic inconsistencies.",
//       },
//       {
//         role: "user",
//         content: text,
//       },
//     ];

//     const completions = await openai.createChatCompletion({
//       model: "gpt-4-0613",
//       messages: conversation,
//       max_tokens: 1000, // You can adjust this based on the length of the text
//       temperature: 0.5,
//       top_p: 0.7,
//     });

//     const summary = completions.data.choices[0].message.content;

//     res.json({ summary });
//   } catch (error) {
//     console.error("Error during text improvement:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred during text improvement." });
//   }
// });
// Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
