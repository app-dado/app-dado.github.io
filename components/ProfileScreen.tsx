
import React from 'react';
import { Die, DieFace } from '../types';

interface ProfileScreenProps {
  allDice: Die[];
  lastRoll: DieFace | null;
  onEditDie: (id: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ allDice, lastRoll, onEditDie }) => {
  return (
    <div className="flex-1 flex flex-col bg-background-dark text-white p-6 overflow-y-auto no-scrollbar pb-10">
      <div className="mt-8 text-center mb-10">
        <div className="size-24 rounded-full bg-[#ee2b8c]/10 border-2 border-[#ee2b8c]/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_-5px_#ee2b8c66] relative overflow-hidden group">
           {/* Background decorative glow */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#ee2b8c]/20 to-transparent"></div>
           
           {/* Die Icon as Logo */}
           <span className="material-symbols-outlined text-5xl text-primary animate-pulse transition-transform duration-500 group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>
             casino
           </span>
           
           {/* Decorative ring */}
           <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none"></div>
        </div>
        
        {lastRoll ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Ultimo Lancio</p>
            <h2 className="text-xl font-bold px-4 leading-tight italic">"{lastRoll.text}"</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">La Tua Collezione</h2>
            <p className="text-white/40 mt-2 italic text-sm">Personalizza i tuoi momenti</p>
          </div>
        )}
      </div>

      <div className="w-full space-y-8">
        {allDice.map((die) => (
          <div key={die.id} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${die.themeColor}22` }}>
                   <span className="material-symbols-outlined text-xl" style={{ color: die.themeColor }}>{die.icon}</span>
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: die.themeColor }}>Dado {die.name}</h3>
              </div>
              <button 
                onClick={() => onEditDie(die.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifica
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {die.faces.map((face) => (
                <div 
                  key={`${die.id}-${face.id}`} 
                  className={`flex items-center gap-2 p-3 rounded-xl border bg-[#2d1622]/50 border-[#482336]/30 backdrop-blur-sm transition-all`}
                >
                  <div className="size-5 rounded flex items-center justify-center font-black text-[9px] shrink-0 bg-[#3d1d2e] text-white/40">
                    {face.id}
                  </div>
                  <p className="text-[10px] font-semibold leading-tight text-white/80 truncate">
                    {face.text || <span className="opacity-20 italic">Non impostato</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pb-4 opacity-20 text-[9px] text-center uppercase font-black tracking-[0.4em] leading-relaxed">
        <p>Amore • Passione • Gioco • Libertà</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
