import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});



export const chatGPTResponse = async(pokemonName: string): Promise<string> => {


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": `Dame informacion del pokemon ${pokemonName} en 60 palabras`
          }
        ],
      temperature: 0.7,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log({response})

    return response.choices[0].message.content || `No trengo nada sobre ${ pokemonName }, lo siento`;
}
