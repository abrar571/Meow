
import React from 'react';
import { Play, TrendingUp, Cpu, Smartphone, Users, ChevronRight, Check, FileText, Coins, ArrowRight, BrainCircuit, ShoppingBag, GraduationCap, BarChart3, CreditCard, Music, Zap } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      
      {/* 1. Life Immersed / Categories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Life immersed in work, play and <br />
            everything in between
          </h2>
        </div>
        
        {/* Specific Category Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center px-4 max-w-6xl mx-auto">
          {/* PREPRYZE CARD */}
          <div 
            onClick={() => onNavigate('prep')}
            className="flex-1 min-h-[320px] rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-pink-500/50 transition-all hover:scale-105"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-pink-900 to-purple-900 opacity-80"></div>
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-110 transition duration-700"></div>
             
             <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <BrainCircuit className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">PREPRYZE</h3>
                <p className="text-pink-200 font-medium text-sm">Test taking center</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                   Start Practicing <ArrowRight className="w-4 h-4" />
                </div>
             </div>
          </div>

          {/* XPLORYZE CARD */}
          <div 
            onClick={() => onNavigate('subscriptions')}
            className="flex-1 min-h-[320px] rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-orange-500/50 transition-all hover:scale-105"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-red-900 opacity-80"></div>
             {/* Updated Background Image to Netflix Grid */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-60 group-hover:scale-110 transition duration-700"></div>
             
             <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">XPLORYZE</h3>
                <p className="text-orange-200 font-medium text-sm">Subscriptions with Coins or BDT</p>
                 <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                   Shop Now <ArrowRight className="w-4 h-4" />
                </div>
             </div>
          </div>

          {/* LEARNRYZER CARD */}
          <div 
            onClick={() => onNavigate('learning')}
            className="flex-1 min-h-[320px] rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-teal-500/50 transition-all hover:scale-105"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-emerald-900 opacity-80"></div>
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-110 transition duration-700"></div>
             
             <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">LEARNRYZER</h3>
                <p className="text-teal-200 font-medium text-sm">Learning & Sharing Community</p>
                 <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                   Join Community <ArrowRight className="w-4 h-4" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Features / Tools Grid */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ryze up with the best tools</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Supercharge your productivity with AI tools that streamline your tasks and elevate your potential.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
             {[
               { icon: <Cpu className="w-6 h-6"/>, name: "Grammaryze", code: "GR" },
               { icon: <TrendingUp className="w-6 h-6"/>, name: "CV Ryzer", code: "CV" },
               { icon: <Smartphone className="w-6 h-6"/>, name: "Rewryze", code: "RW" },
               { icon: <Play className="w-6 h-6"/>, name: "Replyze", code: "RP" },
               { icon: <Users className="w-6 h-6"/>, name: "Summuryze", code: "SR" },
               { icon: <Check className="w-6 h-6"/>, name: "Avatarize", code: "AV" },
             ].map((tool, idx) => (
               <div key={idx} onClick={() => onNavigate('learning')} className="bg-[#121214] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple-500 transition cursor-pointer group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-2xl font-black text-slate-500 group-hover:text-white group-hover:from-purple-600 group-hover:to-pink-600 transition-all shadow-lg">
                    {tool.code}
                  </div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white">{tool.name}</span>
               </div>
             ))}
          </div>
           <div className="text-center mt-12">
             <button onClick={() => onNavigate('learning')} className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/25 transition flex items-center gap-2 mx-auto">
               Explore more <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </section>

      {/* Feature Section 1: PREPRYZE (New) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
              <div className="inline-block bg-pink-500/10 text-pink-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-pink-500/20">
                 PrepRyze
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                 Master your curriculum <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Ace Every Exam</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                 Personalized study plans, mock tests for SSC/HSC, and real-time progress tracking. PrepRyze helps you stay ahead of the curve.
              </p>
              <button onClick={() => onNavigate('prep')} className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold shadow-lg shadow-pink-900/20 transition flex items-center gap-2 mx-auto md:mx-0">
                 Start Practicing <ArrowRight className="w-5 h-5" />
              </button>
          </div>
          
          <div className="flex-1 order-1 md:order-2 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
             {/* Mockup UI */}
             <div className="relative bg-[#18181b] border border-white/10 rounded-3xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition duration-500">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400">
                         <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Growth Report</h4>
                         <p className="text-xs text-slate-400">Weekly Progress</p>
                      </div>
                   </div>
                   <div className="text-green-400 font-bold text-sm">+12%</div>
                </div>
                <div className="flex items-end gap-2 h-32 mb-6 px-2">
                   {[40, 70, 50, 90, 65, 85, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/10 rounded-t-sm relative group">
                         <div className="absolute bottom-0 w-full bg-pink-500 rounded-t-sm transition-all duration-1000 group-hover:bg-pink-400" style={{ height: `${h}%` }}></div>
                      </div>
                   ))}
                </div>
                <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                   <span className="text-sm font-bold text-slate-300">Physics Mock Test</span>
                   <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">PASSED</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: LEARNRYZER (Existing, Updated) */}
      <section className="py-24 bg-[#0a0a0c] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-16">
           {/* Visual Side */}
           <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-[#121214] border border-white/10 rounded-3xl p-6 rotate-[-2deg] hover:rotate-0 transition duration-500 shadow-2xl">
                 <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
                       <FileText className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="font-bold text-white">Physics Notes_Final.pdf</h3>
                       <p className="text-sm text-slate-400">Uploaded by You</p>
                    </div>
                    <div className="ml-auto text-green-400 font-bold">+80 Coins</div>
                 </div>
                 <div className="space-y-3">
                    <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                    <div className="h-2 bg-white/10 rounded-full w-full"></div>
                 </div>
                 <div className="mt-6 flex gap-3">
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20">#Physics</div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">#Science</div>
                 </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-white text-black font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
                 <Coins className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                 Earn while you learn
              </div>
           </div>

           {/* Text Side */}
           <div className="flex-1 text-center md:text-left">
              <div className="inline-block bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-teal-500/20">
                 LearnRyzer
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                 Turn your notes into <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Real Rewards</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                 The Ryze Learning Hub isn't just about studying. Upload your notes, share your knowledge, and earn Ryze Coins that you can spend on data packs, subscriptions, and more.
              </p>
              <button onClick={() => onNavigate('learning')} className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold shadow-lg shadow-teal-900/20 transition flex items-center gap-2 mx-auto md:mx-0">
                 Visit Learning Hub <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      </section>

      {/* Feature Section 3: XPLORYZE (New) */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1 text-center md:text-left">
              <div className="inline-block bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-orange-500/20">
                 Xploryze
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                 Unlock Premium Lifestyles <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Using Ryze Coins</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                 No credit card? No problem. Use your earned Ryze Coins or mobile balance to subscribe to Netflix, Spotify, Amazon Prime, and more instantly.
              </p>
              <button onClick={() => onNavigate('subscriptions')} className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-900/20 transition flex items-center gap-2 mx-auto md:mx-0">
                 Explore Store <ShoppingBag className="w-5 h-5" />
              </button>
          </div>
          
          <div className="flex-1 order-1 md:order-2 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl rounded-full"></div>
             {/* Mockup UI */}
             <div className="relative space-y-4">
                {/* Netflix Card */}
                <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl transform translate-x-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center overflow-hidden">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" className="w-8" />
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Netflix Premium</h4>
                         <p className="text-xs text-slate-400">1 Month Subscription</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block font-bold text-white">3990</span>
                      <span className="text-[10px] text-yellow-500 font-bold uppercase">Coins</span>
                   </div>
                </div>

                {/* Spotify Card */}
                <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-xl transform -translate-x-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1db954] rounded-xl flex items-center justify-center">
                        <Music className="w-6 h-6 text-black" />
                      </div>
                      <div>
                         <h4 className="font-bold text-white">Spotify Duo</h4>
                         <p className="text-xs text-slate-400">1 Month Subscription</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="block font-bold text-white">2490</span>
                      <span className="text-[10px] text-yellow-500 font-bold uppercase">Coins</span>
                   </div>
                </div>

                {/* Pay Button Mockup */}
                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 text-center shadow-lg w-2/3 mx-auto mt-4 transform rotate-2 hover:rotate-0 transition">
                   <span className="font-bold text-white flex items-center justify-center gap-2">
                     <CreditCard className="w-4 h-4" /> Pay with Coins
                   </span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Telco Plan Highlight */}
      <section className="py-24 relative">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                4G that rocks <br/> your world
              </h2>
              <p className="text-xl text-purple-400 mb-8 font-semibold">Starting at just TK 57</p>
              <button onClick={() => onNavigate('plans')} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition">
                View all plans
              </button>
            </div>
            
            <div className="flex-1 flex justify-center relative">
               {/* Vertical "Story" Style Card */}
               <div className="relative w-72 h-[450px] bg-gradient-to-br from-purple-600 to-indigo-800 rounded-[2.5rem] p-2 shadow-2xl rotate-3 hover:rotate-0 transition duration-500 cursor-pointer" onClick={() => onNavigate('plans')}>
                  <div className="w-full h-full bg-[#1a1a1c] rounded-[2rem] overflow-hidden relative">
                     <img src="https://picsum.photos/400/800?random=10" alt="Pulse" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                     
                     <div className="absolute top-6 left-1/2 -translate-x-1/2">
                       <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">PULSE</h3>
                       <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded rotate-[-6deg] text-center mt-1">
                         57 TK Only
                       </div>
                     </div>

                     <div className="absolute bottom-6 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                        <div className="flex justify-between text-white mb-2">
                           <div className="flex flex-col items-center">
                             <span className="text-lg font-bold">4GB</span>
                             <span className="text-[10px]">Data</span>
                           </div>
                           <div className="w-px bg-white/20"></div>
                           <div className="flex flex-col items-center">
                             <span className="text-lg font-bold">Free</span>
                             <span className="text-[10px]">Toffee</span>
                           </div>
                        </div>
                        <div className="text-center text-[10px] text-green-400 font-bold border-t border-white/10 pt-2 mt-2">
                          UNLIMITED DATA CALLING
                        </div>
                     </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute top-20 -right-8 bg-purple-600 p-3 rounded-2xl shadow-xl animate-bounce">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Social / Community */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/10">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              Enjoy it with people who <br/> share your vibe
            </h2>
            <div className="relative w-full aspect-video md:aspect-[2/1] max-w-2xl mx-auto">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-50"></div>
               {/* Central User */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-purple-500 p-1 bg-[#050505] z-10">
                  <img src="https://i.pravatar.cc/150?u=ryze" className="w-full h-full rounded-full object-cover" />
               </div>
               
               {/* Orbiting Users */}
               {[1,2,3,4,5,6].map((i) => {
                 const angle = (i * 60) * (Math.PI / 180);
                 const radius = 140; // px
                 const x = Math.cos(angle) * radius;
                 const y = Math.sin(angle) * radius;
                 return (
                   <div key={i} className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-900 overflow-hidden hover:scale-125 transition duration-300" 
                        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}>
                      <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                   </div>
                 )
               })}
               
               {/* Orbit Rings */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/5 rounded-full pointer-events-none"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none"></div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default LandingPage;
