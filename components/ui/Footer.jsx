import React from 'react';
import { Github, Linkedin, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 bg-[#09090b] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-[#2dd4bf] rounded-lg flex items-center justify-center font-bold text-black text-xs">
                AO
              </div>
              <span className="text-white font-bold text-xl tracking-tight">AI-ORALS</span>
            </div>
            <p className="text-zinc-500 max-w-xs leading-relaxed">
              Automating academic excellence through low-latency voice AI and intelligent syllabus parsing. Built for the next generation of students.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-[#2dd4bf] transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-[#2dd4bf] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#2dd4bf] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/sahajj11" target="_blank" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-[#2dd4bf] transition-all">
                <Github className="size-5" />
              </a>
              <a href="#" target="_blank" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-[#2dd4bf] transition-all">
                <Linkedin className="size-5" />
              </a>
              <a href="#" target="_blank" className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-[#2dd4bf] transition-all">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© {currentYear} Sahaj Rajput. All rights reserved.</p>
          <div className="flex gap-8">
            <p>Built with Next.js & Vapi</p>
            <p>Designed in Vadodara, IN</p>
          </div>
        </div>
      </div>
    </footer>
  );
}