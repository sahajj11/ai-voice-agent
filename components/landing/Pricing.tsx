import { Check } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      desc: "Perfect for a quick practice before your viva.",
      features: ["2 AI-Vivas per month", "Basic PDF parsing", "Standard feedback", "Sub-1s latency"],
      button: "Get Started",
      featured: false,
    },
    {
      name: "Pro",
      price: "$12",
      desc: "Comprehensive prep for serious students.",
      features: ["Unlimited AI-Vivas", "Deep Probing Logic", "Detailed transcripts", "Sub-500ms latency", "Priority Support"],
      button: "Unlock Pro",
      featured: true, // Highlights this card
    },
    {
      name: "Campus",
      price: "Custom",
      desc: "For institutions and batch assessments.",
      features: ["Bulk student licensing", "Departmental dashboards", "Proctored exam mode", "API Access"],
      button: "Contact Sales",
      featured: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent <span className="text-[#2dd4bf]">Pricing</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Choose the plan that fits your preparation needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                tier.featured 
                ? 'bg-zinc-900 border-[#2dd4bf] shadow-[0_0_30px_rgba(45,212,191,0.1)] scale-105 z-10' 
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2dd4bf] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="text-zinc-400 font-medium mb-2 uppercase tracking-widest text-sm">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-zinc-500">/mo</span>}
                </div>
                <p className="mt-4 text-zinc-500 text-sm leading-relaxed">{tier.desc}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="size-5 text-[#2dd4bf] shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                tier.featured 
                ? 'bg-[#2dd4bf] text-black hover:bg-[#26b3a2] shadow-lg' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
              }`}>
                {tier.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}