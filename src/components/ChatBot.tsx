import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import DOMPurify from 'dompurify';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Fala, torcedor da FURIA! Que prazer ter você aqui! Posso te ajudar com informações sobre nossos jogadores, partidas, títulos e muito mais! O que você quer saber? 😊',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MAX_MESSAGE_LENGTH = 200;

  const jogadoresMasculinos = [
    { nome: 'Gabriel "FalleN" Toledo', funcao: 'IGL / Rifle', info: 'O Professor! Lenda viva do CS brasileiro, FalleN é nosso IGL e rifler.' },
    { nome: 'Kaike "KSCERATO" Cerato', funcao: 'Rifle (anchor)', info: 'Monstro do CS! Um dos melhores anchors do mundo.' },
    { nome: 'Yuri "yuurih" Boian', funcao: 'Rifle (lurker)', info: 'Jogador versátil e consistente, especialista em lurk.' },
    { nome: 'Mareks "YEKINDAR" Gaļinskis', funcao: 'Entry fragger', info: 'O letão mais brasileiro! Entry fragger agressivo e explosivo.' },
    { nome: 'Danil "molodoy" Golubenko', funcao: 'AWP', info: 'Jovem prodígio do AWP, sniper principal da equipe.' },
  ];

  const jogadoresFemininos = [
    { nome: 'Bruna "bizinha" Marvila', funcao: 'AWP / IGL', info: 'Nossa capitã! AWPer e IGL do time feminino.' },
    { nome: 'Gabriela "gabs" Freindorfer', funcao: 'Rifle (support)', info: 'Jogadora experiente, dando suporte ao time.' },
    { nome: 'Izabella "izaa" Galle', funcao: 'Entry fragger', info: 'Entry fragger explosiva, abre espaços para a equipe.' },
    { nome: 'Karina "kaahSENSEI" Takahashi', funcao: 'Rifle', info: 'Rifler talentosa e precisa.' },
    { nome: 'Lucia "lulitenz" Dubra', funcao: 'Rifle / lurker', info: 'Especialista em lurk e situações clutch.' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sanitizeText = (text: string): string => {
    return DOMPurify.sanitize(text);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('jogadores')) {
      return 'Temos times incríveis! 🔥 Quer saber sobre qual time? Digite "masculino" ou "feminino" que eu te conto tudo! 😊';
    }

    if (lowerCaseMessage.includes('masculino')) {
      return '🏆 Time Masculino da FURIA:\n\n' + jogadoresMasculinos.map(j => `👤 ${j.nome} - ${j.funcao}\n${j.info}`).join('\n\n');
    }

    if (lowerCaseMessage.includes('feminino')) {
      return '🏆 Time Feminino da FURIA:\n\n' + jogadoresFemininos.map(j => `👤 ${j.nome} - ${j.funcao}\n${j.info}`).join('\n\n');
    }

    if (lowerCaseMessage.includes('partidas') || lowerCaseMessage.includes('jogos') || lowerCaseMessage.includes('próximo jogo')) {
      return '⚡ Quer saber das próximas partidas? Confira data, horário e link de transmissão no nosso site oficial: https://furia.gg/matches';
    }

    if (lowerCaseMessage.includes('placar') || lowerCaseMessage.includes('resultado')) {
      return '📊 Confira nosso último resultado e estatísticas no HLTV: https://www.hltv.org/team/8297/furia';
    }

    if (lowerCaseMessage.includes('curiosidades') || lowerCaseMessage.includes('história') || lowerCaseMessage.includes('desde quando')) {
      return '🐆 A FURIA foi fundada em 2017! Nossa pantera representa força, agilidade e determinação. Já fizemos história no CS mundial! 💪';
    }

    if (lowerCaseMessage.includes('títulos') || lowerCaseMessage.includes('campeonatos')) {
      return '🏆 Entre nossos títulos mais importantes está a ESL Pro League Season 12 NA (2020)! Que campanha incrível! 🔥';
    }

    if (lowerCaseMessage.includes('major') || lowerCaseMessage.includes('melhor momento')) {
      return '🎮 Um dos nossos momentos mais épicos foi a semifinal do IEM Rio Major 2022! A arena lotada, aquela energia incrível... Inesquecível! 🇧🇷';
    }

    if (lowerCaseMessage.includes('highlights') || lowerCaseMessage.includes('vídeos')) {
      return '🎥 Quer ver jogadas épicas? Confira nossa playlist oficial no YouTube: https://www.youtube.com/@FURIAgg';
    }

    if (lowerCaseMessage.includes('quiz')) {
      return '❓ Quer testar seus conhecimentos sobre a FURIA? Acesse nossa aba de Quiz e mostre que você é um verdadeiro fã! 🎯';
    }

    return 'Ei, torcedor! 😊 Posso te ajudar com:\n\n' +
           '• Informações sobre nossos jogadores (masculino/feminino)\n' +
           '• Próximas partidas e resultados\n' +
           '• História e curiosidades da FURIA\n' +
           '• Títulos e momentos icônicos\n' +
           '• Highlights e conteúdo multimídia\n' +
           '• Quiz para testar seu conhecimento\n\n' +
           'É só perguntar!';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');
    
    if (!inputValue.trim()) return;
    
    if (inputValue.length > MAX_MESSAGE_LENGTH) {
      setInputError(`A mensagem é muito longa. Limite de ${MAX_MESSAGE_LENGTH} caracteres.`);
      return;
    }
    
    const sanitizedInput = sanitizeText(inputValue.trim());
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: sanitizedInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(sanitizedInput),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, Math.random() * 1000 + 500);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-lg overflow-hidden">
      <div className="flex items-center p-4 bg-zinc-800 border-b border-zinc-700">
        <FaRobot className="text-furia-primary text-xl mr-2" />
        <h3 className="font-orbitron text-white">FURIA Bot</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-furia-primary text-black' 
                    : 'bg-zinc-800 text-white'
                }`}
              >
                <div className="whitespace-pre-line">{message.text}</div>
                <div 
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-black text-opacity-70' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-700 bg-zinc-800">
        {inputError && (
          <div className="text-red-400 text-sm mb-2">{inputError}</div>
        )}
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-zinc-700 text-white p-2 rounded-l-md focus:outline-none"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <button 
            type="submit"
            className="bg-furia-primary text-black p-2 rounded-r-md hover:bg-opacity-80 transition-colors"
          >
            <FaPaperPlane />
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {inputValue.length}/{MAX_MESSAGE_LENGTH} caracteres
        </div>
      </form>
    </div>
  );
};

export default ChatBot; 