import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
      {/* Brand Identity Header */}
      <div className="absolute top-10 flex items-center gap-2">
         <div className="size-8 bg-[#2dd4bf] rounded-lg flex items-center justify-center font-bold text-black text-sm">AO</div>
         <span className="text-white font-bold tracking-tight text-xl">AI-ORALS</span>
      </div>
      
      <SignUp 
        appearance={{
          elements: {
            footerAction: "hidden", // Matches your login page style
          }
        }}
      />
    </div>
  );
}