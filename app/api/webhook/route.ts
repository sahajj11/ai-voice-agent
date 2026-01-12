import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.message?.type === 'end-of-call-report') {
      const { summary, analysis, assistantOverrides, artifact } = body.message;
      const interviewId = assistantOverrides?.variableValues?.id;

      // Extracting the transcript data
      // artifact.transcript is a giant string
      // artifact.messages is an array of objects [{role, message, time}, ...]
      const fullTranscript = artifact?.transcript || "";
      const transcriptJson = artifact?.messages || [];

      if (interviewId) {
        const { error } = await supabase
          .from('interviews')
          .update({
            testimonial_summary: summary,
            overall_score: analysis?.structuredData?.score || 0,
            transcript: fullTranscript, // Saves the whole text block
            transcript_json: transcriptJson, // Saves the array for a chat-bubble UI
            status: 'completed'
          })
          .eq('id', interviewId);

        if (error) {
          console.error("Supabase update error:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}