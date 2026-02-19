import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/ui/Hero";
import Features from "@/components/landing/Features";
import Methodology from "@/components/landing/Methodology";
import Pricing from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      {/* 1. The Header */}
      <Navbar />

      {/* 2. The Main Content */}
      <main className="flex-grow pt-20">
        {/* The Hero usually takes up the full viewport height */}
        <Hero />
        
        {/* Features section added below to explain the "Probing" logic */}
        <section className="py-20">
          <Features />
        </section>

        <section className="py-20">
          <Methodology />
        </section>

        <section className="py-20">
          <Pricing />
        </section>
      </main>

      {/* 3. The Footer */}
      <Footer />
    </div>
  );
}