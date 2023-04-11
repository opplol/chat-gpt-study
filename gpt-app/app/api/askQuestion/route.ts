import query from '@/lib/queryApi'
import admin from 'firebase-admin'
import { adminDb } from '@/firebaseAdmin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('api called')
  console.log(request.body)
  const jsonBody = await request.json()
  const { prompt, chatId, model, session } = jsonBody

  if (!prompt) {
    return new Response('Missing prompt', { status: 400 })
  }
  if (!chatId) {
    return new Response('Missing Chat Id', { status: 400 })
  }

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || 'Sorry, I did not understand that.',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://avatars.githubusercontent.com/u/15142826?s=40&v=4',
    },
  }

  await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  return NextResponse.json({ answer: message.text })
}
