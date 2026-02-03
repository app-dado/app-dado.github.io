
import React, { useState } from 'react';
import { Die, DieFace } from '../types';

interface CustomizationScreenProps {
  die: Die;
  onUpdate: (faces: DieFace[]) => void;
  onBack: () => void;
}

const CustomizationScreen: React.FC<CustomizationScreenProps> = ({ die, onUpdate, onBack }) => {
  const [localFaces, setLocalFaces] = useState<DieFace[]>([...die.faces]);

  const handleInputChange = (id: number, val: string) => {
    setLocalFaces(prev => prev.map(f => f.id === id ? { ...f, text: val } : f));
  };

  const getFaceIcon = (id: number) => {
    const icons = ['looks_one', 'looks_two', 'looks_3', 'looks_4', 'looks_5', 'looks_6'];
    return icons[id - 1];
  };

  const labels = ['Faccia Uno', 'Faccia Due', 'Faccia Tre', 'Faccia Quattro', 'Faccia Cinque', 'Faccia Sei'];

  return (
    <div className="flex-1 flex flex-col bg-background-dark text-white overflow-hidden">
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between border-b border-white/10">
          <button 
            onClick={onBack}
            className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Personalizza {die.name}</h2>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50" style={{ color: die.themeColor }}>edizione {die.id}</span>
          </div>
          <div className="size-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-6 pt-8 pb-4">
          <h3 className="text-white tracking-light text-3xl font-bold leading-tight text-center">Aggiorna le Facce</h3>
          <p className="text-white/60 text-base font-normal leading-relaxed pt-3 text-center">
            Modifica le attività per il tuo dado <span style={{ color: die.themeColor }}>{die.name}</span>.
          </p>
        </div>

        <div className="px-6 space-y-4 mt-2">
          {localFaces.map((face, index) => (
            <div key={face.id} className="bg-[#2d1622] rounded-xl p-4 border border-[#482336] focus-within:border-primary transition-all shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div 
                  className={`text-white flex items-center justify-center rounded-lg size-9 shadow-lg transition-colors`}
                  style={{ backgroundColor: face.text ? die.themeColor : '#482336' }}
                >
                  <span className="material-symbols-outlined text-xl">{getFaceIcon(face.id)}</span>
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider opacity-60">{labels[index]}</span>
              </div>
              <input 
                className="w-full bg-[#3d1d2e] border-none rounded-lg text-white placeholder:text-white/20 focus:ring-2 py-3 px-4 transition-all" 
                style={{ '--tw-ring-color': die.themeColor } as any}
                placeholder="Inserisci un'attività..."
                value={face.text}
                onChange={(e) => handleInputChange(face.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-30">
        <button 
          onClick={() => onUpdate(localFaces)}
          className="w-full text-white font-bold py-4 rounded-xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          style={{ backgroundColor: die.themeColor }}
        >
          <span className="material-symbols-outlined">save</span>
          Salva Dado {die.name}
        </button>
      </div>

      <div className="absolute -top-10 -right-10 size-40 blur-[100px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: die.themeColor }}></div>
    </div>
  );
};

export default CustomizationScreen;
