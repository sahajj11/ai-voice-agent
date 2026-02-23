import Link from 'next/link';
import { UserCircle } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; //

export default function DashboardNavbar() {
  return (
    <>
    <nav className="fixed  top-0 left-0 right-0 w-full z-50 h-20 border-b border-white/5 bg-[#09090b]/60 backdrop-blur-xl">
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

    
        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            {/* Swapped SignInButton for a direct Link to our /login page */}
           
            
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-[#2dd4bf] hover:text-black transition-all shadow-lg active:scale-95"
            >
              Sign In / Sign Up
            </Link>
          </SignedOut>
          
          <SignedIn>
           
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

      </div>
    </nav>

    <div className="h-20 w-full" />

    </>
    
  );
}