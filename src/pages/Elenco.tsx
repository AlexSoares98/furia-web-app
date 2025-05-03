import { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitch } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import fallenImage from '../assets/images/FalleN-furia.webp';
import yuurihImage from '../assets/images/yuurih-furia.webp';
import ksceratoImage from '../assets/images/KSCERATO-furia.webp';
import dropImage from '../assets/images/molodoy-furia.webp';
import yekindarImage from '../assets/images/YEKINDAR-furia.webp';
import gabsImage from '../assets/images/gabs-furia.webp';
import bizinhaImage from '../assets/images/bizinha-furia.webp';
import izaaImage from '../assets/images/izaa-furia.webp';
import lulitenzImage from '../assets/images/lulitenz-furia.webp';
import kaahSenseiImage from '../assets/images/kaahSENSEI furia.webp';
import backgroundImage from '../assets/images/background-furia.png';

interface Jogador {
  id: number;
  nome: string;
  nickname: string;
  funcao: string;
  nacionalidade: string;
  idade: number;
  bio: string;
  imagem: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
  };
}

const Elenco = () => {
  const [activeTab, setActiveTab] = useState<'masculino' | 'feminino'>('masculino');

  const jogadoresMasculinos: Jogador[] = [
    {
      id: 1,
      nome: 'Gabriel Toledo',
      nickname: 'FalleN',
      funcao: 'IGL/Rifler',
      nacionalidade: 'Brasileiro',
      idade: 33,
      bio: 'O "Professor" do CS brasileiro, lenda viva e duas vezes campeão de Major, retornou à FURIA em 2023 para liderar a equipe e agora assumindo o papel de Rifler.',
      imagem: fallenImage,
      socialMedia: {
        twitter: 'https://twitter.com/FalleNCS',
        instagram: 'https://www.instagram.com/fallen',
        twitch: 'https://www.twitch.tv/gaules'
      }
    },
    {
      id: 2,
      nome: 'Yuri Boian',
      nickname: 'yuurih',
      funcao: 'Rifler',
      nacionalidade: 'Brasileiro',
      idade: 25,
      bio: 'Um dos jogadores mais consistentes do Brasil, parte da FURIA desde 2018, conhecido por seu excelente aim e versatilidade.',
      imagem: yuurihImage,
      socialMedia: {
        twitter: 'https://twitter.com/yuurihcs',
        instagram: 'https://www.instagram.com/yuurihcs'
      }
    },
    {
      id: 3,
      nome: 'Kaike Cerato',
      nickname: 'KSCERATO',
      funcao: 'Rifler',
      nacionalidade: 'Brasileiro',
      idade: 25,
      bio: 'Considerado um dos maiores talentos do CS:GO brasileiro, é conhecido por sua precisão impressionante e jogadas inteligentes. Top 20 HLTV em 2020-22',
      imagem: ksceratoImage,
      socialMedia: {
        twitter: 'https://twitter.com/kscerato',
        instagram: 'https://www.instagram.com/kscerato'
      }
    },
    {
      id: 4,
      nome: 'Danil Golubenko',
      nickname: 'molodoy',
      funcao: 'AWPer',
      nacionalidade: 'Cazaquistão',
      idade: 20,
      bio: 'Reforço de 2025 vindo da AMKAL; apontado como "next-gen" pela comunidade.',
      imagem: dropImage,
      socialMedia: {
        twitter: 'https://x.com/tvoy_molodoy',
      }
    },
    {
      id: 5,
      nome: 'Mareks Gaļinskis',
      nickname: 'YEKINDAR',
      funcao: 'Entry Fragger',
      nacionalidade: 'Letônia',
      idade: 25,
      bio: 'Jogador de alto nível, reconhecido por seu estilo agressivo e habilidade como entry fragger, juntou-se à FURIA em 2025.',
      imagem: yekindarImage,
      socialMedia: {
        twitter: 'https://twitter.com/yek1ndar',
        instagram: 'https://www.instagram.com/yek1ndar'
      }
    }
  ];

  const jogadoresFemininos: Jogador[] = [
    {
      id: 1,
      nome: 'Gabriela Freindorfer',
      nickname: 'gabs',
      funcao: 'Rifler',
      nacionalidade: 'Brasileira',
      idade: 22,
      bio: 'Âncora de bomb, famosa pela utilitária precisa.',
      imagem: gabsImage,
      socialMedia: {
        twitter: 'https://twitter.com/gabsfps',
        instagram: 'https://www.instagram.com/gabsfps'
      }
    },
    {
      id: 2,
      nome: 'Bruna Marvila',
      nickname: 'bizinha',
      funcao: 'IGL',
      nacionalidade: 'Brasileira',
      idade: 26,
      bio: 'MVP da ESL Impact SA S7; liderança fria e mira de destaque.',
      imagem: bizinhaImage,
      socialMedia: {
        twitter: 'https://twitter.com/bizinhacs',
        instagram: 'https://www.instagram.com/bizinhacs'
      }
    },
    {
      id: 3,
      nome: 'Izabella Galle',
      nickname: 'izaa',
      funcao: 'Entry fragger',
      nacionalidade: 'Brasileira',
      idade: 23,
      bio: 'Shot-caller agressiva; costuma abrir espaço com flashes certeiras.',
      imagem: izaaImage,
      socialMedia: {
        twitter: 'https://twitter.com/izaafps',
        instagram: 'https://www.instagram.com/izaafps'
      }
    },
    {
      id: 4,
      nome: 'Lucia Dubra',
      nickname: 'lulitenz',
      funcao: 'Support',
      nacionalidade: 'Argentina',
      idade: 24,
      bio: 'Potencial clutch; primeira argentina a erguer troféu pela FURIA fe.',
      imagem: lulitenzImage,
      socialMedia: {
        twitter: 'https://twitter.com/lulitenz',
        instagram: 'https://www.instagram.com/lulitenz'
      }
    },
    {
      id: 5,
      nome: 'Karina Takahashi',
      nickname: 'kaahSENSEI',
      funcao: 'AWPer',
      nacionalidade: 'Brasileira',
      idade: 22,
      bio: 'Potencial clutch; primeira argentina a erguer troféu pela FURIA fe.',
      imagem: kaahSenseiImage,
      socialMedia: {
        twitter: 'https://twitter.com/kaahsensei',
        instagram: 'https://www.instagram.com/kaahsensei'
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-3xl font-orbitron text-furia-primary mb-6 text-center">Elenco FURIA CS</h2>
          
          {/* Tabs para selecionar entre masculino e feminino */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-800 p-1 rounded-full flex">
              <button
                onClick={() => setActiveTab('masculino')}
                className={`py-2 px-6 rounded-full transition-colors ${
                  activeTab === 'masculino'
                    ? 'bg-furia-primary text-black font-medium'
                    : 'text-white hover:text-furia-primary'
                }`}
              >
                Masculino
              </button>
              <button
                onClick={() => setActiveTab('feminino')}
                className={`py-2 px-6 rounded-full transition-colors ${
                  activeTab === 'feminino'
                    ? 'bg-furia-primary text-black font-medium'
                    : 'text-white hover:text-furia-primary'
                }`}
              >
                Feminino
              </button>
            </div>
          </div>
          
          {/* Grid de cards dos jogadores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'masculino' ? jogadoresMasculinos : jogadoresFemininos).map(jogador => (
              <motion.div
                key={jogador.id}
                whileHover={{ scale: 1.03 }}
                className="bg-zinc-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-64 overflow-hidden flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-50" 
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                  />
                  <img 
                    src={jogador.imagem} 
                    alt={jogador.nickname} 
                    className="w-[90%] h-[100%] object-contain hover:scale-105 transition-transform duration-500 relative z-10"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-furia-primary font-orbitron text-xl">{jogador.nickname}</h3>
                      <p className="text-gray-300 text-sm">{jogador.nome}</p>
                    </div>
                    <span className="bg-zinc-700 text-xs text-white px-2 py-1 rounded">
                      {jogador.funcao}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-gray-400 text-sm">
                      {jogador.nacionalidade} • {jogador.idade} anos
                    </span>
                  </div>
                  
                  <p className="text-white text-[16px] mb-4">{jogador.bio}</p>
                  
                  <div className="flex space-x-3">
                    {jogador.socialMedia.twitter && (
                      <a 
                        href={jogador.socialMedia.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <FaXTwitter />
                      </a>
                    )}
                    {jogador.socialMedia.instagram && (
                      <a 
                        href={jogador.socialMedia.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-400 transition-colors"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {jogador.socialMedia.twitch && (
                      <a 
                        href={jogador.socialMedia.twitch} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <FaTwitch />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Elenco; 