
import React, { useState, useEffect } from 'react';
import { MapPin, Moon, Book, BookOpen, Heart, ChevronRight, CheckCircle2, MoreHorizontal, X, Loader2, Globe, History, Info } from 'lucide-react';
import { fetchReligiousResources } from '../services/geminiService';

const PRAYERS = [
  { name: 'Fajr', time: '05:22 AM', end: '06:15 AM', completed: false },
  { name: 'Dhuhr', time: '12:04 PM', end: '03:44 PM', completed: true },
  { name: 'Asr', time: '03:45 PM', end: '05:15 PM', completed: false },
  { name: 'Maghrib', time: '05:26 PM', end: '06:30 PM', completed: false },
  { name: 'Isha', time: '06:44 PM', end: '11:59 PM', completed: false },
];

const BD_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur', 'Narayanganj', 'Bogra'
];

const SalaahSection: React.FC = () => {
  const [selectedPrayer, setSelectedPrayer] = useState(PRAYERS[1]); // Default to Dhuhr
  const [location, setLocation] = useState('Dhaka');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState<'Quran' | 'Hadith' | 'Qurbani' | null>(null);
  const [featureContent, setFeatureContent] = useState<{ text: string; sources: any[] } | null>(null);
  const [isLoadingFeature, setIsLoadingFeature] = useState(false);

  const handleFeatureClick = async (type: 'Quran' | 'Hadith' | 'Qurbani') => {
    setActiveFeature(type);
    if (type === 'Qurbani') {
      setFeatureContent(null); // Will show hardcoded info
      return;
    }

    setIsLoadingFeature(true);
    const result = await fetchReligiousResources(type);
    setFeatureContent(result);
    setIsLoadingFeature(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-slate-100">
      
      {/* Location Selector Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-purple-500" /> Select City
              </h3>
              <button onClick={() => setShowLocationModal(false)} className="text-slate-500 hover:text-white"><X /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
              {BD_CITIES.map(city => (
                <button 
                  key={city}
                  onClick={() => { setLocation(city); setShowLocationModal(false); }}
                  className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    location === city 
                      ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feature Content Modal (Quran/Hadith/Qurbani) */}
      {activeFeature && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in flex flex-col max-h-[85vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                  {activeFeature === 'Quran' && <Book className="w-6 h-6" />}
                  {activeFeature === 'Hadith' && <BookOpen className="w-6 h-6" />}
                  {activeFeature === 'Qurbani' && <Heart className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {activeFeature === 'Quran' ? 'Al Quran Resources' : activeFeature === 'Hadith' ? 'Authentic Hadith' : 'Qurbani: Rules & History'}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Salaah Companion</p>
                </div>
              </div>
              <button onClick={() => setActiveFeature(null)} className="p-2 hover:bg-white/5 rounded-full transition"><X /></button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {activeFeature === 'Qurbani' ? (
                <div className="space-y-8 animate-fade-in">
                  <section>
                    <h4 className="flex items-center gap-2 text-purple-400 font-bold mb-3 uppercase tracking-wider text-sm"><History className="w-4 h-4" /> History</h4>
                    <p className="text-slate-300 leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/5">
                      Qurbani, or Udhiya, commemorates the trials and triumphs of Prophet Ibrahim (A.S.) and his son Ismail (A.S.). Ibrahim (A.S.) was commanded by Allah in a dream to sacrifice his beloved son. As a display of ultimate devotion, both father and son agreed. Just as Ibrahim (A.S.) was about to perform the sacrifice, Allah replaced Ismail (A.S.) with a ram from Paradise, accepting Ibrahim's devotion without the loss of his son.
                    </p>
                  </section>
                  <section>
                    <h4 className="flex items-center gap-2 text-purple-400 font-bold mb-3 uppercase tracking-wider text-sm"><Info className="w-4 h-4" /> Essential Rules</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-400 text-sm">
                      <li className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                         It is Wajib for every adult Muslim who possesses the Nisab of wealth.
                      </li>
                      <li className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                         Animals must be healthy, of a specific age, and free from defects.
                      </li>
                      <li className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                         Meat should ideally be divided into three parts: family, relatives, and the poor.
                      </li>
                      <li className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
                         Perform sacrifice after the Eid prayer on the 10th, 11th, or 12th of Dhul Hijjah.
                      </li>
                    </ul>
                  </section>
                </div>
              ) : isLoadingFeature ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-slate-500">
                  <Loader2 className="w-12 h-12 animate-spin mb-4 text-purple-500" />
                  <p className="font-bold animate-pulse">Finding authentic resources on the web...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="prose prose-invert max-w-none text-slate-300">
                    <div dangerouslySetInnerHTML={{ __html: featureContent?.text.replace(/\n/g, '<br/>') || "" }} />
                  </div>
                  {featureContent?.sources && featureContent.sources.length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Verified Web Resources</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {featureContent.sources.map((source: any, i: number) => (
                          <a 
                            key={i} 
                            href={source.web?.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-purple-600/10 hover:border-purple-500 transition group"
                          >
                            <div className="flex items-center gap-3">
                               <Globe className="w-5 h-5 text-slate-400 group-hover:text-purple-400" />
                               <span className="font-bold text-slate-200 text-sm">{source.web?.title || 'Resource Link'}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white/5 border-t border-white/5 text-center">
              <p className="text-[10px] text-slate-500 font-medium">Verified by Ryze AI • Resources are curated for educational purposes.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Salaah View */}
      <div className="bg-[#121214] rounded-[2.5rem] p-8 shadow-2xl border border-white/5 overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-purple-500">
            <Moon className="w-8 h-8 fill-purple-500" />
            <h2 className="text-3xl font-black">Salaah</h2>
          </div>
          <button 
            onClick={() => setShowLocationModal(true)}
            className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-slate-300 font-bold text-sm hover:bg-white/10 transition"
          >
            <MapPin className="w-4 h-4 text-purple-500" /> {location}
          </button>
        </div>

        <div className="text-slate-500 text-sm mb-6 flex items-center gap-2">
          <span>31 December, 10 Rajab, 1447 hijri</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>Iftar at: <span className="font-bold text-slate-300">05:26 PM</span></span>
        </div>

        {/* Selected Prayer Card */}
        <div className="relative bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-3xl p-8 mb-8 overflow-hidden border border-purple-500/20">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
             <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 150H0V100C30 90 50 60 50 30C50 10 70 0 90 0C110 0 130 10 130 30C130 60 150 90 180 100V150Z" fill="#7a12f5" />
             </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-2">{selectedPrayer.name} <span className="text-lg font-normal opacity-60">({selectedPrayer.name === 'Dhuhr' ? 'Now' : 'Schedule'})</span></h3>
            <p className="text-xl font-bold text-purple-300 mb-4">{selectedPrayer.time} - {selectedPrayer.end}</p>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <span>Next Prayer: <span className="font-bold text-white">Asr</span></span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span>Countdown: <span className="font-bold text-purple-400 tracking-wider font-mono">01:44:38</span></span>
            </div>
          </div>
        </div>

        {/* Prayer Tracker */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs">Prayer Tracker</h4>
            <button className="text-purple-400 text-sm font-bold flex items-center gap-1 hover:text-white transition">
              Detailed Time Board <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PRAYERS.map((prayer) => (
              <div 
                key={prayer.name} 
                onClick={() => setSelectedPrayer(prayer)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group active:scale-95 ${
                  selectedPrayer.name === prayer.name 
                    ? 'bg-purple-600/20 border-purple-500 ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/10' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-4 transition-colors ${
                  prayer.completed ? 'bg-purple-500 border-purple-500' : (selectedPrayer.name === prayer.name ? 'border-purple-400' : 'border-slate-700')
                }`}>
                  {prayer.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <div className="text-left">
                  <span className={`block font-bold text-base ${selectedPrayer.name === prayer.name ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{prayer.name}</span>
                  <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-tight mt-1">{prayer.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Services - Interactive Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/5">
           {[
             { name: 'Al Quran', type: 'Quran', icon: <Book className="w-7 h-7" />, color: 'text-blue-400 bg-blue-500/10' },
             { name: 'Hadith', type: 'Hadith', icon: <BookOpen className="w-7 h-7" />, color: 'text-indigo-400 bg-indigo-500/10' },
             { name: 'Qurbani', type: 'Qurbani', icon: <Heart className="w-7 h-7" />, color: 'text-pink-400 bg-pink-500/10' },
             { name: 'More', type: null, icon: <MoreHorizontal className="w-7 h-7" />, color: 'text-slate-400 bg-white/5' },
           ].map((service) => (
             <div 
              key={service.name} 
              className={`flex flex-col items-center gap-3 group cursor-pointer ${!service.type ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => service.type && handleFeatureClick(service.type as any)}
             >
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all group-hover:scale-110 group-hover:-translate-y-1 shadow-lg ${service.color} border border-white/5`}>
                   {service.icon}
                </div>
                <span className="text-sm font-bold text-slate-400 group-hover:text-white">{service.name}</span>
             </div>
           ))}
        </div>
      </div>
      
      {/* Featured Content Area */}
      <div className="bg-[#121214] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Roaming 3 GB Island Pack</h3>
        <div className="aspect-video rounded-3xl overflow-hidden relative shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" 
            alt="Roaming Pack" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            <button className="bg-cyan-500 text-white px-10 py-4 rounded-full font-black shadow-xl shadow-cyan-500/30 hover:bg-cyan-400 transition transform hover:scale-105 active:scale-95">
              Click now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaahSection;
