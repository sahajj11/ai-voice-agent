// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2 } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "../../services/supabaseClient";

// export default function CreateInterview() {
//   const router = useRouter();
  
//   // 1. State for Form Inputs
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     resume: "",
//   });

//   // 2. Handle Form Submission
//   const handleStart = async () => {
//     // Basic Validation
//     if (!formData.name || !formData.role || !formData.resume) {
//       alert("Please fill in all fields before starting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // 3. Save to Supabase
//       const { data, error } = await supabase
//         .from("interviews")
//         .insert([
//           {
//             candidate_name: formData.name,
//             candidate_role: formData.role,
//             resume_text: formData.resume,
            
//           },
//         ])
//         .select();

//       if (error) throw error;

//       // 4. Redirect to the Live Interview page with the new ID
//       const newId = data[0].id;
//       router.push(`/interview/${newId}`);
      
//     } catch (error) {
//       console.error("Error creating interview:", error);
//       alert("Failed to create interview. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-12">
//       <div className="max-w-5xl mx-auto mb-8">
//         <Button 
//           variant="ghost" 
//           onClick={() => router.back()} 
//           className="text-zinc-400 hover:text-black cursor-pointer p-0 flex gap-2"
//         >
//           <ChevronLeft className="size-4 hover:text-black" /> Back to Dashboard
//         </Button>
//       </div>

//       <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
//         <div className="lg:col-span-3 space-y-6">
//           <header>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
//               Create New Interview
//             </h1>
//             <p className="text-zinc-400 mt-2">Setup the candidate details and AI context.</p>
//           </header>

//           <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-xl">
//             <CardContent className="pt-6 space-y-5">
//               {/* Name Input */}
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-zinc-400">Candidate Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 size-4 text-zinc-500" />
//                   <Input 
//                     id="name" 
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     placeholder="Jane Doe" 
//                     className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
//                   />
//                 </div>
//               </div>

//               {/* Role Input */}
//               <div className="space-y-2">
//                 <Label htmlFor="role" className="text-zinc-400">Target Role</Label>
//                 <div className="relative">
//                   <Briefcase className="absolute left-3 top-3 size-4 text-zinc-500" />
//                   <Input 
//                     id="role" 
//                     value={formData.role}
//                     onChange={(e) => setFormData({...formData, role: e.target.value})}
//                     placeholder="Senior Frontend Developer" 
//                     className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
//                   />
//                 </div>
//               </div>

//               {/* Resume Textarea */}
//               <div className="space-y-2">
//                 <Label htmlFor="resume" className="text-zinc-400">Paste Resume Text or Keywords</Label>
//                 <div className="relative">
//                   <FileText className="absolute left-3 top-3 size-4 text-zinc-500" />
//                   <Textarea 
//                     id="resume" 
//                     value={formData.resume}
//                     onChange={(e) => setFormData({...formData, resume: e.target.value})}
//                     placeholder="Paste the resume content here so the AI can customize questions..." 
//                     className="bg-[#1a1a1a] border-zinc-800 pl-10 min-h-[150px] focus:ring-[#2dd4bf]"
//                   />
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <Button 
//                   onClick={handleStart}
//                   className="cursor-pointer w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-lg"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <><Loader2 className="mr-2 animate-spin size-4" /> Preparing Agent...</>
//                   ) : (
//                     "Save & Initialize AI Agent"
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column (Instructions) */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-zinc-800 text-white overflow-hidden relative">
//             <div className="absolute top-0 right-0 p-4 opacity-10">
//                 <Sparkles className="size-20 text-[#2dd4bf]" />
//             </div>
//             <CardHeader>
//               <CardTitle className="text-sm font-semibold uppercase tracking-widest text-[#2dd4bf]">How it works</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex gap-4">
//                 <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">1</div>
//                 <p className="text-sm text-zinc-300 font-light leading-relaxed">AI analyzes the resume to identify key skills and experience.</p>
//               </div>
//               <div className="flex gap-4">
//                 <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">2</div>
//                 <p className="text-sm text-zinc-300 font-light leading-relaxed">Agent prepares a customized question set based on the target role.</p>
//               </div>
//               <div className="flex gap-4">
//                 <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs">3</div>
//                 <p className="text-sm text-zinc-300 font-light leading-relaxed">You can start the voice call immediately after initialization.</p>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="p-6 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
//              <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center">
//                 <Upload className="size-5 text-zinc-500" />
//              </div>
//              <div>
//                <p className="text-sm font-medium">Quick Upload</p>
//                <p className="text-xs text-zinc-500">Upload PDF resume directly (coming soon)</p>
//              </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "../../services/supabaseClient";

// // Import PDF.js
// import * as pdfjs from "pdfjs-dist";

// // Set up the worker (required for PDF.js to function)
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function CreateInterview() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [loading, setLoading] = useState(false);
//   const [isParsing, setIsParsing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     resume: "",
//   });

//   // --- NEW: Client-Side PDF Parsing Logic ---
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     setIsParsing(true);

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";

//       // Loop through each page to extract text
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item: any) => item.str).join(" ");
//         fullText += pageText + "\n";
//       }

//       setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
//     } catch (error) {
//       console.error("PDF Parsing Error:", error);
//       alert("Failed to parse PDF. Please try copying and pasting the text manually.");
//     } finally {
//       setIsParsing(false);
//     }
//   };

//   const handleStart = async () => {
//     if (!formData.name || !formData.role || !formData.resume) {
//       alert("Please fill in all fields before starting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase
//         .from("interviews")
//         .insert([
//           {
//             candidate_name: formData.name,
//             candidate_role: formData.role,
//             resume_text: formData.resume,
//           },
//         ])
//         .select();

//       if (error) throw error;

//       const newId = data[0].id;
//       router.push(`/interview/${newId}`);
      
//     } catch (error) {
//       console.error("Error creating interview:", error);
//       alert("Failed to create interview. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen  bg-[#0a0a0a] text-white p-6 lg:p-12">
//       <div className="max-w-5xl mx-auto mb-8">
//         <Button 
//           variant="ghost" 
//           onClick={() => router.back()} 
//           className="text-zinc-400 hover:text-white p-0 flex gap-2"
//         >
//           <ChevronLeft className="size-4" /> Back to Dashboard
//         </Button>
//       </div>

//       <main className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
//         <div className="lg:col-span-3 space-y-6">
//           <header>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
//               Create New Interview
//             </h1>
//             <p className="text-zinc-400 mt-2">Setup the candidate details and AI context.</p>
//           </header>

//           <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-xl">
//             <CardContent className="pt-6 space-y-5">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-zinc-400">Candidate Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 size-4 text-zinc-500" />
//                   <Input 
//                     id="name" 
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     placeholder="Sahaj Rajput" 
//                     className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="role" className="text-zinc-400">Target Role</Label>
//                 <div className="relative">
//                   <Briefcase className="absolute left-3 top-3 size-4 text-zinc-500" />
//                   <Input 
//                     id="role" 
//                     value={formData.role}
//                     onChange={(e) => setFormData({...formData, role: e.target.value})}
//                     placeholder="Full Stack Developer" 
//                     className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf]" 
//                   />
//                 </div>
//               </div>

//               {/* PDF Upload Section */}
//               <div className="space-y-2">
//                 <Label className="text-zinc-400">Upload Resume (PDF)</Label>
//                 <div 
//                   onClick={() => fileInputRef.current?.click()}
//                   className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
//                     formData.resume 
//                       ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/5" 
//                       : "border-zinc-800 hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/5"
//                   }`}
//                 >
//                   <input 
//                     type="file" 
//                     ref={fileInputRef} 
//                     onChange={handleFileUpload} 
//                     className="hidden" 
//                     accept=".pdf"
//                   />
//                   {isParsing ? (
//                     <Loader2 className="size-8 animate-spin text-[#2dd4bf]" />
//                   ) : formData.resume ? (
//                     <CheckCircle className="size-8 text-[#2dd4bf]" />
//                   ) : (
//                     <Upload className="size-8 text-zinc-500" />
//                   )}
//                   <div className="text-center">
//                     <p className="text-sm font-medium">
//                       {isParsing ? "Extracting Text..." : formData.resume ? "Resume Parsed!" : "Click to Upload PDF"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="resume" className="text-zinc-400">Extracted Resume Text</Label>
//                 <Textarea 
//                   id="resume" 
//                   value={formData.resume}
//                   onChange={(e) => setFormData({...formData, resume: e.target.value})}
//                   placeholder="The AI will use this text to ask you questions. Verify it here." 
//                   className="bg-[#1a1a1a] border-zinc-800 min-h-[150px] focus:ring-[#2dd4bf] text-xs"
//                 />
//               </div>

//               <Button 
//                 onClick={handleStart}
//                 className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12"
//                 disabled={loading || isParsing}
//               >
//                 {loading ? <Loader2 className="animate-spin" /> : "Save & Start Interview"}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }


// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "../../services/supabaseClient";

// // Import PDF.js
// import * as pdfjs from "pdfjs-dist";

// // Set up the worker (required for PDF.js to function)
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function CreateInterview() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [loading, setLoading] = useState(false);
//   const [isParsing, setIsParsing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     resume: "",
//     instructions:"",
//   });

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     setIsParsing(true);

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item: any) => item.str).join(" ");
//         fullText += pageText + "\n";
//       }

//       setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
//     } catch (error) {
//       console.error("PDF Parsing Error:", error);
//       alert("Failed to parse PDF. Please try copying and pasting the text manually.");
//     } finally {
//       setIsParsing(false);
//     }
//   };

//   const handleStart = async () => {
//     if (!formData.name  || !formData.resume) {
//       alert("Please fill in all fields before starting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase
//         .from("interviews")
//         .insert([
//           {
//             candidate_name: formData.name,
//             // candidate_role: formData.role,
//             resume_text: formData.resume,
//             special_instructions:formData.instructions
//           },
//         ])
//         .select();

//       if (error) throw error;
//       const newId = data[0].id;
//       router.push(`/interview/${newId}`);
      
//     } catch (error) {
//       console.error("Error creating interview:", error);
//       alert("Failed to create interview. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-12 flex flex-col items-center justify-center">
//       {/* Centered Container Wrapper */}
//       <div className="w-full max-w-6xl">
        
//         <div className="mb-8">
//           <button 
//             onClick={() => router.back()} 
//             className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
//           >
//             <ChevronLeft className="size-4" /> Back to Dashboard
//           </button>
//         </div>

//         {/* Main Grid Layout */}
//         <main className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
//           {/* Left Column: Form (Span 3) */}
//           <div className="lg:col-span-3 space-y-6">
//             <header>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
//                 Create New Oral Exam
//               </h1>
//               <p className="text-zinc-400 mt-2">Setup the student details and AI context.</p>
//             </header>

//             <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-2xl">
//               <CardContent className="pt-6 space-y-5">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-zinc-400">Student Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3.5 size-4 text-zinc-500" />
//                     <Input 
//                       id="name" 
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Sahaj Rajput" 
//                       className="bg-[#1a1a1a] border-zinc-800 pl-10 h-11 focus:ring-[#2dd4bf]" 
//                     />
//                   </div>
//                 </div>

//                 {/* <div className="space-y-2">
//                   <Label htmlFor="role" className="text-zinc-400">Target Role</Label>
//                   <div className="relative">
//                     <Briefcase className="absolute left-3 top-3.5 size-4 text-zinc-500" />
//                     <Input 
//                       id="role" 
//                       value={formData.role}
//                       onChange={(e) => setFormData({...formData, role: e.target.value})}
//                       placeholder="Full Stack Developer" 
//                       className="bg-[#1a1a1a] border-zinc-800 pl-10 h-11 focus:ring-[#2dd4bf]" 
//                     />
//                   </div>
//                 </div> */}

//                 <div className="space-y-2">
//   <Label htmlFor="instructions" className="text-[#2dd4bf] flex items-center gap-2">
//     <Sparkles className="size-4" /> Custom AI Instructions
//   </Label>
//   <Textarea 
//     id="instructions" 
//     value={formData.instructions}
//     onChange={(e) => setFormData({...formData, instructions: e.target.value})}
//     placeholder="Example: Conduct a 4-question oral exam." 
//     className="bg-[#1a1a1a] border-zinc-800 min-h-[80px] focus:ring-[#2dd4bf] text-sm"
//   />
// </div>

//                 <div className="space-y-2">
//                   <Label className="text-zinc-400">Upload Material (PDF)</Label>
//                   <div 
//                     onClick={() => fileInputRef.current?.click()}
//                     className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
//                       formData.resume ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/5" : "border-zinc-800 hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/5"
//                     }`}
//                   >
//                     <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
//                     {isParsing ? <Loader2 className="size-8 animate-spin text-[#2dd4bf]" /> : formData.resume ? <CheckCircle className="size-8 text-[#2dd4bf]" /> : <Upload className="size-8 text-zinc-500" />}
//                     <p className="text-sm font-medium">{isParsing ? "Extracting..." : formData.resume ? "Resume Parsed!" : "Click to Upload PDF"}</p>
//                   </div>
//                 </div>

//                 {/* <div className="space-y-2">
//                   <Label htmlFor="resume" className="text-zinc-400">Extracted Resume Text</Label>
//                   <Textarea 
//                     id="resume" 
//                     value={formData.resume}
//                     onChange={(e) => setFormData({...formData, resume: e.target.value})}
//                     className="bg-[#1a1a1a] border-zinc-800 min-h-[120px] focus:ring-[#2dd4bf] text-xs leading-relaxed"
//                   />
//                 </div> */}

//                 <div className="space-y-2">
//   <Label htmlFor="resume" className="text-zinc-400">Extracted Exam Material</Label>
//   <div className="relative">
//     <FileText className="absolute left-3 top-3 size-4 text-zinc-500 z-10" />
//     <Textarea 
//       id="resume" 
//       value={formData.resume}
//       onChange={(e) => setFormData({...formData, resume: e.target.value})}
//       placeholder="Extracted text will appear here. You can also paste manually." 
//       className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf] text-xs leading-relaxed
//                  h-[200px] resize-none overflow-y-auto 
//                  scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
//     />
//   </div>
//   <p className="text-[10px] text-zinc-500 text-right italic">Scroll to review content</p>
// </div>

//                 <Button 
//                   onClick={handleStart}
//                   className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-lg transition-transform active:scale-[0.98]"
//                   disabled={loading || isParsing}
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : "Save & Start Oral Exam"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column: Instructions (Span 2) */}
//           <div className="lg:col-span-2 space-y-6">
//             <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-zinc-800 text-white overflow-hidden relative border-none shadow-xl">
//               <div className="absolute top-0 right-0 p-4 opacity-10">
//                   <Sparkles className="size-20 text-[#2dd4bf]" />
//               </div>
//               <CardHeader>
//                 <CardTitle className="text-sm font-semibold uppercase tracking-widest text-[#2dd4bf]">How it works</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">1</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">AI parses your documents to map out core concepts and technical knowledge.</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">2</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">The agent synthesizes your parameters to build a customized, deep-dive questioning strategy.</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">3</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">You can start the voice call immediately after initialization.</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="p-8 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
//                <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-inner">
//                   <FileText className="size-5 text-zinc-500" />
//                </div>
//                <div>
//                  <p className="text-sm font-medium">Auto-Parsing Enabled</p>
//                  <p className="text-xs text-zinc-500 max-w-[180px] mx-auto">We use OCR to extract text directly from your uploaded PDF.</p>
//                </div>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
//   );
// }

// --------------

// "use client";
// import { useState, useRef, useEffect } from "react"; // Added useEffect
// import { useRouter } from "next/navigation";
// import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { supabase } from "../../services/supabaseClient";

// // Import PDF.js
// import * as pdfjs from "pdfjs-dist";

// // 1. FORCE DYNAMIC: This prevents the Vercel build error by skipping pre-rendering
// export const dynamic = 'force-dynamic';

// export default function CreateInterview() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [loading, setLoading] = useState(false);
//   const [isParsing, setIsParsing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     resume: "",
//     instructions:"",
//   });

//   // 2. SAFE WORKER INITIALIZATION: Only runs in the browser
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
//     }
//   }, []);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file || file.type !== "application/pdf") {
//       alert("Please upload a valid PDF file.");
//       return;
//     }

//     setIsParsing(true);

//     try {
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         // @ts-ignore - Ignore type error for item.str if it exists
//         const pageText = textContent.items.map((item: any) => item.str).join(" ");
//         fullText += pageText + "\n";
//       }

//       setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
//     } catch (error) {
//       console.error("PDF Parsing Error:", error);
//       alert("Failed to parse PDF. Please try copying and pasting the text manually.");
//     } finally {
//       setIsParsing(false);
//     }
//   };

//   const handleStart = async () => {
//     if (!formData.name || !formData.resume) {
//       alert("Please fill in all fields before starting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data, error } = await supabase
//         .from("interviews")
//         .insert([
//           {
//             candidate_name: formData.name,
//             resume_text: formData.resume,
//             special_instructions: formData.instructions
//           },
//         ])
//         .select();

//       if (error) throw error;
//       const newId = data[0].id;
//       router.push(`/interview/${newId}`);
      
//     } catch (error) {
//       console.error("Error creating interview:", error);
//       alert("Failed to create interview. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-12 flex flex-col items-center justify-center">
//       <div className="w-full max-w-6xl">
        
//         <div className="mb-8">
//           <button 
//             onClick={() => router.back()} 
//             className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm cursor-pointer"
//           >
//             <ChevronLeft className="size-4" /> Back to Dashboard
//           </button>
//         </div>

//         <main className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
//           <div className="lg:col-span-3 space-y-6">
//             <header>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
//                 Create New Oral Exam
//               </h1>
//               <p className="text-zinc-400 mt-2">Setup the student details and AI context.</p>
//             </header>

//             <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-2xl">
//               <CardContent className="pt-6 space-y-5">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-zinc-400">Student Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-3.5 size-4 text-zinc-500" />
//                     <Input 
//                       id="name" 
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       placeholder="Sahaj Rajput" 
//                       className="bg-[#1a1a1a] border-zinc-800 pl-10 h-11 focus:ring-[#2dd4bf]" 
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="instructions" className="text-[#2dd4bf] flex items-center gap-2">
//                     <Sparkles className="size-4" /> Custom AI Instructions
//                   </Label>
//                   <Textarea 
//                     id="instructions" 
//                     value={formData.instructions}
//                     onChange={(e) => setFormData({...formData, instructions: e.target.value})}
//                     placeholder="Example: Conduct a 4-question oral exam." 
//                     className="bg-[#1a1a1a] border-zinc-800 min-h-[80px] focus:ring-[#2dd4bf] text-sm"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label className="text-zinc-400">Upload Material (PDF)</Label>
//                   <div 
//                     onClick={() => fileInputRef.current?.click()}
//                     className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
//                       formData.resume ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/5" : "border-zinc-800 hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/5"
//                     }`}
//                   >
//                     <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
//                     {isParsing ? <Loader2 className="size-8 animate-spin text-[#2dd4bf]" /> : formData.resume ? <CheckCircle className="size-8 text-[#2dd4bf]" /> : <Upload className="size-8 text-zinc-500" />}
//                     <p className="text-sm font-medium">{isParsing ? "Extracting..." : formData.resume ? "Resume Parsed!" : "Click to Upload PDF"}</p>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="resume" className="text-zinc-400">Extracted Exam Material</Label>
//                   <div className="relative">
//                     <FileText className="absolute left-3 top-3 size-4 text-zinc-500 z-10" />
//                     <Textarea 
//                       id="resume" 
//                       value={formData.resume}
//                       onChange={(e) => setFormData({...formData, resume: e.target.value})}
//                       placeholder="Extracted text will appear here. You can also paste manually." 
//                       className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf] text-xs leading-relaxed
//                                  h-[200px] resize-none overflow-y-auto 
//                                  scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
//                     />
//                   </div>
//                   <p className="text-[10px] text-zinc-500 text-right italic">Scroll to review content</p>
//                 </div>

//                 <Button 
//                   onClick={handleStart}
//                   className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-lg transition-transform active:scale-[0.98] cursor-pointer"
//                   disabled={loading || isParsing}
//                 >
//                   {loading ? <Loader2 className="animate-spin" /> : "Save & Start Oral Exam"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="lg:col-span-2 space-y-6">
//             <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-zinc-800 text-white overflow-hidden relative border-none shadow-xl">
//               <div className="absolute top-0 right-0 p-4 opacity-10">
//                   <Sparkles className="size-20 text-[#2dd4bf]" />
//               </div>
//               <CardHeader>
//                 <CardTitle className="text-sm font-semibold uppercase tracking-widest text-[#2dd4bf]">How it works</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">1</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">AI parses your documents to map out core concepts and technical knowledge.</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">2</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">The agent builds a customized, deep-dive questioning strategy.</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">3</div>
//                   <p className="text-sm text-zinc-300 font-light leading-relaxed">You can start the voice call immediately after initialization.</p>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="p-8 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
//                <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-inner">
//                   <FileText className="size-5 text-zinc-500" />
//                </div>
//                <div>
//                  <p className="text-sm font-medium">Auto-Parsing Enabled</p>
//                  <p className="text-xs text-zinc-500 max-w-[180px] mx-auto">We use OCR to extract text directly from your uploaded PDF.</p>
//                </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




// -----------

"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, User, Briefcase, FileText, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../../services/supabaseClient";

// --- CRITICAL: NO TOP-LEVEL IMPORT FOR PDFJS ---
// We define a variable to hold the library once it's loaded in the browser
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

  // Load the library ONLY on the client side
  useEffect(() => {
    const initPdf = async () => {
      // Dynamic import prevents the "DOMMatrix" error during Vercel build
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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 lg:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm cursor-pointer">
            <ChevronLeft className="size-4" /> Back to Dashboard
          </button>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-6">
            <header>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                Create New Oral Exam
              </h1>
              <p className="text-zinc-400 mt-2">Setup the student details and AI context.</p>
            </header>

            <Card className="bg-[#141414] border-zinc-800 text-white border-none shadow-2xl">
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-400">Student Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 size-4 text-zinc-500" />
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Sahaj Rajput" className="bg-[#1a1a1a] border-zinc-800 pl-10 h-11 focus:ring-[#2dd4bf]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-[#2dd4bf] flex items-center gap-2">
                    <Sparkles className="size-4" /> Custom AI Instructions
                  </Label>
                  <Textarea id="instructions" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})} placeholder="Example: Conduct a 4-question oral exam." className="bg-[#1a1a1a] border-zinc-800 min-h-[80px] focus:ring-[#2dd4bf] text-sm" />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">Upload Material (PDF)</Label>
                  <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${formData.resume ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/5" : "border-zinc-800 hover:border-[#2dd4bf] hover:bg-[#2dd4bf]/5"}`}>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
                    {isParsing ? <Loader2 className="size-8 animate-spin text-[#2dd4bf]" /> : formData.resume ? <CheckCircle className="size-8 text-[#2dd4bf]" /> : <Upload className="size-8 text-zinc-500" />}
                    <p className="text-sm font-medium">{isParsing ? "Extracting..." : formData.resume ? "Material Parsed!" : "Click to Upload PDF"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-zinc-400">Extracted Exam Material</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 size-4 text-zinc-500 z-10" />
                    <Textarea id="resume" value={formData.resume} onChange={(e) => setFormData({...formData, resume: e.target.value})} placeholder="Text will appear here..." className="bg-[#1a1a1a] border-zinc-800 pl-10 focus:ring-[#2dd4bf] text-xs leading-relaxed h-[200px] resize-none overflow-y-auto" />
                  </div>
                </div>

                <Button onClick={handleStart} className="w-full bg-[#2dd4bf] hover:bg-[#26b2a1] text-black font-bold h-12 rounded-lg cursor-pointer" disabled={loading || isParsing}>
                  {loading ? <Loader2 className="animate-spin" /> : "Save & Start Oral Exam"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-zinc-800 text-white overflow-hidden relative border-none shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="size-20 text-[#2dd4bf]" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-widest text-[#2dd4bf]">How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">AI parses your documents to map out core concepts and technical knowledge.</p>
                </div>
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                   <p className="text-sm text-zinc-300 font-light leading-relaxed">The agent builds a customized, deep-dive questioning strategy.</p>
                 </div>
                 <div className="flex gap-4">
                   <div className="size-8 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                   <p className="text-sm text-zinc-300 font-light leading-relaxed">You can start the voice call immediately after initialization.</p>
                 </div>
              </CardContent>
            </Card>

            <div className="p-8 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
                <div className="size-12 rounded-full bg-zinc-900 flex items-center justify-center shadow-inner">
                  <FileText className="size-5 text-zinc-500" />
             </div>
               <div>
                 <p className="text-sm font-medium">Auto-Parsing Enabled</p>
                 <p className="text-xs text-zinc-500 max-w-[180px] mx-auto">We use OCR to extract text directly from your uploaded PDF.</p>
                </div>
           </div>

            
          </div>

          
        </main>
      </div>
    </div>
  );
}