import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createChatCompletion({
      model,
      messages: [
        { role: 'system', content: 'あなたは先生です。' },
        { role: 'assistant', content: 'コードを教えて下さい' },
        { role: 'assistant', content: '返信はmarkdown形式でしてください' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].message?.content)
    .catch((err) => `ChatGPT was Something went wrong: ${err.message}`)

  return res
}

export default query
