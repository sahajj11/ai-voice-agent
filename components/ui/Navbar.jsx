import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 h-20 border-b border-white/5 bg-[#09090b]/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-9 bg-[#2dd4bf] rounded-xl flex items-center justify-center font-black text-black text-xs shadow-[0_0_20px_rgba(45,212,191,0.3)] group-hover:scale-105 transition-transform">
            AO
          </div>
          <span className="text-white font-bold tracking-tighter text-2xl">
            AI-ORALS
          </span>
        </Link>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-wide text-zinc-400">
          <Link href="#features" className="hover:text-[#2dd4bf] transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#2dd4bf] transition-all group-hover:w-full" />
          </Link>
          <Link href="#methodology" className="hover:text-[#2dd4bf] transition-colors relative group">
            Methodology
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#2dd4bf] transition-all group-hover:w-full" />
          </Link>
          <Link href="#pricing" className="hover:text-[#2dd4bf] transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#2dd4bf] transition-all group-hover:w-full" />
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors px-4 py-2"
          >
            <UserCircle className="size-4" />
            Log in
          </Link>
          
          <Link 
            href="/signup" 
            className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-[#2dd4bf] hover:text-black transition-all shadow-lg active:scale-95"
          >
            Sign up free
          </Link>
        </div>

      </div>
    </nav>
  );
}