
import React, { useState } from 'react';
import { SubscriptionService } from '../types';
import { Check, CreditCard, Coins, ShoppingBag, Zap, Wallet, Sliders, X } from 'lucide-react';

interface SubscriptionStoreProps {
  buySubscription: (serviceName: string, planName: string, bdtCost: number, coinCost: number) => void;
  userBalanceBDT: number;
  userBalanceCoins: number;
}

// 1 BDT = 29585 Coins
const EXCHANGE_RATE = 29585;

// Logos with specific colors/placeholders to match requirements
const LOGO_HOICHOI = "https://ui-avatars.com/api/?name=hoichoi&background=ff0000&color=fff&rounded=true&bold=true&length=1";
const LOGO_ISCREEN = "https://ui-avatars.com/api/?name=iScreen&background=ffffff&color=ff0000&rounded=true&bold=true&length=1&font-size=0.6";
const LOGO_DEEPTO = "https://ui-avatars.com/api/?name=Deepto&background=0055ff&color=fff&rounded=true&bold=true&length=1";
const LOGO_BONGO = "https://ui-avatars.com/api/?name=Bongo&background=d0021b&color=fff&rounded=true&bold=true&length=1";

const SERVICES: SubscriptionService[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    plans: [
      { name: '1 Month', priceBDT: 349, priceCoins: 8360000 },
      { name: 'Standard', priceBDT: 749, priceCoins: 22100000 },
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    plans: [
      { name: 'Student', priceBDT: 109, priceCoins: 3210000 },
      { name: 'Individual', priceBDT: 199, priceCoins: 5800000 },
      { name: 'Duo', priceBDT: 249, priceCoins: 7340000 },
    ]
  },
  {
    id: 'prime',
    name: 'Amazon Prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',
    plans: [
      { name: 'Monthly', priceBDT: 299, priceCoins: 8820000 },
      { name: 'Annual', priceBDT: 2999, priceCoins: 88510000 },
    ]
  },
  {
    id: 'hoichoi',
    name: 'Hoichoi',
    logo: LOGO_HOICHOI,
    plans: [
      { name: '7 Days', priceBDT: 20, priceCoins: 20 * EXCHANGE_RATE },
      { name: '30 Days', priceBDT: 40, priceCoins: 40 * EXCHANGE_RATE },
    ]
  },
  {
    id: 'iscreen',
    name: 'iScreen',
    logo: LOGO_ISCREEN,
    plans: [
      { name: '7 Days', priceBDT: 15, priceCoins: 15 * EXCHANGE_RATE },
      { name: '30 Days', priceBDT: 30, priceCoins: 30 * EXCHANGE_RATE },
    ]
  },
  {
    id: 'deepto',
    name: 'Deepto Play',
    logo: LOGO_DEEPTO,
    plans: [
      { name: '7 Days', priceBDT: 15, priceCoins: 15 * EXCHANGE_RATE },
      { name: '30 Days', priceBDT: 30, priceCoins: 30 * EXCHANGE_RATE },
    ]
  },
  {
    id: 'bongo',
    name: 'Bongo',
    logo: LOGO_BONGO,
    plans: [
      { name: '7 Days', priceBDT: 20, priceCoins: 20 * EXCHANGE_RATE },
      { name: '30 Days', priceBDT: 40, priceCoins: 40 * EXCHANGE_RATE },
    ]
  },
  {
    id: 'truecaller',
    name: 'Truecaller',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Truecaller_logo.svg',
    plans: [
      { name: '30 Days', priceBDT: 60, priceCoins: 60 * EXCHANGE_RATE },
    ]
  }
];

const SubscriptionStore: React.FC<SubscriptionStoreProps> = ({ buySubscription, userBalanceBDT, userBalanceCoins }) => {
  const [selectedPlan, setSelectedPlan] = useState<{
    service: string;
    plan: string;
    totalBDT: number;
    totalCoins: number;
  } | null>(null);
  
  // Slider value: 0 to 100 representing percentage of payment in COINS
  const [coinPercentage, setCoinPercentage] = useState(0);

  const openPaymentModal = (service: string, plan: string, bdt: number, coins: number) => {
    setSelectedPlan({ service, plan, totalBDT: bdt, totalCoins: coins });
    setCoinPercentage(0); // Default to full BDT
  };

  const handleBuy = () => {
    if (!selectedPlan) return;
    
    // Calculate final costs based on percentage
    // coinPercentage 100 means pay full price in coins.
    // coinPercentage 0 means pay full price in BDT.
    
    const coinCost = Math.floor(selectedPlan.totalCoins * (coinPercentage / 100));
    // For BDT, we calculate remainder based on ratio of coins used
    const bdtCost = Math.floor(selectedPlan.totalBDT * ((100 - coinPercentage) / 100));

    buySubscription(selectedPlan.service, selectedPlan.plan, bdtCost, coinCost);
    setSelectedPlan(null);
  };

  const getPaymentBreakdown = () => {
    if (!selectedPlan) return { bdt: 0, coins: 0 };
    const coins = Math.floor(selectedPlan.totalCoins * (coinPercentage / 100));
    const bdt = Math.floor(selectedPlan.totalBDT * ((100 - coinPercentage) / 100));
    return { bdt, coins };
  };

  const breakdown = getPaymentBreakdown();
  const canAfford = breakdown.bdt <= userBalanceBDT && breakdown.coins <= userBalanceCoins;

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-orange-900 to-red-900 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <ShoppingBag className="w-8 h-8" />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white">Xploryze Store</h2>
                  <p className="text-orange-200">Manage your digital lifestyle subscriptions.</p>
               </div>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-black/30 p-4 rounded-xl border border-white/10 min-w-[140px]">
                  <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-2 mb-1">
                     <Wallet className="w-3 h-3" /> Coins Saved
                  </span>
                  <span className="text-2xl font-black text-yellow-500">{(userBalanceCoins / EXCHANGE_RATE).toFixed(0)} BDT eq</span>
               </div>
               <div className="bg-black/30 p-4 rounded-xl border border-white/10 min-w-[140px]">
                  <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-2 mb-1">
                     <Zap className="w-3 h-3" /> Active Subs
                  </span>
                  <span className="text-2xl font-black text-white">2</span>
               </div>
            </div>
         </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-xl font-bold text-white">{selectedPlan.service}</h3>
                   <span className="text-sm text-slate-400">{selectedPlan.plan} Plan</span>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="p-1 hover:bg-white/10 rounded"><X /></button>
             </div>

             <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-bold text-slate-300">Payment Mix</span>
                   <span className="text-xs text-slate-500">{coinPercentage}% Coins</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={coinPercentage}
                  onChange={(e) => setCoinPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-2 text-xs font-bold">
                   <span className="text-slate-400">BDT Only</span>
                   <span className="text-orange-500">Coins Only</span>
                </div>
             </div>

             <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3 mb-6">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Pay with Balance</span>
                   </div>
                   <span className={`font-bold ${breakdown.bdt > userBalanceBDT ? 'text-red-500' : 'text-white'}`}>
                      ৳{breakdown.bdt}
                   </span>
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-slate-300">Pay with Coins</span>
                   </div>
                   <span className={`font-bold ${breakdown.coins > userBalanceCoins ? 'text-red-500' : 'text-yellow-500'}`}>
                      {breakdown.coins.toLocaleString()}
                   </span>
                </div>
                <div className="border-t border-white/10 pt-2 text-xs text-slate-500 text-right">
                   Your Balance: ৳{userBalanceBDT} | {userBalanceCoins.toLocaleString()} Coins
                </div>
             </div>

             <button 
               onClick={handleBuy}
               disabled={!canAfford}
               className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2
                 ${canAfford ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:opacity-90' : 'bg-white/5 text-slate-500 cursor-not-allowed'}
               `}
             >
               {canAfford ? 'Confirm Purchase' : 'Insufficient Funds'}
             </button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-white mb-6">Available Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map(service => (
            <div key={service.id} className="bg-[#0f0f11] rounded-2xl p-6 border border-white/10 shadow-lg hover:border-orange-500/50 transition-all flex flex-col items-center text-center group">
              <div className="bg-white p-3 rounded-lg mb-6 w-full flex justify-center h-20 items-center overflow-hidden">
                <img src={service.logo} alt={service.name} className="h-10 object-contain" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4">{service.name}</h3>

              <div className="w-full space-y-3">
                {service.plans.map(plan => (
                  <div key={plan.name} className="w-full border border-white/10 rounded-xl p-4 hover:border-orange-500/50 bg-white/5 hover:bg-white/10 transition group relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-300">{plan.name}</span>
                      <span className="font-bold text-white">৳{plan.priceBDT}</span>
                    </div>
                     <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] text-slate-500">or pay with</span>
                      <span className="text-xs font-bold text-yellow-500">{(plan.priceCoins / 1000000).toFixed(2)}M Coins</span>
                    </div>
                    <button 
                      onClick={() => openPaymentModal(service.name, plan.name, plan.priceBDT, plan.priceCoins)}
                      className="w-full mt-2 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 font-medium group-hover:bg-white group-hover:text-black transition-colors"
                    >
                      Get
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-2 w-full text-xs text-slate-500">
                 <div className="flex items-center justify-center gap-1">
                   <Check className="w-3 h-3 text-green-500" /> Instant Activation
                 </div>
                 <div className="flex items-center justify-center gap-1">
                   <Check className="w-3 h-3 text-green-500" /> Cancel Anytime
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStore;
