import { DocumentData } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'
import { useRef, useEffect } from 'react'

type Props = {
  message: DocumentData
}

function Message({ message }: Props) {
  const isChatGPT = message.user._id === 'ChatGPT'
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [])

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className="flex w-auto space-x-1 px-10 ">
        <img src={message.user.avatar} alt="" className="w-8 h-8" />
        {/* <p className="pt-1 text-sm">{message.text}</p> */}
        <div ref={containerRef} className="w-full">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message
