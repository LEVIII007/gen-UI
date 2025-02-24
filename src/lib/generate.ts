"use server";

import { OpenAI } from "openai";
import dotenv from "dotenv";
import { basic_prompt, structure_prompt } from "./prompt";
import { auth } from "@/auth";
import { prisma } from "./prisma";

dotenv.config();

export async function generateText(formData: FormData) {
  //* Authenticate the user
  const session = await auth();
  if (!session || !session.user) {
    return { message: "User not Logged In", success: false };
  }

  try {
    //* Check if the user exists and has sufficient credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    if (!user) {
      return { message: "User not found", success: false };
    }
    if (user.credits < 10) {
      return { message: "Insufficient Credits", success: false };
    }
  } catch (error) {
    console.error("Error checking user credits:", error);
    return { message: "Failed to check user credits", success: false };
  }

  //* Retrieve file and options from formData
  const file = formData.get("file") as File;
  const options = formData.get("options") as string;
  if (!file) {
    return { message: "No file uploaded", success: false };
  }

  try {
    //* Convert file to base64 string
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    //* Initialize OpenAI client
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    //* Generate analysis using OpenAI API
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
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
    });
    if (!response.choices[0].message.content) {
      return { message: "Failed to analyze image", success: false };
    }
    //* Deduct 10 credits from the user
    try {
      const decrement = Math.random() < 0.1 ? 5 : 10;
      await prisma.user.update({
      where: { id: session.user.id },
      data: { credits: { decrement } },
      });
    } catch (error) {
      console.error("Error deducting credits:", error);
      return { message: "Failed to deduct credits", success: false };
    }
    //* Return the analysis result
    return {
      analysis: response.choices[0].message.content,
      message: "Analysis generated successfully",
      success: true,
    };
  } catch (error) {
    console.error("Error generating analysis:", error);
    return { message: "Failed to analyze image", success: false };
  }
}
