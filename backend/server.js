import { GoogleGenerativeAI } from "@google/generative-ai";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post('/chat', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "No text provided" });
        }

        console.log("🎙️ User said:", text);

        const result = await model.generateContent(text);
        const aiText = result.response.text();

        console.log("🤖 Gemini replied:", aiText);

        return res.json({ reply: aiText });

    } catch (error) {
        console.log("Error communicating with Gemini:", error);
        //    Agar 503 error aaye (Server Busy)
        if (error.message.includes('503')) {
             return res.json({ reply: "Main abhi thoda busy hoon, please ek second baad poocho." });
        }
        
        // Agar 404 error aaye (Model Not Found)
        if (error.message.includes('404')) {
            return res.json({ reply: "Backend me Model ka naam galat hai. Please code check karo." });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`App is listening at ${port}`);
});

export default app;
