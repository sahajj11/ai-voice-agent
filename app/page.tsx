"use client";
import { Mic, Search, Share2 } from "lucide-react"; // Removed unused imports for brevity
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// 1. Import useRouter
import { useRouter } from "next/navigation";

const COMPLETED_INTERVIEWS = [
  { id: 1, name: "Jared Bluss", role: "AI Engineer", score: "4.5" },
  { id: 2, name: "Tarentino Kentes", role: "AI Engineer", score: "4.2" },
  { id: 3, name: "Tommiet Finnss", role: "AI Engineer", score: "3.8" },
];

export default function Dashboard() {
  // 2. Initialize the router
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2dd4bf] rounded-full flex items-center justify-center">
             <Mic className="size-4 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI-HIRE</h1>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon"><Search className="size-5" /></Button>
           <Avatar className="size-8"><AvatarImage src="/pfp.png" /></Avatar>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="bg-[#141414] border-none text-white shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">Mark Zuck</h2>
                <p className="text-zinc-400 text-sm">Senior AI Engineer</p>
              </div>
              <Button variant="ghost" size="icon" className="text-zinc-400">...</Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#2dd4bf]/20 animate-ping" />
              <div className="size-40 rounded-full border-2 border-[#2dd4bf] flex items-center justify-center bg-[#1a1a1a]">
                <Mic className="size-16 text-[#2dd4bf]" />
              </div>
            </div>
            <h3 className="text-xl font-medium">Take Interview</h3>
            
            {/* 3. Add the onClick handler */}
            <Button 
              onClick={() => router.push('/create')}
              className="bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-semibold px-8 rounded-full flex gap-2"
            >
              <Mic className="size-4" /> Take Interview
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#141414] border-none text-white shadow-2xl">
          <CardHeader>
            <CardTitle>Completed Interviews</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input 
                placeholder="Search candidates..." 
                className="w-full bg-[#1a1a1a] border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#2dd4bf] outline-none"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {COMPLETED_INTERVIEWS.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback className="bg-zinc-800 text-xs">AI</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium text-sm">{interview.name}</p>
                        <p className="text-xs text-zinc-500">{interview.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <Badge variant="secondary" className="bg-[#2dd4bf]/10 text-[#2dd4bf] border-none">{interview.score}/5.0</Badge>
                       <div className="w-4 h-4 border border-zinc-700 rounded-sm group-hover:border-[#2dd4bf]" />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="border-[#2dd4bf] text-[#2dd4bf] hover:bg-[#2dd4bf]/10 rounded-full flex gap-2">
                <Share2 className="size-4" /> Share to LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}