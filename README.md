# 🎙️ AI-Hire: Voice-Powered AI Interviewer

AI-Hire is a full-stack platform that automates the initial screening process using Voice AI. It conducts real-time technical interviews, analyzes candidate responses, and generates automated testimonials and scores using a custom Webhook architecture.

## 🚀 Features

- **Real-time Voice Interviews:** Integrated with **Vapi.ai** for natural, low-latency voice conversations.
- **Context-Aware AI:** The AI recruiter "reads" the candidate's resume (stored in Supabase) to ask relevant technical questions.
- **Automated Evaluation:** Uses AI to generate a testimonial summary and a technical score (1-5) based on the conversation.
- **Live Transcripts:** Capture word-for-word transcripts of every session.
- **Candidate Dashboard:** A sleek, dark-themed UI to manage and review completed interviews.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Lucide React, Shadcn UI
- **Backend:** Next.js API Routes (Serverless Functions)
- **Database:** Supabase (PostgreSQL)
- **Voice AI:** Vapi.ai (using GPT-4o)
- **Tunneling:** Ngrok (for local webhook testing)

## 🏗️ Architecture Flow

1. **Setup:** Candidate info and resume text are saved to **Supabase**.
2. **The Call:** The Next.js frontend triggers a Vapi call, passing the Supabase `ID` as a variable.
3. **The Webhook:** Upon hanging up, Vapi sends an `end-of-call-report` to the `/api/webhook` route.
4. **Data Sync:** The webhook extracts the AI summary and transcript, updating the corresponding row in Supabase via the unique `ID`.
