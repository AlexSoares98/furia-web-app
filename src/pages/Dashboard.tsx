import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';
import OnlineUsers from '../components/OnlineUsers';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Coluna de usuários online */}
          <div className="hidden md:block md:col-span-1">
            <OnlineUsers />
          </div>
          
          {/* Coluna do chat bot */}
          <div className="col-span-1 md:col-span-3 h-[calc(100vh-144px)]">
            <ChatBot />
          </div>
          
          {/* Versão compacta de usuários online */}
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

export default Dashboard; 