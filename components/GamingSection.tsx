import React from 'react';
// Added 'Users' to imports to fix the error on line 86.
import { Gamepad2, Trophy, Coins, Play, Zap, Flame, Star, ArrowLeft, Users } from 'lucide-react';

interface GamingSectionProps {
  userCoins: number;
  onBack: () => void;
}

const FEATURED_GAMES = [
  { id: 'g1', name: 'Ryze Runner', genre: 'Arcade', players: '12k', reward: 'Up to 500 Coins', img: 'https://picsum.photos/400/250?random=201', color: 'bg-purple-600' },
  { id: 'g2', name: 'Cyber Clash', genre: 'Strategy', players: '8k', reward: 'Up to 1000 Coins', img: 'https://picsum.photos/400/250?random=202', color: 'bg-blue-600' },
  { id: 'g3', name: 'Word Ryzer', genre: 'Puzzle', players: '25k', reward: 'Up to 200 Coins', img: 'https://picsum.photos/400/250?random=203', color: 'bg-teal-600' },
];

const GamingSection: React.FC<GamingSectionProps> = ({ userCoins, onBack }) => {
  return (
    <div className="animate-fade-in space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-2 transition">
             <ArrowLeft className="w-4 h-4" /> Back to Home
           </button>
           <h2 className="text-4xl font-black text-white flex items-center gap-3">
             <Gamepad2 className="text-purple-500 w-10 h-10" />
             Gaming Hub
           </h2>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-6">
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Active Players</span>
              <span className="text-white font-bold">142,502</span>
           </div>
           <div className="w-px h-8 bg-white/10"></div>
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Your Coins</span>
              <span className="text-yellow-500 font-bold flex items-center gap-1"><Coins className="w-4 h-4" /> {userCoins.toLocaleString()}</span>
           </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
         <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" alt="Banner" />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent p-12 flex flex-col justify-center">
            <span className="text-purple-400 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Season 4 is Live</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
               Tournament of <br/> Champions
            </h1>
            <div className="flex gap-4">
               <button className="bg-white text-black px-8 py-3 rounded-full font-black flex items-center gap-2 hover:bg-slate-200 transition">
                  <Play className="w-5 h-5 fill-black" /> Play Now
               </button>
               <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition">
                  Leaderboard
               </button>
            </div>
         </div>
      </div>

      {/* Categories / Filters */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
         {['All Games', 'Play to Earn', 'Multiplayer', 'Tournament', 'Arcade', 'Strategy'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-full border border-white/10 font-bold text-sm transition ${i === 1 ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
               {cat}
            </button>
         ))}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {FEATURED_GAMES.map(game => (
            <div key={game.id} className="bg-[#121214] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500 transition duration-300 group">
               <div className="relative aspect-video overflow-hidden">
                  <img src={game.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                     {game.genre}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                     <Coins className="w-3 h-3" /> {game.reward}
                  </div>
               </div>
               <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-xl font-bold text-white">{game.name}</h3>
                     <span className="text-slate-500 text-xs flex items-center gap-1"><Users className="w-3 h-3" /> {game.players}</span>
                  </div>
                  <button className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold group-hover:bg-white group-hover:text-black transition flex items-center justify-center gap-2">
                     <Play className="w-4 h-4" /> Start Gaming
                  </button>
               </div>
            </div>
         ))}
      </div>

      {/* Rewards System Info */}
      <div className="bg-gradient-to-br from-[#121214] to-slate-900 border border-white/10 rounded-[3rem] p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold mb-6">
                  <Zap className="w-4 h-4 fill-yellow-500" /> New Reward System
               </div>
               <h2 className="text-4xl font-black text-white mb-6">Play. Earn. Ryze.</h2>
               <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Turn your gaming hours into digital assets. Earn Ryze Coins for every level you beat, every tournament you win, and every challenge you complete. Spend them on data, OTTs, or premium materials.
               </p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
                        <Star className="w-6 h-6" />
                     </div>
                     <div>
                        <span className="block text-white font-bold">Loyalty Points</span>
                        <span className="text-xs text-slate-500">Every game counts</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400">
                        <Flame className="w-6 h-6" />
                     </div>
                     <div>
                        <span className="block text-white font-bold">Daily Streak</span>
                        <span className="text-xs text-slate-500">Bonus multipliers</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-slate-800/40 rounded-3xl border border-white/10 flex items-center justify-center relative shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-3xl"></div>
               <Gamepad2 className="w-32 h-32 text-white opacity-20" />
               <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl animate-bounce">
                  <Coins className="w-8 h-8 text-yellow-500 fill-yellow-500" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GamingSection;