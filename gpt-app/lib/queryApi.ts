import { DocumentData, doc } from 'firebase/firestore'
import openai from './chatgpt'
import { ChatCompletionRequestMessage } from 'openai'

const query = async (prompt: string, chatId: string, model: string, history: DocumentData[]) => {
  const queryMessage: ChatCompletionRequestMessage[] = [{ role: 'system', content: 'あなたは先生です。' }]

  history.forEach((doc) => {
    queryMessage.push({ role: doc.user._id == 'ChatGPT' ? 'assistant' : 'user', content: doc.text })
  })

  queryMessage.push({ role: 'user', content: prompt })

  const res = await openai
    .createChatCompletion({
      model,
      messages: queryMessage,
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
