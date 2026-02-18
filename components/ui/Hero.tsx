import React from 'react';
import { ArrowRight, Play, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Dynamic Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2dd4bf]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#2dd4bf]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm mb-8 animate-fade-in">
          <ShieldCheck className="size-4 text-[#2dd4bf]" />
          <span>Trusted by Final Year Students for Viva Prep</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          The AI Examiner That <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-emerald-400">
            Actually Probes.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
          Upload your PDF syllabus and experience a sub-500ms latency voice interview. 
          AI-ORALS identifies your knowledge gaps and prepares you for the toughest academic vivas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 bg-[#2dd4bf] text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Start Your First Exam <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <Play className="size-4 fill-current" />
            Watch it in Action
          </button>
        </div>

        {/* Hero Visual Mockup */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2 backdrop-blur-sm">
             <div className="rounded-xl border border-zinc-800 bg-[#09090b] aspect-video flex items-center justify-center">
                <p className="text-zinc-600 font-mono text-sm">[ Vapi Voice Interface Interface Preview ]</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}