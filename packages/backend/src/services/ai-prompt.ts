import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export const createPrompService = (ask: string) => {
    
    return openai.chat.completions.create({
        messages: [{ role: "user", content: ask }],
        model: "gpt-3.5-turbo",
    });
    
}