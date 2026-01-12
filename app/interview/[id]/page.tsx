"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { supabase } from "../../../services/supabaseClient";
import { Mic, MicOff, ChevronLeft, Loader2, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function InterviewRoom() {
  const { id } = useParams();
  const router = useRouter();

  // We use a Ref for vapi to ensure we don't create multiple instances on re-renders
  const vapiRef = useRef<any>(null);

  // States
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  // Initialize Vapi and Fetch Data
  useEffect(() => {
    // 1. Initialize Vapi Instance
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (publicKey && !vapiRef.current) {
      vapiRef.current = new Vapi(publicKey);
    }

    const fetchCandidate = async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setCandidate(data);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();

    // 2. Setup Vapi Event Listeners
    const vapi = vapiRef.current;
    if (vapi) {
      vapi.on("call-start", () => setIsCalling(true));
      vapi.on("call-end", () => setIsCalling(false));
      vapi.on("speech-start", () => setAssistantIsSpeaking(true));
      vapi.on("speech-end", () => setAssistantIsSpeaking(false));
      vapi.on("error", (e: any) => console.error("Vapi Error:", e));
    }

    // Cleanup listeners on unmount
    return () => {
      if (vapi) vapi.removeAllListeners();
    };
  }, [id]);

  // Start/End Call Logic
  // const handleCall = () => {
  //   const vapi = vapiRef.current;
  //   const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  //   if (!vapi) {
  //     console.error("Vapi not initialized");
  //     return;
  //   }

  //   if (isCalling) {
  //     vapi.stop();
  //   } else {
  //     if (!assistantId) {
  //       console.error("Assistant ID is missing in environment variables");
  //       return;
  //     }

  //     // vapi.start requires the Assistant ID and an optional config object
  //     vapi.start(assistantId, {
  //       assistantOverrides: {
  //         variableValues: {
  //           // Using logical OR (||) to ensure we never send 'undefined' to Vapi
  //           candidate_name: candidate?.candidate_name || "Candidate",
  //           candidate_role: candidate?.candidate_role || "Applicant",
  //           resume_text: candidate?.resume_text || "No resume provided.",
  //         },
  //       },
  //     });
  //   }
  // };

  const handleCall = () => {
  const vapi = vapiRef.current;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  // DEBUG LOGS - Check your console for these!
  console.log("--- VAPI DEBUG START ---");
  console.log("Assistant ID:", assistantId);
  console.log("Candidate Data:", candidate);
  console.log("Values being sent:", {
    name: candidate?.candidate_name,
    role: candidate?.candidate_role,
    resume: candidate?.resume_text?.substring(0, 50) + "..." // Log just the start
  });

  if (!vapi) return console.error("Vapi Ref is null");

  if (isCalling) {
    vapi.stop();
  } else {
    // Safety check: If candidate is null, Vapi will throw a 400
    if (!candidate) {
      alert("Wait for candidate data to load before starting!");
      return;
    }

    vapi.start(assistantId, {
      
        variableValues: {
          // We use String() to FORCE these to be strings, never undefined/null
          id: String(id),
          candidate_name: String(candidate?.candidate_name || "Candidate"),
          candidate_role: String(candidate?.candidate_role || "Applicant"),
          resume_text: String(candidate?.resume_text || "No resume provided"),
        },
      
    });
  }
};

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#2dd4bf] size-10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8 cursor-pointer text-zinc-400 hover:text-black transition-colors">
          <ChevronLeft className="mr-2  size-4" /> Cancel Oral Exam
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Candidate Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-[#141414] border-none text-white">
              <CardContent className="pt-6">
                <div className="size-20 rounded-full bg-[#2dd4bf]/10 flex items-center justify-center mb-4">
                  <User className="text-[#2dd4bf] size-10" />
                </div>
                <h2 className="text-xl font-bold">{candidate?.candidate_name || "Unknown Candidate"}</h2>
                {/* <div className="flex items-center gap-2 text-zinc-400 text-sm mt-1">
                  <Briefcase className="size-3" /> {candidate?.candidate_role || "Role not specified"}
                </div> */}
              </CardContent>
            </Card>
            
            <div className="p-4 rounded-xl border border-dashed border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-2">Oral Exam Context</p>
              <p className="text-xs text-zinc-400 line-clamp-6 leading-relaxed">
                {candidate?.resume_text || "No resume context available."}
              </p>
              <p></p>
            </div>
          </div>

          {/* Right: The Actual Interview Controller */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-12 bg-[#141414] rounded-3xl border border-zinc-800/50 relative overflow-hidden">
            {/* Visualizer Effect */}
            <div className="relative flex items-center justify-center mb-12">
              <div className={`absolute inset-0 rounded-full bg-[#2dd4bf]/20 transition-all duration-500 ${assistantIsSpeaking ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`} />
              <div className={`size-48 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isCalling ? 'border-[#2dd4bf] shadow-[0_0_50px_rgba(45,212,191,0.2)]' : 'border-zinc-800'}`}>
                <Mic className={`size-20 transition-colors ${isCalling ? 'text-[#2dd4bf]' : 'text-zinc-700'}`} />
              </div>
            </div>

            <div className="text-center space-y-2 mb-8 px-6">
              <h3 className="text-2xl font-semibold italic">
                {isCalling ? (assistantIsSpeaking ? "AI is speaking..." : "Listening...") : "Ready to Start"}
              </h3>
              <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                {isCalling ? "The AI is conducting the interview based on the provided resume." : "Ensure your microphone is working before starting the call."}
              </p>
            </div>

            <Button 
              onClick={handleCall}
              className={`h-16 px-12 cursor-pointer rounded-full text-lg font-bold transition-all ${isCalling ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#2dd4bf] hover:bg-[#26b2a1] text-black'}`}
            >
              {isCalling ? <><MicOff className="mr-2 " /> End Interview</> : "Start Oral Exam"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}