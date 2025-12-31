
import React, { useState, useEffect, useRef } from 'react';
import { Search, Upload, FileText, Coins, Bot, X, Send, Eye, Library, BrainCircuit, BarChart3, GraduationCap, CheckCircle, Globe, Briefcase, ChevronRight, BookOpen, Trophy, User as UserIcon, Medal, TrendingUp, Languages, BookOpenCheck } from 'lucide-react';
import { DocumentItem, ChatMessage } from '../types';
import { generateStudyHelp } from '../services/geminiService';

interface LearningHubProps {
  docs: DocumentItem[]; // Received from parent state
  userPoints: number;
  userPurpose?: 'academic' | 'self-study' | 'ielts-gre' | 'job-prep';
  onPreviewDoc: (doc: DocumentItem) => void;
  onOpenDoc: (doc: DocumentItem) => void; // New handler for reading
  onUploadDoc: (doc: DocumentItem, rewardType: 'instant' | 'sell', instantAmount: number) => void;
  initialTab?: 'market' | 'library' | 'chat' | 'prep';
}

// Leaderboard Data (Static for demo)
const LEADERBOARD_DATA = [
  { rank: 1, name: 'Prizon', points: 142500, city: 'Dhaka', trend: 'up' },
  { rank: 2, name: 'Mahid', points: 139800, city: 'Chittagong', trend: 'stable' },
  { rank: 3, name: 'Abrar', points: 135200, city: 'Sylhet', trend: 'up' },
  { rank: 4, name: 'Rohan', points: 128400, city: 'Rajshahi', trend: 'down' },
  { rank: 5, name: 'Shreya', points: 121000, city: 'Dhaka', trend: 'up' },
  { rank: 6, name: 'Sayem', points: 115600, city: 'Khulna', trend: 'stable' },
  { rank: 7, name: 'Ridi', points: 109200, city: 'Barishal', trend: 'up' },
  { rank: 8, name: 'Oyshee', points: 102400, city: 'Dhaka', trend: 'down' },
  { rank: 9, name: 'Kotha', points: 98100, city: 'Rangpur', trend: 'up' },
  { rank: 10, name: 'Raisa', points: 95400, city: 'Comilla', trend: 'stable' },
  { rank: 11, name: 'Maseat', points: 92000, city: 'Dhaka', trend: 'up' },
];

interface DocumentCardProps {
  doc: DocumentItem;
  onPreviewDoc: (doc: DocumentItem) => void;
  onOpenDoc: (doc: DocumentItem) => void;
  activeTab: 'market' | 'library' | 'chat' | 'prep';
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onPreviewDoc, onOpenDoc, activeTab }) => (
  <div className="bg-[#18181b] p-5 rounded-xl border border-white/5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20 transition-all group">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
        <FileText className="w-6 h-6" />
      </div>
      {doc.priceCoins > 0 && !doc.isOwner ? (
        <div className="flex items-center gap-1 text-sm font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
          <Coins className="w-3 h-3" /> {doc.priceCoins.toLocaleString()}
        </div>
      ) : (
        <div className="text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
          {doc.isOwner ? 'Owned' : 'Free'}
        </div>
      )}
    </div>
    <h3 className="font-bold text-white mb-1 truncate">{doc.title}</h3>
    <p className="text-xs text-slate-500 mb-3">By {doc.author} • {doc.downloads} downloads</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {doc.tags.map(tag => (
        <span key={tag} className="text-xs bg-white/5 text-slate-400 px-2 py-1 rounded-full border border-white/5">#{tag}</span>
      ))}
    </div>
    <button 
      onClick={() => doc.isOwner ? onOpenDoc(doc) : onPreviewDoc(doc)}
      className={`w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition
        ${doc.isOwner 
          ? 'bg-white text-black hover:bg-slate-200' 
          : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
    >
      {doc.isOwner ? 'Open Document' : 'View Preview & Buy'}
      {doc.isOwner ? <BookOpen className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
);

const PrepCard = ({ title, desc, icon, color, tag }: { title: string, desc: string, icon: React.ReactNode, color: string, tag?: string }) => (
  <div className="bg-[#18181b] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all group cursor-pointer relative overflow-hidden">
     <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 blur-2xl rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition`}></div>
     {tag && <div className="absolute top-4 right-4 bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tag}</div>}
     <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition">
       {icon}
     </div>
     <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
     <p className="text-sm text-slate-400 mb-4 line-clamp-2">{desc}</p>
     <div className="flex items-center text-xs font-bold text-white uppercase tracking-wider gap-2">
       Start Practice <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
     </div>
  </div>
);

const QuestionBankItem = ({ name, icon, count }: { name: string, icon: React.ReactNode, count: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition cursor-pointer group">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-white text-sm">{name}</h4>
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">{count} Questions</p>
    </div>
    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white" />
  </div>
);

const LearningHub: React.FC<LearningHubProps> = ({ docs, userPoints, userPurpose, onPreviewDoc, onOpenDoc, onUploadDoc, initialTab = 'market' }) => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'market' | 'library' | 'chat' | 'prep'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadType, setUploadType] = useState<'instant' | 'sell'>('instant');
  const [sellPrice, setSellPrice] = useState(50000);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Hello! I am RyzeBot. I can help you learn new topics or find study materials. What are you studying today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // --- Handlers ---

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredDocs = docs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery) || 
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );
  
  const myLibraryDocs = docs.filter(doc => doc.isOwner);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      title: uploadTitle,
      author: 'You',
      description: 'User uploaded document',
      tags: uploadTags.split(',').map(t => t.trim()),
      priceCoins: uploadType === 'sell' ? sellPrice : 0,
      downloads: 0,
      isOwner: true,
      content: `<h2>${uploadTitle}</h2><p>This is a user uploaded file.</p>`
    };
    
    // Trigger parent update (add to list + add points)
    // REWARD INCREASED TO 80,000 COINS
    onUploadDoc(newDoc, uploadType, 80000);
    
    // Reset & Close
    setUploadTitle('');
    setUploadTags('');
    setUploadType('instant');
    setShowUploadModal(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const botResponseText = await generateStudyHelp(userMsg.text, messages.map(m => ({ role: m.role, text: m.text })));
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: botResponseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[850px] md:h-[700px] bg-[#0f0f11]/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 overflow-hidden">
      {/* Header Tabs */}
      <div className="flex border-b border-white/10">
        <button 
          onClick={() => setActiveTab('market')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'market' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Search className="w-4 h-4" /> Market
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'library' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Library className="w-4 h-4" /> Library
        </button>
        <button 
          onClick={() => setActiveTab('prep')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'prep' ? 'text-pink-400 border-b-2 border-pink-500 bg-pink-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <BrainCircuit className="w-4 h-4" /> PrepRyze
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-4 text-center font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'chat' ? 'text-teal-400 border-b-2 border-teal-500 bg-teal-500/10' : 'text-slate-400 hover:bg-white/5'}`}
        >
          <Bot className="w-4 h-4" /> AI Tutor
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#0f0f11]">
        
        {/* Market Tab */}
        {activeTab === 'market' && (
          <div className="h-full overflow-y-auto p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search by title or tags (e.g. physics)..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                />
              </div>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center gap-2 shadow-lg shadow-purple-900/40"
              >
                <Upload className="w-5 h-5" /> Upload & Earn
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} onPreviewDoc={onPreviewDoc} onOpenDoc={onOpenDoc} activeTab={activeTab} />)}
              {filteredDocs.length === 0 && (
                <div className="col-span-full text-center py-12 text-slate-500">
                  <p>No documents found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
          <div className="h-full overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-white mb-6">My Documents</h3>
            {myLibraryDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {myLibraryDocs.map(doc => <DocumentCard key={doc.id} doc={doc} onPreviewDoc={onPreviewDoc} onOpenDoc={onOpenDoc} activeTab={activeTab} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Library className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Your library is empty</h4>
                <p className="text-slate-400 max-w-sm mx-auto mb-6">Buy documents from the market or upload your own notes to see them here.</p>
                <button onClick={() => setActiveTab('market')} className="text-purple-400 hover:text-purple-300 font-bold">Go to Market</button>
              </div>
            )}
          </div>
        )}

        {/* PrepRyze Tab */}
        {activeTab === 'prep' && (
          <div className="h-full overflow-y-auto p-6 flex flex-col gap-8">
             {/* ... Prep Content Same as before ... */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Main Content (2 cols) */}
               <div className="lg:col-span-2 space-y-8">
                 {/* Personal Growth Report */}
                 <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                       <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><BarChart3 className="text-pink-400"/> Growth Report</h3>
                       <p className="text-slate-400 text-sm mb-6">Your consistency score is top 5% this week! Keep solving questions.</p>
                       <div className="flex gap-4">
                          <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex-1 text-center">
                             <span className="block text-xl font-black text-white">12</span>
                             <span className="text-[10px] text-slate-500 uppercase">Tests Taken</span>
                          </div>
                          <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex-1 text-center">
                             <span className="block text-xl font-black text-green-400">85%</span>
                             <span className="text-[10px] text-slate-500 uppercase">Avg. Score</span>
                          </div>
                       </div>
                    </div>
                    {/* Simple Chart Mockup */}
                    <div className="w-full md:w-48 h-24 flex items-end justify-between gap-1 px-4 py-2 bg-black/20 rounded-xl">
                       {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                          <div key={i} className="w-4 bg-pink-500/50 rounded-t-sm hover:bg-pink-500 transition-all" style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                 </div>

                 {/* Practice Zones */}
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Trophy className="text-yellow-500 w-5 h-5"/> Practice Zones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <PrepCard title="Test Papers" desc="Practice with SSC/HSC papers from top colleges like Notre Dame." icon={<BookOpen className="w-6 h-6"/>} color="bg-blue-500" tag="New" />
                       <PrepCard title="Mock Contests" desc="Compete globally in live mock exams with real-time rankings." icon={<BrainCircuit className="w-6 h-6"/>} color="bg-purple-500" />
                    </div>
                 </div>

                 {/* Study Abroad Section */}
                 <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2"><Globe className="text-indigo-400 w-6 h-6"/> Study Abroad</h3>
                      <button className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition">Explore Programs</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                       <PrepCard 
                          title="IELTS Prep" 
                          desc="Complete mock tests for Academic & General modules with audio." 
                          icon={<Languages className="w-6 h-6"/>} 
                          color="bg-teal-600" 
                       />
                       <PrepCard 
                          title="GRE Practice" 
                          desc="Quantitative and Verbal reasoning question papers with solutions." 
                          icon={<BookOpenCheck className="w-6 h-6"/>} 
                          color="bg-orange-600" 
                       />
                       <PrepCard 
                          title="SAT Center" 
                          desc="Full-length math and evidence-based reading/writing practice tests." 
                          icon={<GraduationCap className="w-6 h-6"/>} 
                          color="bg-red-600" 
                       />
                    </div>
                 </div>

                 {/* Admission Question Banks */}
                 <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2"><GraduationCap className="text-orange-500 w-6 h-6"/> Admission Banks</h3>
                      <button className="text-xs font-bold text-orange-400 uppercase tracking-widest hover:text-orange-300 transition">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <QuestionBankItem name="BUET Engineering" count="12,500+" icon={<span className="text-white font-black text-xs">BT</span>} />
                       <QuestionBankItem name="DU A-Unit Science" count="8,200+" icon={<span className="text-white font-black text-xs">DU</span>} />
                       <QuestionBankItem name="Medical (MBBS)" count="15,000+" icon={<span className="text-white font-black text-xs">MD</span>} />
                       <QuestionBankItem name="GST Combined" count="6,400+" icon={<span className="text-white font-black text-xs">GS</span>} />
                    </div>
                 </div>
               </div>

               {/* Leaderboard Column (1 col) */}
               <div className="lg:col-span-1 space-y-6">
                 <div className="bg-[#121214] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full max-h-[600px] shadow-2xl">
                    <div className="p-5 bg-gradient-to-r from-pink-600 to-purple-600">
                       <h3 className="font-black text-white text-lg flex items-center gap-2 uppercase tracking-tighter">
                          <Medal className="w-5 h-5" /> Bangladesh Leaderboard
                       </h3>
                       <p className="text-[10px] text-white/70 font-bold tracking-widest uppercase mt-1">Realtime Ranking</p>
                    </div>
                    
                    {/* User Rank Snapshot */}
                    <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                          <UserIcon className="w-5 h-5 text-purple-400" />
                       </div>
                       <div className="flex-1">
                          <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Your Position</span>
                          <span className="text-white font-black">#24,802 <span className="text-[10px] text-green-400 ml-1">▲ 120</span></span>
                       </div>
                       <div className="text-right">
                          <span className="text-xs text-slate-500 block uppercase font-bold">Total Points</span>
                          <span className="text-yellow-500 font-black">450</span>
                       </div>
                    </div>

                    {/* Top Students List */}
                    <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                       {LEADERBOARD_DATA.map((student, idx) => (
                          <div key={student.name} className={`px-4 py-3 flex items-center gap-4 transition hover:bg-white/5 ${idx < 3 ? 'bg-white/5' : ''}`}>
                             <div className={`w-6 text-center text-sm font-black ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-orange-500' : 'text-slate-600'}`}>
                                {student.rank}
                             </div>
                             <div className="flex-1 flex flex-col">
                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                   {student.name}
                                   {idx === 0 && <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_8px_yellow]"></span>}
                                </span>
                                <span className="text-[9px] text-slate-500 uppercase tracking-widest">{student.city}, BD</span>
                             </div>
                             <div className="text-right flex flex-col items-end">
                                <span className="text-xs font-black text-slate-300">{student.points.toLocaleString()}</span>
                                <span className={`text-[9px] font-bold flex items-center gap-0.5 ${student.trend === 'up' ? 'text-green-500' : student.trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
                                   {student.trend === 'up' ? <TrendingUp className="w-2 h-2" /> : '•'} {student.trend !== 'stable' ? 'Active' : 'Idle'}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <div className="p-3 bg-white/5 border-t border-white/5 text-center">
                       <button className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] hover:text-white transition">Full Nationwide List</button>
                    </div>
                 </div>
               </div>
             </div>

          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : 'bg-[#18181b] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.role === 'model' && <div className="flex items-center gap-2 mb-2 text-teal-400 font-bold text-xs"><Bot className="w-3 h-3"/> RyzeBot</div>}
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                  <div className="bg-[#18181b] border border-white/10 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                 </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-[#0f0f11] border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask RyzeBot about any topic..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-500"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal Overlay */}
        {showUploadModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 flex justify-between items-center text-white">
                <h3 className="font-bold flex items-center gap-2"><Upload className="w-5 h-5" /> Upload Material</h3>
                <button onClick={() => setShowUploadModal(false)} className="hover:bg-white/10 p-1 rounded"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleUploadSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Document Title</label>
                    <input required type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. Physics Notes" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Tags (comma separated)</label>
                    <input required type="text" value={uploadTags} onChange={e => setUploadTags(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g. physics, science" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">File</label>
                    <input type="file" required className="w-full border border-dashed border-white/20 rounded-lg p-4 text-sm text-slate-400 bg-white/5" />
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <label className="block text-sm font-bold text-slate-300 mb-2">Earnings Strategy</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-purple-500 transition">
                        <input 
                          type="radio" 
                          name="earnType" 
                          checked={uploadType === 'instant'} 
                          onChange={() => setUploadType('instant')}
                          className="text-purple-500 accent-purple-500"
                        />
                        <div className="flex-1">
                          <span className="block font-semibold text-sm text-white">Instant Reward</span>
                          <span className="text-xs text-slate-400">Get 80,000 Ryze Coins immediately</span>
                        </div>
                        <Coins className="w-5 h-5 text-yellow-500" />
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:border-purple-500 transition">
                        <input 
                          type="radio" 
                          name="earnType" 
                          checked={uploadType === 'sell'} 
                          onChange={() => setUploadType('sell')}
                          className="text-purple-500 accent-purple-500"
                        />
                        <div className="flex-1">
                          <span className="block font-semibold text-sm text-white">Set Your Price</span>
                          <span className="text-xs text-slate-400">Earn when others download</span>
                        </div>
                      </label>
                    </div>
                    {uploadType === 'sell' && (
                      <div className="mt-3 animate-fade-in">
                        <label className="block text-xs font-bold text-slate-400 mb-1">Price (Ryze Coins)</label>
                        <input 
                          type="number" 
                          min="0" 
                          value={sellPrice} 
                          onChange={e => setSellPrice(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-right font-mono text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-white text-black py-3 rounded-lg font-bold hover:bg-slate-200 transition">
                  Confirm Upload
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
