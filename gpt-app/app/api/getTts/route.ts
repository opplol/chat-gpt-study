import polly from "@/lib/awsPolly"

export async function POST(req: Request) {
  console.log('TTS api called')
  console.log(req.body)
  const jsonBody = await req.json()
  const { answerText, session } = jsonBody

  if (!session) return new Response('Invalid Session', { status: 400 })

  const response_polly = await polly
    .synthesizeSpeech({
      Text: answerText,
      OutputFormat: 'mp3',
      VoiceId: 'Mizuki',
    })
    .promise()

    return new Response(response_polly.AudioStream as any, { status: 200})
}
