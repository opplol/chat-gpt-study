'use client'
import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import ModelSelection from './ModelSelection'
import useSWR from 'swr'
import { useRef } from 'react'
import SpeechInput from './SpeechInput'

type Props = {
  chatId: string
}
function ChatInput({ chatId }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [prompt, setPrompt] = useState('')
  function updatePrompt(newValue: string) {
    setPrompt(newValue)
  }

  const { data: session } = useSession()

  const { data: model } = useSWR('model', { fallbackData: 'gpt-3.5-turbo' })
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return

    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    }

    await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)

    // toast notification to say loading
    const notification = toast.loading('ChatGPT is thinking...')

    const res = await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(async (res) => {
      // toast notification to say done
      toast.success('ChatGPT has responded!', { id: notification })
      const answer_text = await res.json()
      play(answer_text.answer)
    })
  }

  const play = async (text: string) => {
    try {
      const res = await fetch('/api/getTts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'response-Type': 'arraybuffer',
        },
        body: JSON.stringify({
          answerText: text,
          session,
        }),
      })
        .then((response) => response.blob())
        .then(async (tts_blob) => {
          // 前の音声を停止する
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }

          // URLを解放する
          if (audioRef.current && audioRef.current.src) {
            URL.revokeObjectURL(audioRef.current.src)
          }

          if (audioRef.current) {
            console.log(tts_blob)
            audioRef.current.src = URL.createObjectURL(new Blob([tts_blob as any], { type: 'audio/mp3' }))

            // 再生を待ってから処理を続ける
            await audioRef.current.play()
          }
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm space-x-1 flex items-center justify-center overflow-hidden">
      <form onSubmit={(e) => sendMessage(e)} className="p-5 flex flex-1 ">
        <input
          className="bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300 flex-1 "
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type a message"
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 x-4 -rotate-45" />
        </button>
      </form>
      <SpeechInput updatePrompt={updatePrompt} />
      <div className="md:hidden">
        <ModelSelection />
      </div>
      <audio ref={audioRef} controls />
    </div>
  )
}

export default ChatInput
