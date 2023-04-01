import openai from '@/lib/chatgpt'

type Option = {
  value: string
  label: string
}

export async function GET(request: Request) {
  const models = await openai.listModels().then((res) => res.data.data)
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }))

  return new Response(JSON.stringify({ modelOptions }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
