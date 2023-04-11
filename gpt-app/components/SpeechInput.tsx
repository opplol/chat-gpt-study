import { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

type Props = {
  updatePrompt: (newPrompt: string) => void
}

function SpeechInput({ updatePrompt }: Props) {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  const promptHandler = (prompt: string) => {
    updatePrompt(prompt)

  }
  useEffect(() => {
    promptHandler(transcript)
  }, [transcript])

  return (
    <>
      {browserSupportsSpeechRecognition ? (
        <div className="flex space-x-1 overflow-hidden px-4">
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={() => SpeechRecognition.startListening()}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      ) : (
        <span>Browser doesn't support speech recognition.</span>
      )}
    </>
  )
}

export default SpeechInput
