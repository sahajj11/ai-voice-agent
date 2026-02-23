// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeft, Upload, User, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "../../services/supabaseClient";

// // --- CRITICAL: NO TOP-LEVEL IMPORT FOR PDFJS ---
// let pdfjsLib: any = null;

// export const dynamic = 'force-dynamic';

// export default function CreateInterview() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [loading, setLoading] = useState(false);
//   const [isParsing, setIsParsing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     resume: "",
//     instructions:"",
//   });

//   useEffect(() => {
//     const initPdf = async () => {
//       const pdfjs = await import("pdfjs-dist");
//       pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
//       pdfjsLib = pdfjs;
//     };
//     initPdf();
//   }, []);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     if (!pdfjsLib) {
//       alert("PDF library is still initializing. Please try again in a moment.");
//       return;
//     }

//     setIsParsing(true);

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         // @ts-ignore
//         const pageText = textContent.items.map((item: any) => item.str).join(" ");
//         fullText += pageText + "\n";
//       }

//       setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
//     } catch (error) {
//       console.error("PDF Parsing Error:", error);
//       alert("Failed to parse PDF. You can paste the text manually below.");
//     } finally {
//       setIsParsing(false);
//     }
//   };

//   const handleStart = async () => {
//     if (!formData.name || !formData.resume) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase
//         .from("interviews")
//         .insert([{
//             candidate_name: formData.name,
//             resume_text: formData.resume,
//             special_instructions: formData.instructions
//         }])
//         .select();

//       if (error) throw error;
//       router.push(`/interview/${data[0].id}`);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to save. Check your connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 p-6 lg:p-12 flex flex-col items-center justify-center">
//       <div className="w-full max-w-6xl">
//         <div className="mb-8">
//           <button 
//             onClick={() => router.back()} 
//             className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 text-sm cursor-pointer font-medium"
//           >
//             <ChevronLeft className="size-4" /> Back to Dashboard
//           </button>
//         </div>

//         <main className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
//           <div className="lg:col-span-3 space-y-6">
//             <header>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-500 bg-clip-text text-transparent">
//                 Create New Oral Exam
//               </h1>
//               <p className="text-slate-500 mt-2 font-medium">Setup the student details and AI context.</p>
//             </header>

//             <Card className="bg-white border-slate-200 text-slate-900 shadow-xl border rounded-2xl overflow-hidden">
//               <CardContent className="pt-8 space-y-6">
//                 {/* Student Name */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-slate-600 font-semibold">Student Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3.5 size-4 text-slate-400" />
//                     <Input 
//                         id="name" 
//                         value={formData.name} 
//                         onChange={(e) => setFormData({...formData, name: e.target.value})} 
//                         placeholder="Sahaj Rajput" 
//                         className="bg-white border-slate-200 pl-10 h-11 focus:ring-[#26b2a1] focus:border-[#26b2a1] rounded-lg" 
//                     />
//                   </div>
//                 </div>

//                 {/* AI Instructions */}
//                 <div className="space-y-2">
//                   <Label htmlFor="instructions" className="text-[#0d9488] flex items-center gap-2 font-semibold">
//                     <Sparkles className="size-4" /> Custom AI Instructions
//                   </Label>
//                   <Textarea 
//                     id="instructions" 
//                     value={formData.instructions} 
//                     onChange={(e) => setFormData({...formData, instructions: e.target.value})} 
//                     placeholder="Example: Conduct a 4-question oral exam." 
//                     className="bg-white border-slate-200 min-h-[80px] focus:ring-[#26b2a1] focus:border-[#26b2a1] text-sm rounded-lg" 
//                   />
//                 </div>

//                 {/* PDF Upload */}
//                 <div className="space-y-2">
//                   <Label className="text-slate-600 font-semibold">Upload Material (PDF)</Label>
//                   <div 
//                     onClick={() => fileInputRef.current?.click()} 
//                     className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
//                         formData.resume 
//                         ? "border-[#2dd4bf] bg-[#2dd4bf]/5" 
//                         : "border-slate-200 hover:border-[#2dd4bf] hover:bg-slate-50"
//                     }`}
//                   >
//                     <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
//                     {isParsing ? (
//                         <Loader2 className="size-8 animate-spin text-[#0d9488]" />
//                     ) : formData.resume ? (
//                         <CheckCircle className="size-8 text-[#0d9488]" />
//                     ) : (
//                         <Upload className="size-8 text-slate-400" />
//                     )}
//                     <p className="text-sm font-semibold text-slate-700">
//                         {isParsing ? "Extracting Content..." : formData.resume ? "Material Parsed Successfully!" : "Click to Upload Exam PDF"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Extracted Text */}
//                 <div className="space-y-2">
//                   <Label htmlFor="resume" className="text-slate-600 font-semibold">Extracted Exam Material</Label>
//                   <div className="relative">
//                     <FileText className="absolute left-3 top-3 size-4 text-slate-400 z-10" />
//                     <Textarea 
//                         id="resume" 
//                         value={formData.resume} 
//                         onChange={(e) => setFormData({...formData, resume: e.target.value})} 
//                         placeholder="Text will appear here..." 
//                         className="bg-slate-50 border-slate-200 pl-10 focus:ring-[#26b2a1] text-xs leading-relaxed h-[180px] resize-none overflow-y-auto rounded-lg" 
//                     />
//                   </div>
//                 </div>

//                 <Button 
//                     onClick={handleStart} 
//                     className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-slate-900 font-bold h-12 rounded-xl cursor-pointer shadow-md transition-all active:scale-[0.98]" 
//                     disabled={loading || isParsing}
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : "Save & Start Oral Exam"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-2 space-y-6">
//             <Card className="bg-white border-slate-200 text-slate-900 overflow-hidden relative border shadow-lg rounded-2xl">
//               <div className="absolute top-0 right-0 p-4 opacity-10">
//                   <Sparkles className="size-20 text-[#2dd4bf]" />
//               </div>
//               <CardHeader>
//                 <CardTitle className="text-xs font-bold uppercase tracking-widest text-[#0d9488]">Process Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/20 text-[#0d9488] flex items-center justify-center shrink-0 text-xs font-bold">1</div>
//                   <p className="text-sm text-slate-600 leading-relaxed">AI parses your documents to map out core concepts and technical knowledge.</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/20 text-[#0d9488] flex items-center justify-center shrink-0 text-xs font-bold">2</div>
//                    <p className="text-sm text-slate-600 leading-relaxed">The agent builds a customized, deep-dive questioning strategy based on your material.</p>
//                  </div>
//                  <div className="flex gap-4">
//                    <div className="size-8 rounded-full bg-[#2dd4bf]/20 text-[#0d9488] flex items-center justify-center shrink-0 text-xs font-bold">3</div>
//                    <p className="text-sm text-slate-600 leading-relaxed">Initialize a real-time voice call with the AI examiner instantly.</p>
//                  </div>
//               </CardContent>
//             </Card>

//             <div className="p-8 border border-dashed border-slate-300 rounded-2xl bg-white flex flex-col items-center justify-center text-center space-y-4">
//                 <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center shadow-sm">
//                   <FileText className="size-5 text-slate-400" />
//                 </div>
//                <div>
//                  <p className="text-sm font-bold text-slate-800">Auto-Parsing Enabled</p>
//                   <p className="text-xs text-slate-500 max-w-[180px] mx-auto mt-1">We use browser-based OCR to extract text safely from your PDF.</p>
//                 </div>
//            </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, User, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../../services/supabaseClient";

// --- CRITICAL: NO TOP-LEVEL IMPORT FOR PDFJS ---
let pdfjsLib: any = null;

export const dynamic = 'force-dynamic';

export default function CreateInterview() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    resume: "",
    instructions:"",
  });

  useEffect(() => {
    const initPdf = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      pdfjsLib = pdfjs;
    };
    initPdf();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    if (!pdfjsLib) {
      alert("PDF library is still initializing. Please try again in a moment.");
      return;
    }

    setIsParsing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // @ts-ignore
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
    } catch (error) {
      console.error("PDF Parsing Error:", error);
      alert("Failed to parse PDF. You can paste the text manually below.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleStart = async () => {
    if (!formData.name || !formData.resume) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("interviews")
        .insert([{
            candidate_name: formData.name,
            resume_text: formData.resume,
            special_instructions: formData.instructions
        }])
        .select();

      if (error) throw error;
      router.push(`/interview/${data[0].id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 lg:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <button 
            onClick={() => router.back()} 
            className="text-zinc-500 hover:text-[#2dd4bf] transition-colors flex items-center gap-2 text-sm cursor-pointer font-medium"
          >
            <ChevronLeft className="size-4" /> Back to Dashboard
          </button>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-6">
            <header>
              <h1 className="text-3xl font-bold text-white bg-clip-text ">
                Create New Oral Exam
              </h1>
              <p className="text-white mt-2 font-medium">Setup the student details and AI context.</p>
            </header>

            <Card className="bg-[#121214] border-zinc-800 text-white shadow-2xl border rounded-2xl overflow-hidden">
              <CardContent className="pt-8 space-y-6">
                {/* Student Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-400 font-semibold">Student Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 size-4 text-zinc-500" />
                    <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="Sahaj Rajput" 
                        className="bg-zinc-900/50 border-zinc-800 pl-10 h-11 focus:ring-[#2dd4bf] focus:border-[#2dd4bf] rounded-lg text-white placeholder:text-zinc-600" 
                    />
                  </div>
                </div>

                {/* AI Instructions */}
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-white flex items-center gap-2 font-semibold">
                    <Sparkles className="size-4" /> Custom AI Instructions
                  </Label>
                  <Textarea 
                    id="instructions" 
                    value={formData.instructions} 
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})} 
                    placeholder="Example: Conduct a 4-question oral exam." 
                    className="bg-zinc-900/50 border-zinc-800 min-h-[80px] focus:ring-[#2dd4bf] focus:border-[#2dd4bf] text-sm rounded-lg text-white placeholder:text-zinc-600" 
                  />
                </div>

                {/* PDF Upload */}
                <div className="space-y-2">
                  <Label className="text-zinc-400 font-semibold">Upload Material (PDF)</Label>
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                        formData.resume 
                        ? "border-[#2dd4bf] bg-[#2dd4bf]/5" 
                        : "border-zinc-800 bg-zinc-900/30 hover:border-[#2dd4bf] hover:bg-zinc-900/50"
                    }`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
                    {isParsing ? (
                        <Loader2 className="size-8 animate-spin text-[#2dd4bf]" />
                    ) : formData.resume ? (
                        <CheckCircle className="size-8 text-[#2dd4bf]" />
                    ) : (
                        <Upload className="size-8 text-zinc-600" />
                    )}
                    <p className="text-sm font-semibold text-zinc-300">
                        {isParsing ? "Extracting Content..." : formData.resume ? "Material Parsed Successfully!" : "Click to Upload Exam PDF"}
                    </p>
                  </div>
                </div>

                {/* Extracted Text */}
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-zinc-400 font-semibold">Extracted Exam Material</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 size-4 text-zinc-500 z-10" />
                    <Textarea 
                        id="resume" 
                        value={formData.resume} 
                        onChange={(e) => setFormData({...formData, resume: e.target.value})} 
                        placeholder="Text will appear here..." 
                        className="bg-zinc-900/80 border-zinc-800 pl-10 focus:ring-[#2dd4bf] text-xs leading-relaxed h-[180px] resize-none overflow-y-auto rounded-lg text-zinc-300 placeholder:text-zinc-600" 
                    />
                  </div>
                </div>

                <Button 
                    onClick={handleStart} 
                    className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-xl cursor-pointer shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all active:scale-[0.98]" 
                    disabled={loading || isParsing}
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Save & Start Oral Exam"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#121214] border-zinc-800 text-white overflow-hidden relative border shadow-xl rounded-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Sparkles className="size-20 text-[#2dd4bf]" />
              </div>
              <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">Process Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold border border-[#2dd4bf]/20">1</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">AI parses your documents to map out core concepts and technical knowledge.</p>
                </div>
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold border border-[#2dd4bf]/20">2</div>
                   <p className="text-sm text-zinc-400 leading-relaxed">The agent builds a customized, deep-dive questioning strategy based on your material.</p>
                 </div>
                 <div className="flex gap-4">
                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold border border-[#2dd4bf]/20">3</div>
                   <p className="text-sm text-zinc-400 leading-relaxed">Initialize a real-time voice call with the AI examiner instantly.</p>
                 </div>
              </CardContent>
            </Card>

            <div className="p-8 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="size-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-sm">
                  <FileText className="size-5 text-zinc-500" />
                </div>
               <div>
                 <p className="text-sm font-bold text-zinc-200">Auto-Parsing Enabled</p>
                  <p className="text-xs text-zinc-500 max-w-[180px] mx-auto mt-1">We use browser-based OCR to extract text safely from your PDF.</p>
                </div>
           </div>
          </div>
        </main>
      </div>
    </div>
  );
}