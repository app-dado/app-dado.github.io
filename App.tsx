
import React, { useState, useEffect } from 'react';
import { AppTab, Die, DieFace } from './types';
import { DEFAULT_DICE } from './constants';
import MainScreen from './components/MainScreen';
import CustomizationScreen from './components/CustomizationScreen';
import ProfileScreen from './components/ProfileScreen';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DICE);
  const [allDice, setAllDice] = useState<Die[]>(() => {
    const saved = localStorage.getItem('romantic-all-dice');
    return saved ? JSON.parse(saved) : DEFAULT_DICE;
  });
  const [activeDieId, setActiveDieId] = useState<string>(() => {
    return localStorage.getItem('active-die-id') || 'normal';
  });
  const [editingDieId, setEditingDieId] = useState<string | null>(null);
  const [lastRoll, setLastRoll] = useState<DieFace | null>(null);

  useEffect(() => {
    localStorage.setItem('romantic-all-dice', JSON.stringify(allDice));
  }, [allDice]);

  useEffect(() => {
    localStorage.setItem('active-die-id', activeDieId);
  }, [activeDieId]);

  const activeDie = allDice.find(d => d.id === activeDieId) || allDice[0];
  const editingDie = allDice.find(d => d.id === editingDieId) || activeDie;

  const handleRoll = (resultFace: DieFace) => {
    setLastRoll(resultFace);
  };

  const handleUpdateDie = (updatedFaces: DieFace[]) => {
    const targetId = editingDieId || activeDieId;
    const newDice = allDice.map(d => 
      d.id === targetId ? { ...d, faces: updatedFaces } : d
    );
    setAllDice(newDice);
    setEditingDieId(null);
    setActiveTab(AppTab.PROFILE); // Torna al profilo dopo il salvataggio
  };

  const startEditing = (id: string) => {
    setEditingDieId(id);
    setActiveTab(AppTab.CUSTOMIZE);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DICE:
        return (
          <MainScreen 
            activeDie={activeDie}
            allDice={allDice}
            onSelectDie={setActiveDieId}
            onRoll={handleRoll} 
          />
        );
      case AppTab.CUSTOMIZE:
        return (
          <CustomizationScreen 
            die={editingDie}
            onUpdate={handleUpdateDie}
            onBack={() => {
              setEditingDieId(null);
              setActiveTab(AppTab.PROFILE);
            }}
          />
        );
      case AppTab.PROFILE:
        return (
          <ProfileScreen 
            allDice={allDice} 
            lastRoll={lastRoll} 
            onEditDie={startEditing}
          />
        );
      default:
        return <MainScreen activeDie={activeDie} allDice={allDice} onSelectDie={setActiveDieId} onRoll={handleRoll} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
