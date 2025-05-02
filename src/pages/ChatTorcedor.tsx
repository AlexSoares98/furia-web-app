import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaUsers } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import Navbar from '../components/Navbar';
import OnlineUsers from '../components/OnlineUsers';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatTorcedor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bem-vindo ao Chat do Torcedor! Converse com outros torcedores da FURIA!',
      sender: 'sistema',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MAX_MESSAGE_LENGTH = 200;
  
  const user = JSON.parse(localStorage.getItem('user') || '{"nome": "Usuário"}');
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //Evitar XSS
  const sanitizeText = (text: string): string => {
    return DOMPurify.sanitize(text);
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
      sender: user.nome || 'Usuário',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Coluna de usuários online - escondida em mobile, visível a partir de md */}
          <div className="hidden md:block md:col-span-1">
            <OnlineUsers />
          </div>
          
          {/* Coluna do chat - ocupa tela inteira em mobile */}
          <div className="col-span-1 md:col-span-3 h-[calc(100vh-144px)]">
            <div className="flex flex-col h-full bg-zinc-900 rounded-lg overflow-hidden">
              <div className="flex items-center p-4 bg-zinc-800 border-b border-zinc-700">
                <FaUsers className="text-furia-primary text-xl mr-2" />
                <h3 className="font-orbitron text-white">Chat do Torcedor</h3>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === user.nome ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[75%] p-3 rounded-lg ${
                          message.sender === user.nome 
                            ? 'bg-furia-primary text-black' 
                            : message.sender === 'sistema'
                            ? 'bg-gray-700 text-white'
                            : 'bg-zinc-800 text-white'
                        }`}
                      >
                        {message.sender !== user.nome && message.sender !== 'sistema' && (
                          <div className="font-medium text-furia-primary text-sm mb-1">{message.sender}</div>
                        )}
                        <div className="whitespace-pre-line">{message.text}</div>
                        <div 
                          className={`text-xs mt-1 ${
                            message.sender === user.nome ? 'text-black text-opacity-70' : 'text-gray-400'
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
          </div>
          
          {/* Versão compacta de usuários online para mobile */}
          <div className="md:hidden">
            <div className="bg-zinc-900 rounded-lg p-4 mt-4">
              <h3 className="font-orbitron text-furia-primary text-lg mb-2">Usuários Online</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-zinc-800 text-white px-2 py-1 rounded text-xs flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  10 online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTorcedor; 