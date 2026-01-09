"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../../services/supabaseClient";

export default function CreateInterview() {
  const router = useRouter();
  
  // 1. State for Form Inputs
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    resume: "",
  });

  // 2. Handle Form Submission
  const handleStart = async () => {
    // Basic Validation
    if (!formData.name || !formData.role || !formData.resume) {
      alert("Please fill in all fields before starting.");
      return;
    }

    setLoading(true);

    try {
      // 3. Save to Supabase
      const { data, error } = await supabase
        .from("interviews")
        .insert([
          {
            candidate_name: formData.name,
            candidate_role: formData.role,
            resume_text: formData.resume,
            
          },
        ])
        .select();

      if (error) throw error;

      // 4. Redirect to the Live Interview page with the new ID
      const newId = data[0].id;
      router.push(`/interview/${newId}`);
      
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("Failed to create interview. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()} 
          className="text-zinc-400 hover:text-white p-0 flex gap-2"
        >
          <ChevronLeft className="size-4" /> Back to Dashboard
        </Button>
      </div>

      <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <header>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Create New Interview
            </h1>
            <p className="text-zinc-400 mt-2">Setup the candidate details and AI context.</p>
          </header>

          <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-xl">
            <CardContent className="pt-6 space-y-5">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400">Candidate Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-zinc-500" />
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jane Doe" 
                    className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
                  />
                </div>
              </div>

              {/* Role Input */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-zinc-400">Target Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 size-4 text-zinc-500" />
                  <Input 
                    id="role" 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    placeholder="Senior Frontend Developer" 
                    className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
                  />
                </div>
              </div>

              {/* Resume Textarea */}
              <div className="space-y-2">
                <Label htmlFor="resume" className="text-zinc-400">Paste Resume Text or Keywords</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 size-4 text-zinc-500" />
                  <Textarea 
                    id="resume" 
                    value={formData.resume}
                    onChange={(e) => setFormData({...formData, resume: e.target.value})}
                    placeholder="Paste the resume content here so the AI can customize questions..." 
                    className="bg-[#1a1a1a] border-zinc-800 pl-10 min-h-[150px] focus:ring-[#2dd4bf]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleStart}
                  className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 animate-spin size-4" /> Preparing Agent...</>
                  ) : (
                    "Save & Initialize AI Agent"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Instructions) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-zinc-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="size-20 text-[#2dd4bf]" />
            </div>
            <CardHeader>
              <CardTitle className="text-sm font-semibold uppercase tracking-widest text-[#2dd4bf]">How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">1</div>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">AI analyzes the resume to identify key skills and experience.</p>
              </div>
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">2</div>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">Agent prepares a customized question set based on the target role.</p>
              </div>
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">3</div>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">You can start the voice call immediately after initialization.</p>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
             <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center">
                <Upload className="size-5 text-zinc-500" />
             </div>
             <div>
               <p className="text-sm font-medium">Quick Upload</p>
               <p className="text-xs text-zinc-500">Upload PDF resume directly (coming soon)</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}