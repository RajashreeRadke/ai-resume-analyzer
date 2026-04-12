
import asyncHandler from "express-async-handler"
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenAI({});
const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
apiKey: "sk-ijklmnopqrstuvwxijklmnopqrstuvwxijklmnop"
});

export const checkResume = asyncHandler(async (req,res) => {
    
        const {resumeText} = req.body;

        if(!resumeText){
            throw new Error("resumeText not found")
        }

    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    //      const prompt = `
    // Analyze this resume and give:
    // 1. Strengths
    // 2. Weaknesses
    // 3. Improvements
    // 4. ATS score out of 100

    // Resume:
    // ${resumeText}
    // `;

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
    console.log(response.text);

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();

    res.status(200).json({ result: response.text });
        // const response = await client.chat.completions.create({
        //     model:"gpt-40-mini",
        //     messages:[
        //         {
        //             role:"user",
        //             content:`Analyze this resume and give:
        //             1.Strenths
        //             2.Weaknesses
        //             3.Imprevements
        //             4.ATS score out of 100
                    
        //             Resume:
        //             ${resumeText}`,   
        //         },
        //     ],
        // });

        //  res.json({ result: response.choices[0].message.content });
        // res.status(200).json({ result: response.choices[0].message.content })
   
})