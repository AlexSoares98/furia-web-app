import { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([
    { id: 1, name: 'FalleN.FURIA', status: 'online' },
    { id: 2, name: 'Neymar.FURIA', status: 'online' },
    { id: 3, name: 'Alex.FURIA', status: 'away' },
    { id: 4, name: 'Pedro.FURIA', status: 'online' },
    { id: 5, name: 'Lucas.FURIA', status: 'offline' },
    { id: 6, name: 'Gabriel.FURIA', status: 'online' },
    { id: 7, name: 'Bruno.FURIA', status: 'away' },
    { id: 8, name: 'Rafael.FURIA', status: 'online' },
    { id: 9, name: 'João.FURIA', status: 'online' },
    { id: 10, name: 'Miguel.FURIA', status: 'offline' },
  ]);

  // Simula mudanças de status a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prevUsers => 
        prevUsers.map(user => {
          if (Math.random() > 0.8) {
            const statuses = ['online', 'away', 'offline'];
            const currentIndex = statuses.indexOf(user.status);
            const newIndex = (currentIndex + 1) % statuses.length;
            return { ...user, status: statuses[newIndex] };
          }
          return user;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 h-full">
      <h3 className="font-orbitron text-furia-primary text-lg mb-4">Usuários Online</h3>
      
      <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2">
        {onlineUsers.map(user => (
          <div 
            key={user.id}
            className="flex items-center p-2 rounded hover:bg-zinc-800 transition-colors"
          >
            <FaCircle className={`${getStatusColor(user.status)} text-xs mr-2`} />
            <span className="text-white text-sm truncate">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers; 