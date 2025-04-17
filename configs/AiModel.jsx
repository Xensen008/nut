const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", });

const ChatSession = model.startChat({
    generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
    },
});

module.exports = { ChatSession };