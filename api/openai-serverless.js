import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k-0613",
      messages: [
        {
          role: "system",
          content:
            "You have to make three very short similar questions based on the user message you will receive. And don't mention anything else, just make the similar questions separated with \n (new line).",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    res.status(200).json(response.choices[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
