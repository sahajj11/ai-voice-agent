import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.message?.type === 'end-of-call-report') {
    const { summary, analysis, assistantOverrides } = body.message;
    const interviewId = assistantOverrides.variableValues.id; // Passing ID is important

    await supabase
      .from('interviews')
      .update({
        testimonial_summary: summary, // Vapi generates this automatically!
        overall_score: analysis?.structuredData?.score || 0,
        status: 'completed'
      })
      .eq('id', interviewId);
  }
  return NextResponse.json({ ok: true });
}