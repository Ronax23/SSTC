import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQAPI});

const generateTags = async (req,res) => {
    const {title,content,maxTags=7}=req.body;
    if(!title||!content){return res.status(200).json({message:'No Content Found',status:200})}
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // Fast, free open model
      response_format: { type: "json_object" }, // Enforces JSON output
      messages: [
        {
          role: "system",
          content: `You are an expert SEO tagging assistant. 
Extract up to ${maxTags} relevant, concise tags from the provided text. 
You MUST respond strictly with a valid JSON object containing a "tags" key with an array of lowercased strings.
Example: {"tags": ["node.js", "express", "mongodb"]}`,
        },
        {
          role: "user",
        content: `Title: ${title}\nContent:\n${content}`,        },
      ],
      temperature: 0.2, // Low temperature for deterministic output
    });
    const parsedData =JSON.parse(response.choices[0].message.content || "{}").tags || []
    res.status(200).json({message:'Successful',tags:parsedData,status:201})
    return parsedData.tags || [];
  } catch (error) { res.status(200).json({message:error,status:500})  }
};

export default generateTags;