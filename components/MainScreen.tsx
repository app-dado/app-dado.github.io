
import React, { useState, useCallback } from 'react';
import { Die, DieFace } from '../types';

interface MainScreenProps {
  activeDie: Die;
  allDice: Die[];
  onSelectDie: (id: string) => void;
  onRoll: (face: DieFace) => void;
}

const MainScreen: React.FC<MainScreenProps> = ({ activeDie, allDice, onSelectDie, onRoll }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState<DieFace | null>(null);

  const roll = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    let count = 0;
    const maxCycles = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * activeDie.faces.length);
      setCurrentFace(activeDie.faces[randomIndex]);
      count++;
      
      if (count >= maxCycles) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * activeDie.faces.length);
        const finalFace = activeDie.faces[finalIndex];
        setCurrentFace(finalFace);
        setIsRolling(false);
        onRoll(finalFace);
      }
    }, 80);
  }, [isRolling, activeDie, onRoll]);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-dark relative">
      {/* Selettore dei dadi superiore */}
      <div className="w-full px-6 pt-6 flex justify-center gap-4 z-30">
        {allDice.map(die => (
          <button
            key={die.id}
            onClick={() => { if (!isRolling) onSelectDie(die.id); }}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeDie.id === die.id ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`}
          >
            <div 
              className="size-12 rounded-full flex items-center justify-center border-2" 
              style={{ 
                borderColor: die.themeColor, 
                backgroundColor: activeDie.id === die.id ? `${die.themeColor}33` : 'transparent' 
              }}
            >
              <span className="material-symbols-outlined text-2xl" style={{ color: die.themeColor, fontVariationSettings: activeDie.id === die.id ? "'FILL' 1" : "'FILL' 0" }}>{die.icon}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: die.themeColor }}>{die.name}</span>
          </button>
        ))}
      </div>

      {/* Area principale del dado */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="romantic-glow w-[350px] h-[350px] opacity-30 transition-colors duration-700"
            style={{ background: `radial-gradient(circle, ${activeDie.themeColor} 0%, transparent 70%)` }}
          ></div>
        </div>

        <div className={`relative w-64 h-64 transition-transform duration-300 ${isRolling ? 'scale-95 animate-pulse' : 'scale-100'}`}>
          <div 
            className="w-full h-full rounded-2xl border-2 flex items-center justify-center shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-500"
            style={{ 
              borderColor: `${activeDie.themeColor}88`,
              background: `linear-gradient(135deg, ${activeDie.themeColor}22 0%, #1a0812 100%)`
            }}
          >
            {/* Riflesso vetro */}
            <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-white/5 rotate-45 transform pointer-events-none"></div>
            
            <div className="flex flex-col items-center gap-4 text-center px-6 z-10">
              {!currentFace ? (
                <>
                  <span className="material-symbols-outlined text-8xl opacity-90 transition-all duration-500" style={{ color: activeDie.themeColor, fontVariationSettings: "'FILL' 1" }}>{activeDie.icon}</span>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50">Tocca il tasto sotto</p>
                </>
              ) : (
                <>
                  <div className="size-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${activeDie.themeColor}44` }}>
                    <span className="text-2xl font-black" style={{ color: activeDie.themeColor }}>{currentFace.id}</span>
                  </div>
                  <p className="text-white text-xl font-bold leading-tight drop-shadow-md">{currentFace.text || 'Slot Vuoto'}</p>
                </>
              )}
            </div>

            {/* Dettagli angoli */}
            <div className="absolute top-4 left-4 size-1.5 rounded-full opacity-60" style={{ backgroundColor: activeDie.themeColor }}></div>
            <div className="absolute top-4 right-4 size-1.5 rounded-full opacity-60" style={{ backgroundColor: activeDie.themeColor }}></div>
            <div className="absolute bottom-4 left-4 size-1.5 rounded-full opacity-60" style={{ backgroundColor: activeDie.themeColor }}></div>
            <div className="absolute bottom-4 right-4 size-1.5 rounded-full opacity-60" style={{ backgroundColor: activeDie.themeColor }}></div>
          </div>
          {/* Ombra del dado */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/60 blur-xl rounded-full"></div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-3 py-16">
          <div className="h-1.5 w-8 rounded-full transition-all duration-500" style={{ backgroundColor: activeDie.themeColor }}></div>
          <div className="h-1.5 w-1.5 rounded-full opacity-20" style={{ backgroundColor: activeDie.themeColor }}></div>
          <div className="h-1.5 w-1.5 rounded-full opacity-10" style={{ backgroundColor: activeDie.themeColor }}></div>
        </div>
      </main>

      {/* Sezione Azione */}
      <section className="w-full px-6 pb-12 flex flex-col items-center relative z-20">
        <button 
          onClick={roll}
          disabled={isRolling}
          className="glow-button flex w-full max-w-sm cursor-pointer items-center justify-center rounded-2xl h-18 text-white gap-3 text-lg font-black leading-normal tracking-wider transition-all active:scale-95 disabled:opacity-50"
          style={{ 
            backgroundColor: activeDie.themeColor,
            boxShadow: `0 8px 24px -4px ${activeDie.themeColor}66`
          }}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>casino</span>
          <span>{isRolling ? 'LANCIO...' : `LANCIA DADO ${activeDie.name.toUpperCase()}`}</span>
        </button>
      </section>

      {/* Sfondo decorativo */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none transition-all duration-1000">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/${activeDie.id}/800/1200')` }}></div>
      </div>
    </div>
  );
};

export default MainScreen;
