export default function Methodology() {
  const steps = [
    { label: "01", title: "Upload Syllabus", text: "Upload any PDF. Our system extracts core concepts locally for privacy." },
    { label: "02", title: "AI Synthesis", text: "The agent generates a specialized probing persona based on your material." },
    { label: "03", title: "Live Viva", text: "Engage in a real-time, voice-first exam room with instant feedback." }
  ];

  return (
    <section id="methodology" className="py-24 bg-zinc-950/50 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <span className="text-6xl font-black text-zinc-900 absolute -top-10 -left-4 select-none">
                {s.label}
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{s.title}</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}