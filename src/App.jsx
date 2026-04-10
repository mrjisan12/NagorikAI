import { useEffect, useRef, useState, startTransition } from 'react'

const starterPrompts = [
  'NID correction korte ki lagbe?',
  'Passport renewal korte chai',
  'Gas complaint kothay korbo?',
  'Trade license process bolo',
]

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content:
      'Hello! Ami tomar demo assistant. Government service, documents, process, ba complaint niye proshno korte paro.',
    time: '09:00 AM',
  },
]

function getAssistantReply(query) {
  const normalized = query.toLowerCase()

  if (normalized.includes('nid')) {
    return `NID correction er jonne shadharonoto online application, supporting documents, ebong fee payment dorkar hoy. Tumi chaiyle ami documents list, step-by-step process, ba complaint pathaoar way alada kore dite pari.`
  }

  if (normalized.includes('passport')) {
    return `Passport service er khetre application form, NID/Birth Certificate, photo, fee payment, ebong biometric appointment important. Tumi new passport naki renewal chaccho seta bolle aro targeted guide dite parbo.`
  }

  if (
    normalized.includes('gas') ||
    normalized.includes('complaint') ||
    normalized.includes('ovijog')
  ) {
    return `Complaint korar age location, problem duration, customer number ba service reference ready rakho. Relevant authority, submission channel, ebong ekta short complaint draft ami ekhanei generate kore dite parbo.`
  }

  if (normalized.includes('trade license')) {
    return `Trade license er jonno local authority office, business address proof, owner identification, ebong fee details check kora lage. Business type janale ami aro relevant checklist dite parbo.`
  }

  return `Bujhte perechi. Ei topic niye ami service summary, required documents, process steps, complaint path, ba ekta ready draft help korte pari. Tumi ektu specific kore bolle ami better answer debo.`
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const submitMessage = (text) => {
    const value = text.trim()
    if (!value || isTyping) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: value,
      time: formatTime(),
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      startTransition(() => {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: getAssistantReply(value),
            time: formatTime(),
          },
        ])
        setIsTyping(false)
      })
    }, 900)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitMessage(input)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(240,247,242,0.94)_35%,rgba(230,244,234,0.92)_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-10 mb-4 rounded-[28px] border border-white/60 bg-white/80 px-4 py-3 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
                AI Chat Demo
              </p>
              <div className="mt-1 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,#006a4e,#f42a41)] p-[1px] shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white text-lg font-semibold text-emerald-700">
                    N
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-semibold sm:text-xl">NagorikAI Chat</h1>
                  <p className="text-sm text-slate-500">
                    Public service questions and complaint guidance in one place
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                Bangla Friendly
              </span>
              <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                Demo Mode
              </span>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[30px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">
                  Quick Start
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-900">
                  Ask like ChatGPT, get a guided civic support reply
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Service info, document guidance, and complaint help in one clean
                  conversation.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Try these prompts</p>
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => submitMessage(prompt)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-800">What this demo supports</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Services', 'Documents', 'Complaints', 'Draft Help'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="flex min-h-[70vh] flex-col rounded-[30px] border border-white/70 bg-white/80 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="border-b border-slate-200/80 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Conversation</p>
                  <p className="text-sm text-slate-500">
                    Ask anything about public services or complaint process
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  {messages.length - 1} messages
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
              {messages.map((message) => {
                const isUser = message.role === 'user'

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl rounded-[28px] px-4 py-3 shadow-sm sm:px-5 ${
                        isUser
                          ? 'bg-[linear-gradient(135deg,#006a4e,#0b7d60)] text-white'
                          : 'border border-slate-200 bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium">
                        <span
                          className={
                            isUser ? 'text-emerald-100' : 'text-slate-500'
                          }
                        >
                          {isUser ? 'You' : 'NagorikAI'}
                        </span>
                        <span
                          className={
                            isUser ? 'text-emerald-100/80' : 'text-slate-400'
                          }
                        >
                          {message.time}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-7 sm:text-[15px]">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 text-slate-500 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">NagorikAI is typing</span>
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="border-t border-slate-200/80 px-4 py-4 sm:px-6">
              <form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-2 shadow-inner"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <label className="flex-1">
                    <span className="sr-only">Write your message</span>
                    <textarea
                      rows="1"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Type your message here..."
                      className="max-h-40 min-h-[56px] w-full resize-y border-0 bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="inline-flex h-14 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#006a4e,#f42a41)] px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
