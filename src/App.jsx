import { useEffect, useRef, useState, startTransition } from 'react'

const content = {
  bn: {
    badge: 'Bangladesh Public Service AI',
    title: 'NagorikAI',
    subtitle:
      'সরকারি সেবা, ডকুমেন্ট, অভিযোগ প্রক্রিয়া এবং ড্রাফট সহায়তার জন্য একটি ডামি AI সাপোর্ট সেন্টার',
    heroTitle: 'জনসেবার তথ্য এখন এক জায়গায়',
    heroText:
      'পাসপোর্ট, NID, ট্রেড লাইসেন্স, গ্যাস বা বিদ্যুৎ অভিযোগসহ বিভিন্ন public service বিষয়ক প্রশ্ন করুন। NagorikAI ডামি ডেটা দিয়ে structured উত্তর দেখাবে।',
    promptTitle: 'দ্রুত প্রশ্ন',
    supportTitle: 'এই ডেমো কী দেখায়',
    supportItems: ['Service Process', 'Required Documents', 'Complaint Path', 'Draft Guidance'],
    conversationTitle: 'AI Public Service Chat',
    conversationText: 'Bangla বা English এ লিখুন, demo assistant structured উত্তর দেবে',
    composerPlaceholder:
      'যেমন: NID correction korte ki lagbe? / Gas complaint kothay korbo?',
    send: 'পাঠান',
    typing: 'NagorikAI উত্তর তৈরি করছে',
    messages: 'টি মেসেজ',
    chips: [
      'Passport renewal korte ki lagbe?',
      'NID correction process bolo',
      'Gas complaint kothay korbo?',
      'Trade license korte chai',
      'বিদ্যুৎ সমস্যা নিয়ে অভিযোগ করবো',
    ],
    welcome: {
      intro:
        'স্বাগতম। আমি NagorikAI demo assistant। আমি Bangladesh public service center-এর মতো service process, document checklist, complaint path এবং draft support দেখাতে পারি।',
      note: 'আপনি বাংলা, English বা Roman Bangla-তে প্রশ্ন করতে পারেন।',
    },
    labels: {
      quickSummary: 'দ্রুত সারাংশ',
      requiredDocuments: 'প্রয়োজনীয় ডকুমেন্ট',
      process: 'ধাপে ধাপে প্রক্রিয়া',
      whereToApply: 'কোথায় করবেন',
      feeAndTime: 'ফি ও সময়',
      commonMistakes: 'সাধারণ ভুল',
      authority: 'দায়িত্বপ্রাপ্ত কর্তৃপক্ষ',
      channel: 'অভিযোগের মাধ্যম',
      informationNeeded: 'অভিযোগে যা লাগবে',
      complaintSteps: 'অভিযোগের ধাপ',
      draft: 'নমুনা অভিযোগ ড্রাফট',
      suggestedNext: 'পরবর্তী করণীয়',
      serviceTag: 'Service Guide',
      complaintTag: 'Complaint Guide',
      draftTag: 'Draft Ready',
      followUpQuestions: 'সম্পর্কিত প্রশ্ন',
    },
    nextSteps: {
      service: ['ডকুমেন্ট আগে প্রস্তুত করুন', 'অফিস/পোর্টাল যাচাই করুন', 'ফি ও timeline মিলিয়ে নিন'],
      complaint: ['লোকেশন ও তারিখ লিখে রাখুন', 'প্রয়োজনে ছবি বা বিল নম্বর যোগ করুন', 'প্রথমে official channel ব্যবহার করুন'],
      fallback: ['Service name স্পষ্ট করুন', 'সমস্যার ধরন লিখুন', 'আমি process বা complaint path দেখাবো'],
    },
  },
  en: {
    badge: 'Bangladesh Public Service AI',
    title: 'NagorikAI',
    subtitle:
      'A dummy AI support center for service process, documents, complaint workflow, and draft assistance',
    heroTitle: 'Public service guidance in one chat',
    heroText:
      'Ask about passports, NID, trade license, gas or electricity complaints, and more. NagorikAI uses local dummy data to show structured answers.',
    promptTitle: 'Quick prompts',
    supportTitle: 'What this demo shows',
    supportItems: ['Service Process', 'Required Documents', 'Complaint Path', 'Draft Guidance'],
    conversationTitle: 'AI Public Service Chat',
    conversationText: 'Type in Bangla or English and get structured demo guidance',
    composerPlaceholder:
      'Example: NID correction korte ki lagbe? / Where do I submit a gas complaint?',
    send: 'Send',
    typing: 'NagorikAI is preparing a reply',
    messages: 'messages',
    chips: [
      'What do I need for passport renewal?',
      'NID correction process',
      'Where do I complain about gas?',
      'Trade license application steps',
      'Electricity complaint process',
    ],
    welcome: {
      intro:
        'Welcome. I am the NagorikAI demo assistant. I work like a Bangladesh public service center and can show service process, document checklist, complaint path, and sample draft support.',
      note: 'You can ask in Bangla, English, or Roman Bangla.',
    },
    labels: {
      quickSummary: 'Quick summary',
      requiredDocuments: 'Required documents',
      process: 'Step-by-step process',
      whereToApply: 'Where to apply',
      feeAndTime: 'Fee and timeline',
      commonMistakes: 'Common mistakes',
      authority: 'Responsible authority',
      channel: 'Complaint channel',
      informationNeeded: 'Information to include',
      complaintSteps: 'Complaint steps',
      draft: 'Sample complaint draft',
      suggestedNext: 'Suggested next steps',
      serviceTag: 'Service Guide',
      complaintTag: 'Complaint Guide',
      draftTag: 'Draft Ready',
      followUpQuestions: 'Related questions',
    },
    nextSteps: {
      service: ['Prepare documents first', 'Confirm office or portal', 'Double-check fees and timeline'],
      complaint: ['Keep location and date ready', 'Attach image or bill number if possible', 'Use official channel first'],
      fallback: ['Mention the service name', 'Describe the issue clearly', 'I will show process or complaint guidance'],
    },
  },
}

const knowledgeBase = [
  {
    type: 'service',
    key: 'passport',
    keywords: [
      'passport',
      'renewal',
      'passport renewal',
      'পাসপোর্ট',
      'passporter',
      'passport korte',
      'passport renew',
      'passport reissue',
    ],
    reply: {
      bn: {
        title: 'Passport Renewal',
        summary: 'মেয়াদ শেষ হওয়া বা শেষের পথে থাকা পাসপোর্ট নবায়নের জন্য online application, fee payment এবং biometric verification লাগে।',
        documents: ['বর্তমান পাসপোর্ট', 'NID বা জন্মনিবন্ধন', 'অনলাইন আবেদন সারাংশ', 'ফি জমার রসিদ', 'ছবি প্রয়োজন হলে স্টুডিও কপি'],
        steps: ['epassport.gov.bd এ আবেদন শুরু করুন', 'Renewal option নির্বাচন করুন', 'তথ্য যাচাই করে fee দিন', 'appointment date নিন', 'passport office এ biometrics দিন'],
        where: 'Online portal + আঞ্চলিক passport office',
        fee: 'Regular বা urgent package অনুযায়ী পরিবর্তন হয়',
        timeline: 'সাধারণত 7-21 কর্মদিবস',
        mistakes: ['পুরনো তথ্য mismatch', 'ভুল mobile number', 'fee slip না রাখা'],
      },
      en: {
        title: 'Passport Renewal',
        summary: 'Passport renewal usually needs an online application, fee payment, and biometric verification before submission.',
        documents: ['Current passport', 'NID or birth certificate', 'Application summary page', 'Fee payment receipt', 'Photo if required'],
        steps: ['Open epassport.gov.bd', 'Choose renewal', 'Verify all personal information', 'Pay the required fee', 'Visit passport office for biometrics'],
        where: 'Online portal plus regional passport office',
        fee: 'Depends on regular or urgent package',
        timeline: 'Usually 7-21 working days',
        mistakes: ['Data mismatch with old passport', 'Wrong phone number', 'Missing fee receipt'],
      },
    },
    prompts: {
      bn: ['Passport renewal fee koto?', 'Passport korte kon documents lage?', 'Biometric appointment kivabe nibo?'],
      en: ['What is the passport renewal fee?', 'Which documents are needed for passport renewal?', 'How do I book the biometric appointment?'],
    },
  },
  {
    type: 'service',
    key: 'nid',
    keywords: [
      'nid',
      'national id',
      'correction',
      'nid correction',
      'এনআইডি',
      'সংশোধন',
      'shongshodhon',
      'songshodhon',
      'nid vul',
      'nid change',
    ],
    reply: {
      bn: {
        title: 'NID Correction',
        summary: 'NID name, address, birth date বা অন্য তথ্য সংশোধনের জন্য supporting proof সহ আবেদন করতে হয়।',
        documents: ['বর্তমান NID copy', 'জন্মনিবন্ধন/সার্টিফিকেট', 'শিক্ষা সনদ বা supporting proof', 'পাসপোর্ট সাইজ ছবি', 'fee payment proof'],
        steps: ['NID portal এ login করুন', 'Correction request নির্বাচন করুন', 'ভুল তথ্য identify করুন', 'supporting document upload করুন', 'application submit করে tracking রাখুন'],
        where: 'NID online portal বা স্থানীয় নির্বাচন অফিস',
        fee: 'Correction type অনুযায়ী নির্ধারিত',
        timeline: 'সাধারণত 7-30 কার্যদিবস',
        mistakes: ['অস্পষ্ট document upload', 'নাম spelling mismatch', 'ভুল category select করা'],
      },
      en: {
        title: 'NID Correction',
        summary: 'To correct NID details such as name, address, or date of birth, you need to submit a correction request with valid proof.',
        documents: ['Current NID copy', 'Birth certificate', 'Educational certificate or proof', 'Passport size photo', 'Fee payment proof'],
        steps: ['Log in to the NID portal', 'Select correction request', 'Choose the incorrect field', 'Upload proof documents', 'Submit and track the application'],
        where: 'NID online portal or local election office',
        fee: 'Depends on correction category',
        timeline: 'Usually 7-30 working days',
        mistakes: ['Unclear document upload', 'Spelling mismatch', 'Wrong request category'],
      },
    },
    prompts: {
      bn: ['NID correction e fee lage?', 'NID correction korte koto din lage?', 'NID correction complaint kothay korbo?'],
      en: ['Is there a fee for NID correction?', 'How long does NID correction take?', 'Where do I complain about an NID correction delay?'],
    },
  },
  {
    type: 'service',
    key: 'trade-license',
    keywords: [
      'trade license',
      'trade licence',
      'লাইসেন্স',
      'trade',
      'business license',
      'trade licence korte',
      'business licence',
      'trade license renew',
    ],
    reply: {
      bn: {
        title: 'Trade License',
        summary: 'ব্যবসা শুরু বা renew করার জন্য city corporation বা পৌরসভা থেকে trade license নিতে হয়।',
        documents: ['NID copy', 'business address proof', 'shop rent agreement/ownership proof', 'passport size photo', 'TIN থাকলে copy'],
        steps: ['স্থানীয় authority identify করুন', 'application form নিন বা online portal দেখুন', 'business info fill up করুন', 'documents attach করুন', 'fee জমা দিয়ে license collect করুন'],
        where: 'City Corporation / পৌরসভা / Union Parishad',
        fee: 'Business category এবং location অনুযায়ী আলাদা',
        timeline: '1-10 কর্মদিবস',
        mistakes: ['ভুল business category', 'address proof না দেয়া', 'renewal date miss করা'],
      },
      en: {
        title: 'Trade License',
        summary: 'A trade license is generally required from the local city corporation or municipality to start or renew a business.',
        documents: ['NID copy', 'Business address proof', 'Rent agreement or ownership proof', 'Passport size photo', 'TIN copy if available'],
        steps: ['Identify the local authority', 'Collect the form or visit the portal', 'Fill in business information', 'Attach required documents', 'Pay the fee and collect the license'],
        where: 'City Corporation, municipality, or Union Parishad',
        fee: 'Varies by business category and location',
        timeline: '1-10 working days',
        mistakes: ['Wrong business category', 'Missing address proof', 'Missing renewal date'],
      },
    },
    prompts: {
      bn: ['Trade license fee koto?', 'Trade license renew kivabe korbo?', 'Kon office e trade license korte hoy?'],
      en: ['How much is the trade license fee?', 'How do I renew a trade license?', 'Which office handles trade license applications?'],
    },
  },
  {
    type: 'complaint',
    key: 'gas',
    keywords: [
      'gas',
      'গ্যাস',
      'no gas',
      'gas complaint',
      'gas nai',
      'gas nei',
      'gaser shomossha',
      'ovijog',
      'complain',
      'complaint',
    ],
    reply: {
      bn: {
        title: 'Gas Complaint',
        summary: 'গ্যাস না থাকা, কম pressure, line leak বা connection issue হলে gas utility provider-এ অভিযোগ করতে হয়।',
        authority: 'Titas Gas / local gas distribution authority',
        channel: 'Customer care hotline, regional office, website complaint form',
        information: ['গ্রাহক নম্বর', 'ঠিকানা', 'সমস্যা কতদিন ধরে', 'জরুরি ঝুঁকি আছে কিনা'],
        steps: ['সমস্যা নোট করুন', 'customer number ready রাখুন', 'hotline বা office এ complaint জানান', 'tracking number থাকলে লিখে রাখুন', 'জরুরি leak হলে safety first নিশ্চিত করুন'],
        draft: 'বিষয়: আমাদের এলাকায় ৩ দিন ধরে গ্যাস সরবরাহ বন্ধ\n\nজনাব,\nআমাদের এলাকায় গত ৩ দিন ধরে গ্যাস সরবরাহ নেই। রান্না ও দৈনন্দিন কাজ ব্যাহত হচ্ছে। অনুগ্রহ করে দ্রুত সমস্যাটি তদন্ত করে সমাধানের ব্যবস্থা নেয়ার অনুরোধ করছি।\n\nনাম:\nঠিকানা:\nগ্রাহক নম্বর:',
      },
      en: {
        title: 'Gas Complaint',
        summary: 'For no gas supply, low pressure, leak, or connection issues, the complaint usually goes to the relevant gas utility provider.',
        authority: 'Titas Gas or local gas distribution authority',
        channel: 'Customer care hotline, regional office, or website complaint form',
        information: ['Customer number', 'Address', 'How long the problem has continued', 'Any urgent safety risk'],
        steps: ['Note the problem clearly', 'Keep customer number ready', 'Contact hotline or office', 'Save any tracking number', 'Prioritize safety if there is a leak'],
        draft: 'Subject: Gas supply disruption in our area\n\nDear Sir/Madam,\nGas supply has been unavailable in our area for the last 3 days. Daily household activities are being affected. Please investigate the issue and take prompt action.\n\nName:\nAddress:\nCustomer number:',
      },
    },
    prompts: {
      bn: ['Gas complaint draft dao', 'Gas complaint hotline kothay?', 'Gas pressure kom hole ki korbo?'],
      en: ['Show me a gas complaint draft', 'Where is the gas complaint hotline?', 'What should I do for low gas pressure?'],
    },
  },
  {
    type: 'complaint',
    key: 'electricity',
    keywords: [
      'electricity',
      'বিদ্যুৎ',
      'power',
      'বিদ্যুৎ সমস্যা',
      'bidyut',
      'current nai',
      'power nai',
      'line problem',
      'bill issue',
    ],
    reply: {
      bn: {
        title: 'Electricity Complaint',
        summary: 'লাইন সমস্যা, transformer issue, meter complaint বা দীর্ঘ বিদ্যুৎ বিভ্রাটের জন্য বিদ্যুৎ কর্তৃপক্ষের কাছে অভিযোগ করা যায়।',
        authority: 'Palli Bidyut / DESCO / DPDC / local power utility',
        channel: 'Helpline, zonal office, mobile app, complaint desk',
        information: ['consumer number', 'meter number', 'লোকেশন', 'সমস্যার সময়'],
        steps: ['consumer number ready করুন', 'problem type লিখুন', 'official helpline বা app ব্যবহার করুন', 'case number সংগ্রহ করুন', 'follow-up দিন'],
        draft: 'বিষয়: দীর্ঘ সময় বিদ্যুৎ সমস্যার অভিযোগ\n\nজনাব,\nআমাদের এলাকায় দীর্ঘ সময় ধরে বিদ্যুৎ সমস্যা চলছে। এতে বাসিন্দাদের স্বাভাবিক জীবন ব্যাহত হচ্ছে। দ্রুত technical team পাঠিয়ে সমস্যার সমাধান করার অনুরোধ করছি।\n\nনাম:\nঠিকানা:\nconsumer number:',
      },
      en: {
        title: 'Electricity Complaint',
        summary: 'You can raise a complaint for line faults, transformer issues, meter problems, or extended outages with the local electricity utility.',
        authority: 'Palli Bidyut, DESCO, DPDC, or local power utility',
        channel: 'Helpline, zonal office, mobile app, or complaint desk',
        information: ['Consumer number', 'Meter number', 'Location', 'Problem time'],
        steps: ['Keep consumer number ready', 'Write the problem type', 'Use official helpline or app', 'Collect the case number', 'Follow up if needed'],
        draft: 'Subject: Complaint about prolonged electricity disruption\n\nDear Sir/Madam,\nOur area has been facing prolonged electricity issues which are disrupting daily life. Please send the technical team and resolve the matter as soon as possible.\n\nName:\nAddress:\nConsumer number:',
      },
    },
    prompts: {
      bn: ['Electricity complaint draft dao', 'বিদ্যুৎ সমস্যার hotline number?', 'Meter complaint kivabe korbo?'],
      en: ['Show me an electricity complaint draft', 'What is the electricity complaint hotline?', 'How do I submit a meter complaint?'],
    },
  },
]

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function findEntry(query) {
  const normalized = query.toLowerCase()
  return knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())),
  )
}

function buildReply(query, language) {
  const dictionary = content[language]
  const entry = findEntry(query)

  if (!entry) {
    return {
      kind: 'fallback',
      badge: dictionary.labels.serviceTag,
      intro: `${dictionary.welcome.intro}\n${dictionary.welcome.note}`,
      nextSteps: dictionary.nextSteps.fallback,
      prompts: dictionary.chips.slice(0, 3),
    }
  }

  if (entry.type === 'service') {
    const reply = entry.reply[language]
    return {
      kind: 'service',
      badge: dictionary.labels.serviceTag,
      title: reply.title,
      intro: reply.summary,
      sections: [
        { label: dictionary.labels.requiredDocuments, items: reply.documents },
        { label: dictionary.labels.process, items: reply.steps },
        {
          label: dictionary.labels.whereToApply,
          items: [reply.where],
        },
        {
          label: dictionary.labels.feeAndTime,
          items: [reply.fee, reply.timeline],
        },
        { label: dictionary.labels.commonMistakes, items: reply.mistakes },
      ],
      nextSteps: dictionary.nextSteps.service,
      prompts: entry.prompts[language],
    }
  }

  const reply = entry.reply[language]
  return {
    kind: 'complaint',
    badge: dictionary.labels.complaintTag,
    title: reply.title,
    intro: reply.summary,
    sections: [
      { label: dictionary.labels.authority, items: [reply.authority] },
      { label: dictionary.labels.channel, items: [reply.channel] },
      { label: dictionary.labels.informationNeeded, items: reply.information },
      { label: dictionary.labels.complaintSteps, items: reply.steps },
      { label: dictionary.labels.draft, items: [reply.draft] },
    ],
    nextSteps: dictionary.nextSteps.complaint,
    prompts: entry.prompts[language],
  }
}

const initialId = 10

function App() {
  const [language, setLanguage] = useState('bn')
  const [messages, setMessages] = useState([
    {
      id: initialId,
      role: 'assistant',
      time: '09:00 AM',
      response: {
        kind: 'welcome',
        badge: content.bn.labels.serviceTag,
        intro: `${content.bn.welcome.intro}\n${content.bn.welcome.note}`,
        nextSteps: content.bn.nextSteps.fallback,
      },
    },
  ])
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
      const response = buildReply(value, language)
      startTransition(() => {
        setMessages((current) => [
          ...current,
          {
            id: Date.now() + 1,
            role: 'assistant',
            time: formatTime(),
            response,
          },
        ])
        setIsTyping(false)
      })
    }, 800)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitMessage(input)
  }

  const dictionary = content[language]

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f6fff9_0%,#eef8f1_42%,#edf3ef_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,255,249,0.86)_0%,rgba(238,248,241,0.9)_42%,rgba(237,243,239,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,106,78,0.13),transparent_34%),radial-gradient(circle_at_top_right,rgba(244,42,65,0.12),transparent_28%)]" />

      <div className="relative flex min-h-screen w-full flex-col px-3 py-3 sm:px-4 lg:px-6">
        <header className="sticky top-4 z-20 mb-4 rounded-[30px] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_22px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-emerald-700">
                {dictionary.badge}
              </p>
              <div className="mt-2 flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lg shadow-emerald-900/10 sm:h-16 sm:w-16">
                  <img
                    src="/logo.png"
                    alt="NagorikAI logo"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold sm:text-2xl">{dictionary.title}</h1>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                    {dictionary.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${language === 'bn'
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-600'
                    }`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${language === 'en'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-600'
                    }`}
                >
                  English
                </button>
              </div>

            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-[32px] border border-white/80 bg-white/78 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.38)] backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                  Civic AI
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-900">
                  {dictionary.heroTitle}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {dictionary.heroText}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-slate-800">
                  {dictionary.promptTitle}
                </p>
                <div className="space-y-2">
                  {dictionary.chips.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitMessage(prompt)}
                      className="prompt-chip w-full rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8faf8)] px-4 py-3 text-left text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {dictionary.supportTitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {dictionary.supportItems.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="relative flex min-h-[72vh] flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white/82 shadow-[0_28px_90px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="border-b border-slate-200/80 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {dictionary.conversationTitle}
                  </p>
                  <p className="text-sm text-slate-500">{dictionary.conversationText}</p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  {messages.filter((message) => message.role === 'user').length}{' '}
                  {dictionary.messages}
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
                    {isUser ? (
                      <div className="message-enter w-full max-w-[78rem] rounded-[28px] bg-[linear-gradient(135deg,#006a4e,#0b7d60)] px-5 py-4 text-white shadow-[0_16px_40px_-24px_rgba(0,106,78,0.9)]">
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-emerald-100">
                          <span>{language === 'bn' ? 'আপনি' : 'You'}</span>
                          <span className="text-emerald-100/80">{message.time}</span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-7 sm:text-[15px]">
                          {message.content}
                        </p>
                      </div>
                    ) : (
                      <AssistantCard
                        response={message.response}
                        time={message.time}
                        language={language}
                        onPromptClick={submitMessage}
                      />
                    )}
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="typing-shell rounded-[28px] border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600">{dictionary.typing}</span>
                      <div className="flex gap-1">
                        <span className="typing-dot h-2 w-2 rounded-full bg-emerald-600" />
                        <span className="typing-dot typing-dot-delay-1 h-2 w-2 rounded-full bg-emerald-600" />
                        <span className="typing-dot typing-dot-delay-2 h-2 w-2 rounded-full bg-rose-500" />
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
                className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f6faf7)] p-2 shadow-inner"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <label className="flex-1">
                    <span className="sr-only">Message</span>
                    <textarea
                      rows="2"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder={dictionary.composerPlaceholder}
                      className="max-h-44 min-h-[72px] w-full resize-y border-0 bg-transparent px-4 py-3 text-sm leading-7 text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="inline-flex h-14 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#006a4e,#f42a41)] px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {dictionary.send}
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

function AssistantCard({ response, time, language, onPromptClick }) {
  const isComplaint = response.kind === 'complaint'
  const badgeStyles = isComplaint
    ? 'border-rose-200 bg-rose-50 text-rose-700'
    : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  return (
    <div className="assistant-card-enter w-full max-w-[78rem] rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f9fbfa)] p-5 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.4)]">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">
          NagorikAI
        </span>
        <span className={`rounded-full border px-3 py-1 ${badgeStyles}`}>
          {response.badge}
        </span>
        <span className="text-slate-400">{time}</span>
      </div>

      {response.title && <h3 className="text-lg font-semibold text-slate-900">{response.title}</h3>}

      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {response.intro}
      </p>

      {response.sections && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {response.sections.map((section) => (
            <div
              key={section.label}
              className={`rounded-2xl border p-4 ${section.label === content[language].labels.draft
                ? 'border-rose-100 bg-rose-50/70 md:col-span-2'
                : 'border-slate-200 bg-slate-50/70'
                }`}
            >
              <p className="text-sm font-semibold text-slate-900">{section.label}</p>
              <div className="mt-2 space-y-2">
                {section.items.map((item) => (
                  <p key={item} className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {response.nextSteps && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">
            {content[language].labels.suggestedNext}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {response.nextSteps.map((step) => (
              <span
                key={step}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {response.prompts && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {content[language].labels.followUpQuestions}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {response.prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onPromptClick(prompt)}
                className="prompt-chip rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
