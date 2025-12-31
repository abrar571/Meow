
import React, { useState } from 'react';
import Hero from './components/Hero';
import LandingPage from './components/LandingPage';
import DataPlans from './components/DataPlans';
import LearningHub from './components/LearningHub';
import SubscriptionStore from './components/SubscriptionStore';
import DocumentPreview from './components/DocumentPreview';
import DocumentReader from './components/DocumentReader';
import MusicSection from './components/MusicSection';
import GamingSection from './components/GamingSection';
import IbadahSection from './components/IbadahSection';
import { User, DataPackage, DocumentItem } from './types';
import { Menu, X, Coins, AlertTriangle, ChevronDown, Download, Globe, MessageSquare, MapPin, LogIn, BookOpen, Building2, Music, GraduationCap, Plane, Gamepad2, Moon, User as UserIcon } from 'lucide-react';

// --- INITIAL DATA ---

const INITIAL_DOCS: DocumentItem[] = [
  { 
    id: '1', 
    title: 'Intro to Quantum Physics', 
    author: 'Dr. A. Rahman', 
    description: 'Comprehensive notes on Quantum Mechanics basics, wave-particle duality, and Schrödinger equation.', 
    tags: ['physics', 'science', 'quantum'], 
    priceCoins: 120000, 
    downloads: 120, 
    isOwner: false,
    content: `<h2>Chapter 1: The Quantum Realm</h2><p>Quantum mechanics is a fundamental theory in physics...</p>`
  },
  { 
    id: '2', 
    title: 'React JS Advanced Patterns', 
    author: 'Dev Sarah', 
    description: 'Deep dive into Hooks, Context API, Performance optimization, and custom hooks design.', 
    tags: ['coding', 'javascript', 'react'], 
    priceCoins: 150000, 
    downloads: 450, 
    isOwner: false,
    content: `<h2>Advanced React Patterns</h2><p>Mastering React requires understanding patterns that scale...</p>`
  },
  { 
    id: '3', 
    title: 'Macroeconomics Masterclass', 
    author: 'Prof. Yunus', 
    description: 'In-depth analysis of GDP, Inflation, Fiscal Policy, and Monetary systems.', 
    tags: ['economics', 'finance'], 
    priceCoins: 110000, 
    downloads: 89, 
    isOwner: false,
    content: `<h2>Macroeconomics</h2><p>Understanding the economy as a whole...</p>`
  },
  {
    id: '4',
    title: 'Organic Chemistry: Mechanisms',
    author: 'Dr. K. Huda',
    description: 'Detailed breakdown of SN1, SN2, E1, and E2 reactions with 3D visualization notes.',
    tags: ['chemistry', 'science', 'hsc'], 
    priceCoins: 135000,
    downloads: 210,
    isOwner: false,
    content: `<h2>Reaction Mechanisms</h2><p>Nucleophilic substitution reactions are fundamental...</p>`
  },
  {
    id: '5',
    title: 'Machine Learning A-Z',
    author: 'AI Research Lab',
    description: 'From Linear Regression to Neural Networks. Python code snippets included.',
    tags: ['cs', 'python', 'ai'],
    priceCoins: 250000,
    downloads: 850,
    isOwner: false,
    content: `<h2>Intro to ML</h2><p>Machine learning provides systems the ability to automatically learn...</p>`
  },
  {
    id: '6',
    title: 'IELTS Writing Task 2 Guide',
    author: 'British Council Certified',
    description: 'Band 9 sample essays, vocabulary lists, and structure templates.',
    tags: ['ielts', 'english', 'abroad'],
    priceCoins: 105000,
    downloads: 1200,
    isOwner: false,
    content: `<h2>Achieving Band 9</h2><p>Coherence and Cohesion are key...</p>`
  },
  {
    id: '7',
    title: 'GRE Verbal Reasoning',
    author: 'PrepScholar',
    description: 'Top 1000 vocabulary words and reading comprehension strategies.',
    tags: ['gre', 'vocab', 'abroad'],
    priceCoins: 115000,
    downloads: 340,
    isOwner: false,
    content: `<h2>Verbal Reasoning</h2><p>Context clues are your best friend...</p>`
  },
  {
    id: '8',
    title: 'Data Structures & Algorithms',
    author: 'Engineer Prizon',
    description: 'Java implementation of Trees, Graphs, HashMaps, and Sorting algos.',
    tags: ['cs', 'coding', 'java'],
    priceCoins: 180000,
    downloads: 600,
    isOwner: false,
    content: `<h2>Graphs</h2><p>A graph is a data structure that consists of a finite set of vertices...</p>`
  },
  {
    id: '9',
    title: 'Anatomy & Physiology Atlas',
    author: 'MedSchool Insider',
    description: 'Complete skeletal and muscular system notes with high-res diagrams.',
    tags: ['medical', 'biology', 'mbbs'],
    priceCoins: 220000,
    downloads: 410,
    isOwner: false,
    content: `<h2>The Skeletal System</h2><p>The adult human skeleton consists of 206 bones...</p>`
  },
  {
    id: '10',
    title: 'Digital Logic Design',
    author: 'EEE Dept',
    description: 'Boolean algebra, Logic Gates, Karnaugh Maps, and Flip-Flops.',
    tags: ['engineering', 'eee', 'hardware'],
    priceCoins: 125000,
    downloads: 150,
    isOwner: false,
    content: `<h2>Boolean Algebra</h2><p>The mathematical foundation of digital circuits...</p>`
  },
  {
    id: '11',
    title: 'Corporate Law Essentials',
    author: 'Barrister Rafiq',
    description: 'Company Act 1994, contracts, and business liabilities in Bangladesh.',
    tags: ['law', 'business', 'corporate'],
    priceCoins: 160000,
    downloads: 95,
    isOwner: false,
    content: `<h2>Company Law</h2><p>A legal entity separate from its owners...</p>`
  },
  {
    id: '12',
    title: 'Digital Marketing 2025',
    author: 'Growth Hackerz',
    description: 'SEO, SEM, Social Media algorithms, and Content Strategy.',
    tags: ['marketing', 'business', 'freelancing'],
    priceCoins: 140000,
    downloads: 500,
    isOwner: false,
    content: `<h2>SEO Basics</h2><p>Optimizing for search intent is more important than keywords...</p>`
  },
  {
    id: '13',
    title: 'Psychology: Cognitive Science',
    author: 'Mind Matters',
    description: 'Memory, Perception, Attention, and Decision making processes.',
    tags: ['psychology', 'science'],
    priceCoins: 105000,
    downloads: 200,
    isOwner: false,
    content: `<h2>Memory Models</h2><p>Sensory memory, short-term memory, and long-term memory...</p>`
  },
  {
    id: '14',
    title: 'Environmental Science',
    author: 'Green Earth',
    description: 'Climate change data, renewable energy, and conservation biology.',
    tags: ['science', 'biology', 'environment'],
    priceCoins: 100000,
    downloads: 180,
    isOwner: false,
    content: `<h2>Climate Change</h2><p>The greenhouse effect and global warming potential...</p>`
  },
  {
    id: '15',
    title: 'Blockchain Fundamentals',
    author: 'CryptoDev',
    description: 'How Bitcoin works, Smart Contracts, Ethereum, and Consensus mechanisms.',
    tags: ['tech', 'cs', 'crypto'],
    priceCoins: 190000,
    downloads: 320,
    isOwner: false,
    content: `<h2>Distributed Ledger</h2><p>A consensus of replicated, shared, and synchronized digital data...</p>`
  },
  {
    id: '16',
    title: 'Creative Writing Masterclass',
    author: 'Lit Society',
    description: 'Character development, plot structure, and dialogue techniques.',
    tags: ['arts', 'writing', 'literature'],
    priceCoins: 110000,
    downloads: 250,
    isOwner: false,
    content: `<h2>Show, Don't Tell</h2><p>Immerse the reader in the experience rather than explaining it...</p>`
  },
  {
    id: '17',
    title: 'Astrophysics: Black Holes',
    author: 'Cosmos Club',
    description: 'Event horizons, singularities, and Hawking radiation explained.',
    tags: ['physics', 'science', 'space'],
    priceCoins: 145000,
    downloads: 400,
    isOwner: false,
    content: `<h2>General Relativity</h2><p>Gravity is the curvature of spacetime...</p>`
  },
  {
    id: '18',
    title: 'Mobile App Dev (Flutter)',
    author: 'Code Master',
    description: 'Building cross-platform apps with Dart and Flutter widgets.',
    tags: ['coding', 'app-dev', 'tech'],
    priceCoins: 175000,
    downloads: 550,
    isOwner: false,
    content: `<h2>Widget Tree</h2><p>In Flutter, almost everything is a widget...</p>`
  },
  {
    id: '19',
    title: 'Supply Chain Management',
    author: 'MBA Notes',
    description: 'Logistics, inventory control, and operations management.',
    tags: ['business', 'management'],
    priceCoins: 130000,
    downloads: 110,
    isOwner: false,
    content: `<h2>Just-in-Time</h2><p>An inventory strategy companies employ to increase efficiency...</p>`
  },
  {
    id: '20',
    title: 'Cybersecurity Basics',
    author: 'White Hat',
    description: 'Network security, encryption, phishing prevention, and ethical hacking.',
    tags: ['tech', 'security', 'cs'],
    priceCoins: 165000,
    downloads: 670,
    isOwner: false,
    content: `<h2>Encryption</h2><p>The process of encoding information...</p>`
  }
];

const App: React.FC = () => {
  // --- Global State ---
  const [activePage, setActivePage] = useState('home');
  const [learningTab, setLearningTab] = useState<'market' | 'library' | 'chat' | 'prep'>('market');
  
  // Document State (Lifted from LearningHub)
  const [docs, setDocs] = useState<DocumentItem[]>(INITIAL_DOCS);
  
  const [user, setUser] = useState<User>({
    name: 'Bongoboltu',
    phoneNumber: '01412345678',
    balanceCoins: 598240,
    balanceBDT: 1500,
    currentData: 40,
    isLoggedIn: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Auth & Onboarding State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Specific State for Preview, Reader & Confirmation
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [readingDoc, setReadingDoc] = useState<DocumentItem | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    onConfirm: () => void;
  }>({ isOpen: false, onConfirm: () => {} });


  // --- Actions ---

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNavigate = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (page === 'home') {
      setActivePage('home');
    } else {
      if (user.isLoggedIn) {
        if (page === 'prep') {
          setActivePage('learning');
          setLearningTab('prep');
        } else if (page === 'learning') {
          setActivePage('learning');
          setLearningTab('market');
        } else {
          setActivePage(page);
        }
      } else {
        setShowLoginModal(true);
      }
    }
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setActivePage('home');
    showNotification("Logged out successfully");
  };

  const openConfirmation = (action: () => void) => {
    setConfirmationModal({
      isOpen: true,
      onConfirm: action
    });
  };

  const closeConfirmation = () => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirmAction = () => {
    confirmationModal.onConfirm();
    closeConfirmation();
  };

  // --- Login & Onboarding Components ---

  const LoginModal = () => {
    const [phone, setPhone] = useState('01412345678');
    const [pass, setPass] = useState('12345');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (phone === '01412345678' && pass === '12345') {
        setUser(prev => ({ ...prev, isLoggedIn: true }));
        setShowLoginModal(false);
        // Trigger Onboarding immediately after login
        setShowOnboarding(true);
      } else {
        setError('Invalid credentials. Use 01412345678 / 12345');
      }
    };

    return (
      <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-white">Login to Ryze</h2>
             <button onClick={() => setShowLoginModal(false)} className="text-slate-400 hover:text-white"><X /></button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
              <input 
                type="password" 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition">
              Sign In
            </button>
            <p className="text-xs text-center text-slate-500">Demo: 01412345678 / 12345</p>
          </form>
        </div>
      </div>
    );
  };

  const OnboardingModal = () => {
    const [step, setStep] = useState(1);
    const [purpose, setPurpose] = useState<'academic' | 'self-study' | 'ielts-gre' | 'job-prep' | null>(null);
    const [selection, setSelection] = useState('');

    const academicOptions = ['Grade 8', 'Grade 9', 'Grade 10', 'SSC', 'HSC', 'Undergrad'];
    const selfStudyOptions = ['Technology', 'Art & Design', 'Business', 'Literature', 'Science'];
    const abroadOptions = ['IELTS General', 'IELTS Academic', 'GRE', 'TOEFL', 'SAT'];
    const jobOptions = ['BCS', 'Bank Jobs', 'Corporate Interview', 'Soft Skills', 'IT Certification'];

    const getOptions = () => {
      switch(purpose) {
        case 'academic': return academicOptions;
        case 'self-study': return selfStudyOptions;
        case 'ielts-gre': return abroadOptions;
        case 'job-prep': return jobOptions;
        default: return [];
      }
    };

    const handleFinish = () => {
      if (purpose && selection) {
        setUser(prev => ({ 
          ...prev, 
          onboarding: { purpose, detail: selection } 
        }));
        setShowOnboarding(false);
        showNotification("Profile updated successfully!");
      }
    };

    return (
      <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-white/10 w-full">
            <div className={`h-full bg-purple-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2 mt-2">Welcome, {user.name}!</h2>
          <p className="text-slate-400 mb-8">Let's customize your Ryze experience.</p>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-white">Select your primary goal:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => { setPurpose('academic'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-purple-600/20 hover:border-purple-500 transition text-left group"
                >
                  <GraduationCap className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">Academic</h3>
                  <p className="text-sm text-slate-400 mt-1">School, College, or Uni curriculum.</p>
                </button>
                <button 
                  onClick={() => { setPurpose('self-study'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-teal-600/20 hover:border-teal-500 transition text-left group"
                >
                  <BookOpen className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">Self Study</h3>
                  <p className="text-sm text-slate-400 mt-1">Personal growth and hobbies.</p>
                </button>
                <button 
                  onClick={() => { setPurpose('ielts-gre'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-orange-600/20 hover:border-orange-500 transition text-left group"
                >
                  <Plane className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">IELTS / GRE</h3>
                  <p className="text-sm text-slate-400 mt-1">Preparation for study abroad.</p>
                </button>
                <button 
                  onClick={() => { setPurpose('job-prep'); setStep(2); }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 hover:border-blue-500 transition text-left group"
                >
                  <Building2 className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition" />
                  <h3 className="font-bold text-white">Job Prep</h3>
                  <p className="text-sm text-slate-400 mt-1">Career readiness and interviews.</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                 <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-white">← Back</button>
              </div>
              <p className="text-lg font-semibold text-white">
                {purpose === 'academic' && 'Select your current grade level:'}
                {purpose === 'self-study' && 'What are you interested in?'}
                {purpose === 'ielts-gre' && 'Which exam are you taking?'}
                {purpose === 'job-prep' && 'What is your target career path?'}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {getOptions().map(item => (
                  <button
                    key={item}
                    onClick={() => setSelection(item)}
                    className={`px-4 py-2 rounded-full text-sm font-bold border transition ${
                      selection === item 
                        ? 'bg-white text-black border-white' 
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/40'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleFinish}
                disabled={!selection}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-bold text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Ryzing 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Domain Logic Handlers ---

  const processBuyPackage = (pkg: DataPackage) => {
    // Check for coin redemption
    if (pkg.priceCoins && pkg.priceCoins > 0) {
      if (user.balanceCoins >= pkg.priceCoins) {
        setUser(prev => ({
          ...prev,
          balanceCoins: prev.balanceCoins - (pkg.priceCoins || 0),
          currentData: prev.currentData + pkg.dataAmountGB
        }));
        showNotification(`Redemption successful! Added ${pkg.dataAmountGB}GB for ${pkg.priceCoins.toLocaleString()} Coins.`);
      } else {
        showNotification('Insufficient Ryze Coins.', 'error');
      }
      return;
    }

    // Default BDT purchase
    if (user.balanceBDT >= pkg.priceBDT) {
      setUser(prev => ({
        ...prev,
        balanceBDT: prev.balanceBDT - pkg.priceBDT,
        balanceCoins: prev.balanceCoins + pkg.coinsEarned,
        currentData: prev.currentData + pkg.dataAmountGB
      }));
      showNotification(`Purchase successful! Added ${pkg.dataAmountGB}GB and earned ${pkg.coinsEarned} Coins.`);
    } else {
      showNotification('Insufficient BDT Balance.', 'error');
    }
  };

  const processPurchaseDoc = (doc: DocumentItem) => {
    if (user.balanceCoins >= doc.priceCoins) {
      // 1. Deduct Coins
      setUser(prev => ({ ...prev, balanceCoins: prev.balanceCoins - doc.priceCoins }));
      
      // 2. Mark as Owned in Global State
      setDocs(prevDocs => prevDocs.map(d => d.id === doc.id ? { ...d, isOwner: true } : d));
      
      // 3. Update Preview State if currently viewing it
      if (previewDoc && previewDoc.id === doc.id) {
        setPreviewDoc({ ...previewDoc, isOwner: true });
      }

      showNotification(`Purchased "${doc.title}" for ${doc.priceCoins} Coins.`);
      
      // 4. Redirect to Library or stay in preview with updated state
      // Optional: switch to 'library' tab if we wanted to enforce it, 
      // but staying on preview allows immediate opening.
    } else {
      showNotification('Insufficient Ryze Coins.', 'error');
    }
  };

  const processBuySubscription = (serviceName: string, planName: string, bdtCost: number, coinCost: number) => {
    if (user.balanceBDT >= bdtCost && user.balanceCoins >= coinCost) {
      setUser(prev => ({ 
        ...prev, 
        balanceBDT: prev.balanceBDT - bdtCost,
        balanceCoins: prev.balanceCoins - coinCost 
      }));
      showNotification(`${serviceName} ${planName} activated successfully!`);
    } else {
      showNotification('Insufficient Balance (BDT or Coins).', 'error');
    }
  };

  // --- Interaction Handlers (Connected to Components) ---

  const handleBuyPackageClick = (pkg: DataPackage) => {
    openConfirmation(() => processBuyPackage(pkg));
  };

  const handleUploadDoc = (doc: DocumentItem, rewardType: 'instant' | 'sell', amount: number) => {
    // Add new doc to global list
    setDocs(prev => [doc, ...prev]);

    if (rewardType === 'instant') {
      setUser(prev => ({ ...prev, balanceCoins: prev.balanceCoins + amount }));
      showNotification(`Upload successful! You earned ${amount.toLocaleString()} Ryze Coins instantly.`);
    } else {
      showNotification(`Upload successful! Listed for ${doc.priceCoins.toLocaleString()} Ryze Coins.`);
    }
  };

  const handlePreviewDoc = (doc: DocumentItem) => {
    setPreviewDoc(doc);
    setActivePage('preview');
  };

  const handleOpenDoc = (doc: DocumentItem) => {
    setReadingDoc(doc);
    setActivePage('reader');
  };

  const handlePurchaseDocClick = (doc: DocumentItem) => {
     openConfirmation(() => processPurchaseDoc(doc));
  };

  const handleBuySubscriptionClick = (serviceName: string, planName: string, bdtCost: number, coinCost: number) => {
    processBuySubscription(serviceName, planName, bdtCost, coinCost);
  };

  // --- Render ---

  return (
    <div className="min-h-screen flex flex-col font-sans relative text-slate-100 selection:bg-purple-500 selection:text-white bg-[#050505]">
      
      {/* Auth Modals */}
      {showLoginModal && <LoginModal />}
      {showOnboarding && <OnboardingModal />}

      {/* Global Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Navbar (Pill Style) */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-2xl w-full max-w-7xl">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-3" 
              onClick={() => handleNavigate('home')}
            >
               {/* Logo Image Removed */}
               <span className="font-black text-2xl tracking-tighter text-white">RYZE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-5">
              <button onClick={() => handleNavigate('home')} className={`text-sm font-medium hover:text-white transition ${activePage === 'home' ? 'text-white' : 'text-slate-400'}`}>Home</button>
              <button onClick={() => handleNavigate('learning')} className={`text-sm font-medium hover:text-white transition ${activePage === 'learning' && learningTab === 'market' ? 'text-white' : 'text-slate-400'}`}>LearnRyzer</button>
              <button onClick={() => handleNavigate('prep')} className={`text-sm font-medium hover:text-white transition ${activePage === 'learning' && learningTab === 'prep' ? 'text-white' : 'text-slate-400'}`}>PrepRyzer</button>
              <button onClick={() => handleNavigate('gaming')} className={`text-sm font-medium hover:text-white transition ${activePage === 'gaming' ? 'text-white' : 'text-slate-400'} flex items-center gap-1`}><Gamepad2 className="w-3 h-3" /> Gaming</button>
              <button onClick={() => handleNavigate('music')} className={`text-sm font-medium hover:text-white transition ${activePage === 'music' ? 'text-white' : 'text-slate-400'} flex items-center gap-1`}><Music className="w-3 h-3" /> Music</button>
              <button onClick={() => handleNavigate('salaah')} className={`text-sm font-medium hover:text-white transition ${activePage === 'salaah' ? 'text-white' : 'text-slate-400'} flex items-center gap-1`}><Moon className="w-3 h-3" /> Salaah</button>
              <button onClick={() => handleNavigate('subscriptions')} className={`text-sm font-medium hover:text-white transition ${activePage === 'subscriptions' ? 'text-white' : 'text-slate-400'}`}>Xploryze</button>
              <button onClick={() => handleNavigate('plans')} className={`text-sm font-medium hover:text-white transition ${activePage === 'plans' ? 'text-white' : 'text-slate-400'}`}>Telco plans</button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
               {user.isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    {/* User Profile Info */}
                    <div className="hidden lg:flex flex-col items-end">
                      <span className="text-white font-bold text-xs">{user.name}</span>
                      <span className="text-slate-500 text-[10px]">{user.phoneNumber}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 p-[2px] hidden lg:block">
                      <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition"
                    >
                      <LogIn className="w-4 h-4" /> Logout
                    </button>
                  </div>
               ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" /> Join Ryze
                </button>
               )}
               {/* Mobile Menu Toggle */}
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                 {mobileMenuOpen ? <X /> : <Menu />}
               </button>
            </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-4 right-4 z-40 bg-[#121214] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-2">
            <button onClick={() => {handleNavigate('home'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Home</button>
            <button onClick={() => {handleNavigate('learning'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">LearnRyzer</button>
            <button onClick={() => {handleNavigate('prep'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">PrepRyzer</button>
            <button onClick={() => {handleNavigate('gaming'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Gaming</button>
            <button onClick={() => {handleNavigate('music'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Music</button>
            <button onClick={() => {handleNavigate('salaah'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Salaah</button>
            <button onClick={() => {handleNavigate('subscriptions'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Xploryze</button>
            <button onClick={() => {handleNavigate('plans'); setMobileMenuOpen(false)}} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 font-medium">Telco Plans</button>
        </div>
      )}

      {/* Global Confirmation Modal */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center transform scale-100 transition-transform">
             <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                <AlertTriangle className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Confirm Purchase</h3>
             <p className="text-slate-400 mb-6 leading-relaxed">
               Are you sure you want to make this purchase? <br/>
               <span className="text-red-500 text-xs font-bold uppercase tracking-wide">Purchases are non refundable.</span>
             </p>
             <div className="flex gap-3">
               <button 
                 onClick={closeConfirmation}
                 className="flex-1 py-3 border border-white/10 rounded-xl font-semibold text-slate-300 hover:bg-white/5 transition"
               >
                 Take me back
               </button>
               <button 
                 onClick={handleConfirmAction}
                 className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-slate-200 transition shadow-lg"
               >
                 Yes
               </button>
             </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-xl text-white font-medium animate-fade-in-up flex items-center gap-2 ${notification.type === 'success' ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-red-500'}`}>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Reader View (Full Screen) */}
      {activePage === 'reader' && readingDoc && (
        <DocumentReader 
          doc={readingDoc} 
          onBack={() => setActivePage('learning')} 
        />
      )}

      {/* Main Content Area */}
      {activePage !== 'reader' && (
        <main className="w-full">
          
          {/* Landing Page Mode */}
          {activePage === 'home' && (
            <div className="animate-fade-in">
               <Hero onNavigate={handleNavigate} user={user} />
               <LandingPage onNavigate={handleNavigate} />
            </div>
          )}

          {/* Functional Pages (Wrapped in Container) */}
          {activePage !== 'home' && user.isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[80vh]">
               {activePage === 'plans' && <DataPlans buyPackage={handleBuyPackageClick} />}
               
               {activePage === 'learning' && (
                  <div className="animate-fade-in">
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Learning Hub</h2>
                        <div className="flex items-center gap-3">
                           <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">{user.onboarding?.purpose.replace('-', ' ')} Mode</span>
                           <span className="text-slate-400 text-sm border-l border-white/20 pl-3">{user.onboarding?.detail}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                         <span className="text-sm text-slate-400">Your Wallet:</span>
                         <span className="text-purple-400 font-bold flex items-center gap-1"><Coins className="w-4 h-4"/> {user.balanceCoins.toLocaleString()} Coins</span>
                      </div>
                    </div>
                    <LearningHub 
                        docs={docs} // Pass state from App
                        userPoints={user.balanceCoins} 
                        userPurpose={user.onboarding?.purpose}
                        onPreviewDoc={handlePreviewDoc} 
                        onOpenDoc={handleOpenDoc}
                        onUploadDoc={handleUploadDoc}
                        initialTab={learningTab}
                    />
                  </div>
                )}

                {activePage === 'preview' && previewDoc && (
                  <DocumentPreview 
                    doc={previewDoc}
                    onBack={() => setActivePage('learning')}
                    onPurchase={handlePurchaseDocClick}
                    userPoints={user.balanceCoins}
                  />
                )}
                
                {activePage === 'subscriptions' && (
                  <SubscriptionStore 
                    buySubscription={handleBuySubscriptionClick} 
                    userBalanceBDT={user.balanceBDT}
                    userBalanceCoins={user.balanceCoins}
                  />
                )}

                {activePage === 'music' && (
                  <MusicSection 
                    onBack={() => setActivePage('home')} 
                    userCoins={user.balanceCoins}
                    userBalanceBDT={user.balanceBDT}
                    onSubscribe={(plan, cost, currency) => {
                       if (currency === 'BDT') handleBuySubscriptionClick('Music Pro', plan, cost, 0);
                       else handleBuySubscriptionClick('Music Pro', plan, 0, cost);
                    }}
                  />
                )}

                {activePage === 'gaming' && (
                  <GamingSection 
                    userCoins={user.balanceCoins}
                    onBack={() => setActivePage('home')}
                  />
                )}

                {activePage === 'salaah' && (
                  <IbadahSection />
                )}
            </div>
          )}

        </main>
      )}

      {/* Footer (Accordion Style Mockup) - Hidden in Reader */}
      {activePage !== 'reader' && (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4">
             {/* ... Footer content same as before ... */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                   <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked <br/> Questions <MessageSquare className="inline w-8 h-8 text-green-400 ml-2" /></h2>
                   <p className="text-slate-400 mb-8">Can't find what you're looking for? Check out our FAQ.</p>
                   <div className="space-y-4">
                      {['What is Ryze?', 'How can I join Ryze?', 'What are the benefits?'].map((q, i) => (
                        <div key={i} className="border-b border-white/10 pb-4">
                           <div className="flex justify-between items-center cursor-pointer hover:text-purple-400 transition">
                              <span className="font-medium text-slate-200">{q}</span>
                              <span className="text-xl">+</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="bg-[#121214] rounded-3xl p-8 border border-white/10">
                   <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="text-purple-500"/> Our headquarters</h3>
                   <div className="aspect-video bg-slate-800 rounded-xl mb-4 overflow-hidden relative group">
                      <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Office"/>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                         <span className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-bold text-white">Ryze HQ, Dhaka</span>
                      </div>
                   </div>
                   <div className="space-y-2 text-sm text-slate-400">
                      <p><span className="text-white font-semibold">Location:</span> House 4, Tiger's Den, SW(H), Gulshan-1, Dhaka</p>
                      <p><span className="text-white font-semibold">Email:</span> hello@ryze.com.bd</p>
                      <p><span className="text-white font-semibold">Phone:</span> +880 17 0000 0000</p>
                   </div>
                </div>
             </div>

             <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <div className="flex gap-6">
                   <a href="#" className="hover:text-white">Terms & conditions</a>
                   <a href="#" className="hover:text-white">Privacy</a>
                </div>
                <p>COPYRIGHT © RYZE 2025</p>
                <div className="flex gap-4">
                   <Globe className="w-5 h-5 hover:text-white cursor-pointer" />
                   <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-8" alt="Play Store" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-8" alt="App Store" />
                   </div>
                </div>
             </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
