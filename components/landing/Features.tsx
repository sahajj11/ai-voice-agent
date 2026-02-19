import { Mic, Brain, Shield, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Adaptive Depth Scaling",
      desc: "Our AI doesn't just ask questions; it probes. If an answer lacks depth, the agent asks targeted follow-ups to test true mastery.",
      icon: <Brain className="text-[#2dd4bf]" />,
      className: "md:col-span-2 bg-zinc-900/50"
    },
    {
      title: "Sub-500ms Latency",
      desc: "Built on Vapi's low-latency orchestration for a natural, human-like conversation flow.",
      icon: <Zap className="text-[#2dd4bf]" />,
      className: "bg-zinc-900/50"
    },
    {
      title: "Anti-Hallucination Guardrails",
      desc: "Strictly bounded by your uploaded PDF. The AI examiner stays on-topic and factual.",
      icon: <Shield className="text-[#2dd4bf]" />,
      className: "bg-zinc-900/50"
    },
    {
      title: "Context-Aware Scoring",
      desc: "Receive a full transcript and a rubric-based score immediately after the viva ends.",
      icon: <Mic className="text-[#2dd4bf]" />,
      className: "md:col-span-2 bg-zinc-900/50"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">
        Engineered for <span className="text-[#2dd4bf]">Academic Rigor</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div key={i} className={`p-8 rounded-3xl border border-zinc-800 hover:border-[#2dd4bf]/50 transition-all group ${f.className}`}>
            <div className="size-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
            <p className="text-zinc-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}