// Serviços de API para comunicação com Firestore
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Busca jogadores por time masculino e feminino
export const fetchJogadores = async (time: 'masculino' | 'feminino') => {
  try {
    const jogadoresRef = collection(db, 'jogadores');
    const q = query(jogadoresRef, where('time', '==', time));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    return [];
  }
};

// Encontra partidas agendadas
export const fetchPartidas = async () => {
  try {
    const partidasRef = collection(db, 'partidas');
    const snapshot = await getDocs(partidasRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Erro ao buscar partidas:', error);
    return [];
  }
}; 