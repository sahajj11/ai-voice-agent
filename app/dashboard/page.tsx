/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react"; // 1. Added Hooks
import { Mic, Search, Share2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient"; // 2. Adjust path to your client
import Navbar from "@/components/ui/Navbar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";

export default function Dashboard() {
  const router = useRouter();
  
  // 3. State for real data
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 4. Fetch from Supabase on load
  useEffect(() => {
    const fetchInterviews = async () => {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .order("created_at", { ascending: false }); // Latest interviews first

      if (data) setInterviews(data);
      setLoading(false);
    };

    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-28">
      {/* Header stays the same... */}

      <DashboardNavbar />
    

      <main className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Card: Start Interview */}
        <Card className="bg-[#141414] border-none text-white shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">Mark Zuck</h2>
                <p className="text-zinc-400 text-sm">AI Teacher</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#2dd4bf]/20 animate-ping" />
              <div className="size-40 rounded-full border-2 border-[#2dd4bf] flex items-center justify-center bg-[#1a1a1a]">
                <Mic className="size-16 text-[#2dd4bf]" />
              </div>
            </div>
            <h3 className="text-xl font-medium">Conduct New Oral Exam</h3>
            <Button 
              onClick={() => router.push('/create')}
              className="cursor-pointer bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-semibold px-8 rounded-full flex gap-2"
            >
              <Mic className="size-4" /> Start Now
            </Button>
          </CardContent>
        </Card>

        {/* Right Card: Dynamic Completed Interviews */}
        <Card className="bg-[#141414] border-none text-white shadow-2xl">
          <CardHeader>
            <CardTitle>Completed Oral Exams</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input 
                placeholder="Search students..." 
                className="w-full bg-[#1a1a1a] border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#2dd4bf] outline-none text-white"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {loading ? (
                   <p className="text-zinc-500 text-center py-10">Loading candidates...</p>
                ) : interviews.length === 0 ? (
                   <p className="text-zinc-500 text-center py-10">No interviews found.</p>
                ) : (
                  interviews.map((interview) => (
                    <div 
                      key={interview.id} 
                      onClick={() => router.push(`/testimonial/${interview.id}`)}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-[#1f1f1f] transition-all cursor-pointer group border border-transparent hover:border-zinc-800"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                           <AvatarFallback className="bg-zinc-800 text-xs text-[#2dd4bf]">
                             {interview.candidate_name?.charAt(0)}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{interview.candidate_name}</p>
                          <p className="text-xs text-zinc-500">{interview.candidate_role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <Badge className="bg-[#2dd4bf]/10 text-[#2dd4bf] border-none px-2 py-0.5">
                           {interview.overall_score || "N/A"} / 5
                         </Badge>
                         <ExternalLink className="size-4 text-zinc-600 group-hover:text-[#2dd4bf] transition-colors" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}