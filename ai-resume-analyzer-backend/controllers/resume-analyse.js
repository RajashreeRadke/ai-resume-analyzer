
import asyncHandler from "express-async-handler"
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import pdfParse from 'pdf-parse';

dotenv.config();
const genAI = new GoogleGenAI({});

export const checkResume = asyncHandler(async (req,res) => {

        let resumeText = "";

        console.log(req.file)
        // 👉 Case 1: File Upload
         if (req.file) {

            const dataBuffer = fs.readFileSync(req.file.path);
            const pdfData = await pdfParse(dataBuffer);

            if (!pdfData.text || pdfData.text.trim().length < 50) {
                throw new Error("Unable to extract proper text from PDF");
            }

            resumeText = pdfData.text;

            if (req.file.path && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        // 👉 Case 2: Text Input
        else if (req.body.resumeText) {
            resumeText = req.body.resumeText;
        }

        // 👉 No Input
        else {
            throw new Error("No resume data provided");
        }

        const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
        Analyze this resume and give:
        1. Strengths
        2. Weaknesses
        3. Improvements
        4. ATS score out of 100

        Resume:
        ${resumeText}
        `,
        });

        res.status(200).json({ result: response.text });
    })