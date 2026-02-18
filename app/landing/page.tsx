import Navbar from "../../components/ui/Navbar"
import Hero from "@/components/ui/Hero";
import Footer from "../../components/ui/Footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b]">
      {/* 1. The Header */}
      <Navbar />

      {/* 2. The Main Content */}
      <main className="flex-grow">
        {/* The Hero usually takes up the full viewport height */}
        <Hero />
        
        {/* Features section added below to explain the "Probing" logic */}
        {/* <section className="py-20">
          <Features />
        </section> */}
      </main>

      {/* 3. The Footer */}
      <Footer />
    </div>
  );
}