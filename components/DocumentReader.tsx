
import React from 'react';
import { DocumentItem } from '../types';
import { ArrowLeft, Download, Share2, Bookmark, MoreVertical, FileText } from 'lucide-react';

interface DocumentReaderProps {
  doc: DocumentItem;
  onBack: () => void;
}

const DocumentReader: React.FC<DocumentReaderProps> = ({ doc, onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0f0f11] flex flex-col animate-fade-in">
      {/* Reader Toolbar */}
      <div className="bg-[#18181b] border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition text-slate-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white font-bold text-sm md:text-base line-clamp-1">{doc.title}</h2>
            <p className="text-xs text-slate-500 hidden md:block">{doc.author} • Read Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white" title="Bookmark">
             <Bookmark className="w-5 h-5" />
           </button>
           <button className="p-2 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white" title="Download PDF">
             <Download className="w-5 h-5" />
           </button>
           <button className="p-2 hover:bg-white/10 rounded-full transition text-slate-400 hover:text-white md:hidden">
             <MoreVertical className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#0a0a0c] relative">
        <div className="max-w-3xl mx-auto min-h-full bg-[#121214] shadow-2xl my-8 border border-white/5">
           {/* Document Header inside view */}
           <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                 <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{doc.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                 <span className="bg-white/5 px-2 py-1 rounded">Author: {doc.author}</span>
                 <span className="bg-white/5 px-2 py-1 rounded">Last Updated: Oct 24, 2024</span>
              </div>
           </div>

           {/* Actual Content */}
           <div className="p-8 md:p-12 prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
              {doc.content ? (
                <div dangerouslySetInnerHTML={{ __html: doc.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <div className="text-center py-20 text-slate-500">
                   <p>This is a placeholder for the file content.</p>
                </div>
              )}
              
              <hr className="border-white/10 my-12" />
              
              <div className="flex justify-center">
                 <p className="text-xs text-slate-600 uppercase tracking-widest">End of Document</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReader;
