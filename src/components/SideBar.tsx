import React from 'react';
import { Bookmark, X } from 'lucide-react';

interface SidebarProps {
  words: string[];
  onRemoveWord: (word: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ words, onRemoveWord }) => {
  return (
    <div className="w-64 bg-slate-800 border-l border-slate-700 overflow-y-auto">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Bookmark className="text-teal-500" size={20} />
          <h2 className="text-lg font-semibold">Saved Words</h2>
        </div>
      </div>
      
      <div className="p-4">
        {words.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            Select words from the PDF and click "Save" to add them here.
          </p>
        ) : (
          <ul className="space-y-2">
            {words.map((word, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between bg-slate-700 p-2 rounded-md"
              >
                <span className="text-sm flex-1">{word}</span>
                <button 
                  onClick={() => onRemoveWord(word)}
                  className="text-gray-400 hover:text-red-400 p-1"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;