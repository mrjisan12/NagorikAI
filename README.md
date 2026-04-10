# NagorikAI

NagorikAI is a Bangladesh-focused AI public service assistant demo built for hackathon presentation. The idea is to create a single digital support point where citizens can ask about government services, understand application procedures, learn complaint submission processes, and view sample complaint drafts in a simple conversational interface.

This project is currently a frontend-only prototype built with React, Vite, and Tailwind CSS. It uses dummy data to simulate how an AI-powered citizen support platform could work in real life.

## Project Idea

Many people do not know:

- which office provides a specific public service
- what documents are required
- what the correct application process looks like
- where to complain when a utility or service problem happens
- how to write a formal complaint in a useful format

NagorikAI is designed to act like a digital public service center. Instead of forcing people to search multiple websites or visit offices without preparation, the system presents guidance in one chat-based experience.

The product idea gives priority to the needs of ordinary citizens in Bangladesh, especially people who are more comfortable using Bangla or Banglish instead of formal English.

## Core Purpose

NagorikAI is intended to help users:

- understand public service procedures
- prepare required documents before applying
- identify the correct authority for complaints
- learn the complaint process step by step
- see a ready sample complaint draft
- ask questions in Bangla, English, or Banglish

## Current Demo Scope

This prototype demonstrates a one-page AI chat interface with Bangladesh-specific public service examples.

### Supported Demo Service Flows

- Passport renewal
- NID correction
- Trade license guidance

### Supported Demo Complaint Flows

- Gas complaint
- Electricity complaint

## How the Demo Works

The current version does not connect to a real AI model or a backend service.

Instead, it works like this:

1. The user types a question in the chat box or clicks a suggested prompt.
2. The app checks the message against a local dummy knowledge base.
3. It matches service-related or complaint-related keywords.
4. It returns a structured response card inside the chat.
5. The user can click follow-up related questions to continue the conversation.

This gives a realistic product demo experience without requiring live APIs.

## Language Support

The UI supports:

- Bangla
- English
- Banglish or Roman Bangla style prompts

Examples of accepted mixed-language prompts:

- `NID correction korte ki lagbe?`
- `Gas complaint kothay korbo?`
- `Bidyut problem er complaint process`
- `Trade licence renew kivabe korbo?`

## UI Overview

The interface is designed as a clean, modern, Bangladesh-specific civic-tech chat product.

### Main UI Elements

- A branded top navbar with logo
- Bangladesh-inspired green and red accent styling
- A quick prompt panel for common public service questions
- A full conversation area for citizen support chat
- Structured AI response cards
- Clickable related question suggestions
- Bangla and English language toggle
- Animated response loading and message transitions

## Response Structure

Depending on the question, the assistant can show:

### For Service Queries

- quick summary
- required documents
- step-by-step process
- where to apply
- fee and timeline
- common mistakes

### For Complaint Queries

- responsible authority
- complaint channel
- information required
- complaint steps
- sample complaint draft

## Why This Matters

In Bangladesh, many public service challenges are not only about access but also about information clarity. Citizens often face delays, incomplete applications, or avoidable visits because they do not know the correct process in advance.

NagorikAI addresses that gap by turning public service information into a guided, conversational support experience.

This can be useful for:

- individual citizens
- service help desks
- NGO support teams
- local government support initiatives
- digital public service kiosks

## Tech Stack

- React
- Vite
- Tailwind CSS
- Plain React state for demo interaction
- Local dummy data for service and complaint responses

## Project Structure

Key files used in the current prototype:

- `src/App.jsx` - main one-page chat interface and dummy knowledge base
- `src/index.css` - global styling and base visual setup
- `src/App.css` - animations and interaction polish
- `src/main.jsx` - app entry point
- `public/logo.png` - brand logo used in the navbar

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Demo Usage Procedure

To present the prototype:

1. Open the app in the browser.
2. Show the top branding and explain that NagorikAI is a digital public service center.
3. Click a sample prompt such as passport renewal or gas complaint.
4. Show the assistant response structure.
5. Click the related follow-up questions.
6. Switch between Bangla and English.
7. Type a Banglish query to demonstrate flexible language support.
8. Explain that the current demo uses dummy data but is structured for future AI and backend integration.

## Future Scope

This prototype can later be extended with:

- real LLM integration
- retrieval from verified government service data
- complaint form generation and submission
- user profile and document checklist saving
- service-specific workflow pages
- speech input for Bangla users
- multilingual accessibility improvements
- authority directory integration

## Hackathon Positioning

NagorikAI should be presented as more than a chatbot. It is a citizen support platform concept that combines:

- government service guidance
- complaint assistance
- procedural clarity
- document readiness support
- bilingual accessibility

The long-term vision is a scalable civic-tech platform for Bangladesh.

## Note

This is a demo project and currently uses mock logic and dummy content. The responses are for prototype presentation only and should not yet be treated as verified legal or official service advice.
