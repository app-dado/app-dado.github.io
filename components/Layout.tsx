
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const showNav = activeTab !== AppTab.CUSTOMIZE;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative bg-background-dark overflow-hidden">
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {children}
      </main>

      {showNav && (
        <nav className="w-full flex gap-8 border-t border-white/5 bg-background-dark/80 backdrop-blur-xl px-4 pb-8 pt-4 z-50 justify-center">
          <button 
            onClick={() => onTabChange(AppTab.DICE)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === AppTab.DICE ? 'text-white' : 'text-primary/50'}`}
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: activeTab === AppTab.DICE ? "'FILL' 1" : "'FILL' 0" }}>casino</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Lancia</span>
          </button>
          
          <button 
            onClick={() => onTabChange(AppTab.PROFILE)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${activeTab === AppTab.PROFILE ? 'text-primary' : 'text-primary/50'}`}
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: activeTab === AppTab.PROFILE ? "'FILL' 1" : "'FILL' 0" }}>person</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Profilo</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default Layout;
