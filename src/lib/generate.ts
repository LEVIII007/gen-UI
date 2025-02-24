"use server";

import { OpenAI } from "openai";
import dotenv from "dotenv";
import { basic_prompt, structure_prompt } from "./prompt";

dotenv.config();

console.log('api key:', process.env.OPENAI_API_KEY);

export async function generateText(formData: FormData) {
    console.log('formData:', formData);
  const file = formData.get("file") as File;
  const options = formData.get("options") as string;
  if (!file) {
    return { error: "No file uploaded" };
  }
  console.log("Generating analysis for file:", file.name);
  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString("base64");

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: options === "structure" ? structure_prompt : basic_prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64String}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    });
    console.log('response:', response);
    console.log('choices:', response.choices[0].message.content);
    return { analysis: response.choices[0].message.content, success: true };
  } catch (error) {
    console.error("Error generating analysis:", error);
    return { error: "Failed to analyze image", success: false };
  }
}
