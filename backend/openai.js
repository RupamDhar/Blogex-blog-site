const OpenAI = require("openai");
require("dotenv").config();

exports.GenerateAISummary = async (blogContent) => {
    try {
        const client = new OpenAI({
            baseURL: "https://models.github.ai/inference",
            apiKey: process.env.GITHUB_TOKEN
        });
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a professional blog summarizer that responds briefly and clearly in 2-3 lines." },
                { role: "user", content: blogContent }
            ],
            model: "openai/gpt-4o",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
        });
        const result = response.choices[0].message.content;
        console.log(result);
        return result;
    }
    catch (err) {
        return "The sample encountered an error:";
    }
}


//github token : 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