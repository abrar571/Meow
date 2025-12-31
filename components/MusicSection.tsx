
import React, { useState } from 'react';
import { ArrowLeft, Search, Play, Music as MusicIcon, Heart, MoreHorizontal, Check } from 'lucide-react';
import { Song, PaymentMethod } from '../types';

interface MusicSectionProps {
  onBack: () => void;
  userCoins: number;
  userBalanceBDT: number;
  onSubscribe: (plan: string, cost: number, currency: 'BDT' | 'COINS') => void;
}

const DEMO_SONGS: Song[] = [
  { id: 's1', title: 'Neon Dreams', artist: 'Ryze Wave', cover: 'https://picsum.photos/200/200?random=101', duration: '3:45' },
  { id: 's2', title: 'Synth Pulse', artist: 'Cyber Beat', cover: 'https://picsum.photos/200/200?random=102', duration: '4:12' },
  { id: 's3', title: 'Midnight Ryze', artist: 'Lo-Fi Chill', cover: 'https://picsum.photos/200/200?random=103', duration: '2:58' },
];

const MusicSection: React.FC<MusicSectionProps> = ({ onBack, userCoins, userBalanceBDT, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState('15');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile');
  const [searchQuery, setSearchQuery] = useState('');

  const plans = [
    { id: '1', days: '1', bdt: 3, coins: 88000 },
    { id: '15', days: '15', bdt: 10, coins: 295000 },
    { id: '30', days: '30', bdt: 15, coins: 443000 },
    { id: '180', days: '180', bdt: 60, coins: 1700000 },
  ];

  const handleContinue = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    if (paymentMethod === 'coins') {
      onSubscribe(`${plan.days} Days Music Pro`, plan.coins, 'COINS');
    } else {
      onSubscribe(`${plan.days} Days Music Pro`, plan.bdt, 'BDT');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in pb-10">
      {/* Header */}
      <div className="bg-[#7a12f5] p-6 flex items-center gap-4 text-white">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold">Back</span>
      </div>

      <div className="p-0">
        <div className="bg-slate-50 py-4 px-6 border-b border-slate-200">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search songs, artists..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7a12f5] transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        <div className="px-6 py-2 bg-white text-center text-slate-800 font-bold text-lg">
          Music
        </div>

        {/* Music Banner */}
        <div className="px-4 mb-4">
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden relative shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800" 
              alt="Music Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
               <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-orange-500 shadow-[0_0_10px_orange]"></div>
               </div>
            </div>
          </div>
        </div>

        <div className="px-6 mb-6">
          <div className="border-t border-[#7a12f5]/20 pt-4 text-center">
             <h3 className="font-bold text-slate-800">Enjoy Ryze Pro Features and Content</h3>
          </div>
        </div>

        {/* Demo Songs */}
        <div className="px-6 mb-8">
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Trending Now</h4>
           <div className="space-y-3">
              {DEMO_SONGS.map(song => (
                <div key={song.id} className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-xl transition cursor-pointer group">
                   <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                         <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                   </div>
                   <div className="flex-1">
                      <h5 className="font-bold text-slate-800 text-sm">{song.title}</h5>
                      <p className="text-xs text-slate-500">{song.artist}</p>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">{song.duration}</span>
                      <Heart className="w-4 h-4 text-slate-300 hover:text-red-500" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Subscription Plans */}
        <div className="px-6 mb-8">
          <h4 className="text-sm font-bold text-slate-700 mb-4">Subscription plan</h4>
          <div className="space-y-3">
            {plans.map((plan) => (
              <label 
                key={plan.id}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedPlan === plan.id 
                  ? 'border-[#7a12f5] bg-pink-50/30' 
                  : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === plan.id ? 'border-[#7a12f5]' : 'border-slate-300'}`}>
                    {selectedPlan === plan.id && <div className="w-3 h-3 bg-[#7a12f5] rounded-full"></div>}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-lg">{plan.days} Days</span>
                    <p className="text-[10px] text-slate-400">
                      (Charge {plan.bdt}.00tk + vat & tax) Auto renewal
                    </p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="font-black text-slate-800">{plan.bdt} BDT</div>
                   <div className="text-[10px] text-[#7a12f5] font-bold">or {(plan.coins / 1000).toFixed(0)}k Coins</div>
                </div>
                <input 
                  type="radio" 
                  name="plan" 
                  className="hidden" 
                  checked={selectedPlan === plan.id}
                  onChange={() => setSelectedPlan(plan.id)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="px-6 mb-8 bg-slate-50/50 py-8 border-t border-slate-100">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => setPaymentMethod('mobile')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-1 transition-all ${paymentMethod === 'mobile' ? 'border-[#7a12f5] bg-pink-50/30' : 'bg-white border-white shadow-sm'}`}
              >
                 <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'mobile' ? 'border-[#7a12f5]' : 'border-slate-300'}`}>
                       {paymentMethod === 'mobile' && <div className="w-2 h-2 bg-[#7a12f5] rounded-full"></div>}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Buy With</span>
                 </div>
                 <span className="font-bold text-slate-800 text-sm">Mobile Balance</span>
              </button>

              <button 
                onClick={() => setPaymentMethod('digital')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-1 transition-all ${paymentMethod === 'digital' ? 'border-[#7a12f5] bg-pink-50/30' : 'bg-white border-white shadow-sm'}`}
              >
                 <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'digital' ? 'border-[#7a12f5]' : 'border-slate-300'}`}>
                       {paymentMethod === 'digital' && <div className="w-2 h-2 bg-[#7a12f5] rounded-full"></div>}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Buy With</span>
                 </div>
                 <span className="font-bold text-slate-800 text-sm">Digital Payment</span>
              </button>

              <button 
                onClick={() => setPaymentMethod('coins')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-start gap-1 transition-all ${paymentMethod === 'coins' ? 'border-[#7a12f5] bg-pink-50/30' : 'bg-white border-white shadow-sm'}`}
              >
                 <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'coins' ? 'border-[#7a12f5]' : 'border-slate-300'}`}>
                       {paymentMethod === 'coins' && <div className="w-2 h-2 bg-[#7a12f5] rounded-full"></div>}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Buy With</span>
                 </div>
                 <span className="font-bold text-slate-800 text-sm flex items-center gap-1">Ryze Coins <MusicIcon className="w-3 h-3 text-orange-500" /></span>
              </button>
           </div>
           
           <div className="text-center mt-6">
              <a href="#" className="text-[#7a12f5] text-xs font-bold underline">Terms & Conditions</a>
           </div>

           <button 
             onClick={handleContinue}
             className="w-full mt-6 py-4 bg-[#7a12f5] text-white font-bold rounded-full text-lg shadow-xl shadow-[#7a12f5]/30 hover:opacity-90 transition transform hover:scale-[1.02] active:scale-[0.98]"
           >
             Continue
           </button>
        </div>
      </div>
    </div>
  );
};

export default MusicSection;
