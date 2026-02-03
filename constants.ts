
import { Die, DieFace } from './types';

const createFaces = (texts: string[]): DieFace[] => 
  texts.map((text, i) => ({ id: i + 1, text }));

export const DEFAULT_DICE: Die[] = [
  {
    id: 'normal',
    name: 'Normale',
    icon: 'favorite',
    themeColor: '#ee2b8c',
    faces: createFaces([
      'Bacio da 2 minuti',
      'Fare massaggio da 10 minuti',
      'Abbraccio da 2 minuti',
      'Dire una frase dolce',
      'Guardarsi negli occhi per un minuto',
      '10 baci'
    ])
  },
  {
    id: 'hot',
    name: 'Piccante',
    icon: 'local_fire_department',
    themeColor: '#ff4d4d',
    faces: createFaces([
      'Togliti un indumento',
      'Fare orale per 5 minuti',
      'Dare baci per 5 minuti in diverse parti hot',
      'Dire una propria fantasia',
      'Fai quel che vuoi con le mani per 5 minuti',
      '69 per 5 minuti'
    ])
  },
  {
    id: 'bdsm',
    name: 'BDSM',
    icon: 'domino_mask',
    themeColor: '#9c27b0',
    faces: createFaces([
      'Raggiungi il limite del piacere senza venire',
      'Rimani bendato per i prossimi 3 giri',
      'Fatti legare una parte del corpo per i prossimi 3 round',
      'Fatti scrivere sul corpo per 5 minuti',
      'Obbedisci a qualsiasi cosa per 10 minuti',
      'Ricevi 10 schiaffi dove vuole l\'altro'
    ])
  },
  {
    id: 'custom',
    name: 'Mio Dado',
    icon: 'volunteer_activism',
    themeColor: '#4db6ac',
    faces: createFaces(['', '', '', '', '', ''])
  }
];
