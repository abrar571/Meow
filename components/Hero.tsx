
import React from 'react';
import { Music, Headphones, Zap, LayoutGrid, Signal, Wifi, Phone, Home, FileText, Bot, Edit, Flame, Gamepad2, ShoppingBag, ArrowRight, Coins } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  onNavigate: (page: string) => void;
  user: User;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, user }) => {

  if (!user.isLoggedIn) {
    return (
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center pt-32 pb-20">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Hero Text */}
        <h1 className="relative z-10 text-5xl md:text-7xl font-black text-white mb-8 tracking-tight drop-shadow-2xl max-w-5xl mx-auto px-4 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Ryze,</span> the AI Powered <br/>
          lifestyle app <br className="hidden md:block"/>
          that fuels passions
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto px-4 mb-12">
          Experience the future of connectivity. Join the knowledge economy, enjoy premium entertainment, and manage your digital life in one place.
        </p>

        {/* Floating Icons for decoration */}
        <div className="absolute top-1/4 left-10 md:left-20 animate-float-slow hidden lg:block opacity-50">
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
             <Bot className="w-8 h-8 text-teal-400" />
           </div>
        </div>
        <div className="absolute bottom-1/4 right-10 md:right-20 animate-float-delayed hidden lg:block opacity-50">
           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
             <Gamepad2 className="w-8 h-8 text-purple-400" />
           </div>
        </div>
      </div>
    );
  }

  // LOGGED IN VIEW - DASHBOARD
  return (
    <div className="relative pt-32 pb-10 px-4 max-w-7xl mx-auto animate-fade-in">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome back, {user.name} 👋</h2>
              <p className="text-slate-400">Here's what's happening with your account today.</p>
           </div>
           <div className="text-right hidden md:block">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Current Plan</p>
              <p className="text-purple-400 font-bold">Ryze Prime 4G</p>
           </div>
        </div>

        {/* Status Cards (Balance & Internet) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-[#1a1a1c] to-[#0f0f11] p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                  <Zap className="w-24 h-24 text-white" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                       <span className="font-bold text-white">৳</span>
                     </div>
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">My Balance</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1">৳ {user.balanceBDT.toLocaleString()}</div>
                  <p className="text-xs text-slate-500">Expires in 28 days</p>
                  
                  <button className="mt-6 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-sm font-bold text-white transition">
                     Recharge Now
                  </button>
               </div>
            </div>

            {/* Internet Card */}
            <div className="bg-gradient-to-br from-[#1a1a1c] to-[#0f0f11] p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                  <Wifi className="w-24 h-24 text-purple-500" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                       <Wifi className="w-4 h-4 text-purple-400" />
                     </div>
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Internet</span>
                  </div>
                  <div className="text-4xl font-black text-purple-400 mb-1">{user.currentData} <span className="text-xl text-slate-500">GB</span></div>
                  <p className="text-xs text-slate-500">4G / 5G Ready</p>

                  <button 
                    onClick={() => onNavigate('plans')}
                    className="mt-6 w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-bold text-white transition shadow-lg shadow-purple-900/20"
                  >
                     Buy More Data
                  </button>
               </div>
            </div>

            {/* Coins Card */}
            <div className="bg-gradient-to-br from-[#1a1a1c] to-[#0f0f11] p-6 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-yellow-500/30 transition">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                  <Coins className="w-24 h-24 text-yellow-500" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                       <Coins className="w-4 h-4 text-yellow-400" />
                     </div>
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ryze Coins</span>
                  </div>
                  <div className="text-4xl font-black text-yellow-500 mb-1">{user.balanceCoins.toLocaleString()}</div>
                  <p className="text-xs text-slate-500">Lifetime earned</p>

                  <button 
                    onClick={() => onNavigate('subscriptions')}
                    className="mt-6 w-full py-2 rounded-xl bg-yellow-600/20 hover:bg-yellow-600/30 text-sm font-bold text-yellow-500 border border-yellow-500/30 transition"
                  >
                     Redeem Rewards
                  </button>
               </div>
            </div>
        </div>

        {/* Features / Options Grid */}
        <h3 className="text-xl font-bold text-white mb-6">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           
           {/* AI Toolbox */}
           <div 
              onClick={() => onNavigate('learning')}
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-teal-500/50 transition cursor-pointer group"
           >
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition">
                 <Bot className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white mb-1">AI Toolbox</h4>
              <p className="text-xs text-slate-500">Study help & tools</p>
           </div>

           {/* Xploryze */}
           <div 
              onClick={() => onNavigate('subscriptions')}
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-orange-500/50 transition cursor-pointer group"
           >
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition">
                 <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white mb-1">Xploryze Store</h4>
              <p className="text-xs text-slate-500">Subscriptions</p>
           </div>

           {/* Gaming */}
           <div 
              onClick={() => onNavigate('gaming')}
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-purple-500/50 transition cursor-pointer group"
           >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
                 <Gamepad2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white mb-1">Gaming</h4>
              <p className="text-xs text-slate-500">Play & Earn</p>
           </div>

           {/* Music */}
           <div 
              onClick={() => onNavigate('music')}
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-pink-500/50 transition cursor-pointer group"
           >
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition">
                 <Music className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white mb-1">Music</h4>
              <p className="text-xs text-slate-500">Stream ad-free</p>
           </div>

           {/* Daily Bonus */}
           <div 
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-red-500/50 transition cursor-pointer group col-span-2 md:col-span-2 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="flex justify-between items-center">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                       <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                       <span className="text-xs font-bold text-red-500 uppercase">Daily Streak</span>
                    </div>
                    <h4 className="font-bold text-white text-lg">Claim your bonus</h4>
                    <p className="text-xs text-slate-500 mb-4">You're on a 3-day streak!</p>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition">
                       Claim 500 Coins
                    </button>
                 </div>
                 <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                    <Flame className="w-10 h-10" />
                 </div>
              </div>
           </div>

           {/* Buy Data Plans */}
           <div 
              onClick={() => onNavigate('plans')}
              className="bg-[#18181b] hover:bg-[#202024] p-5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition cursor-pointer group col-span-2 md:col-span-2 relative overflow-hidden"
           >
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
               <div className="flex justify-between items-center h-full">
                  <div>
                     <h4 className="font-bold text-white text-lg mb-1">Explore Data Packs</h4>
                     <p className="text-xs text-slate-500">Hot deals starting from 57 TK</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                     <ArrowRight className="w-6 h-6" />
                  </div>
               </div>
           </div>
        </div>
    </div>
  );
};

export default Hero;
