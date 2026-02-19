import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
      {/* Optional: Add your AO Logo above the card for branding */}
      <div className="absolute top-10 flex items-center gap-2">
         <div className="size-8 bg-[#2dd4bf] rounded-lg flex items-center justify-center font-bold text-black text-sm">AO</div>
         <span className="text-white font-bold tracking-tight text-xl">AI-ORALS</span>
      </div>
      
      <SignIn 
        appearance={{
          elements: {
            footerAction: "hidden", // Removes the "Don't have an account?" to keep it clean
          }
        }}
      />
    </div>
  );
}