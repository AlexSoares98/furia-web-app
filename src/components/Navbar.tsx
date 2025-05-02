import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaDoorOpen, FaQuestionCircle, FaUsers, FaComments, FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import logoImage from '../assets/images/logo-furia.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { nome: 'Usuário', email: '' };
  });

  // Realiza logout e redireciona para login
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-zinc-900 shadow-lg py-4 border-b border-furia-primary">
      <div className="container mx-auto px-4">
        {/* Header com logo e botão de menu */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logoImage} alt="FURIA" className="h-8 mr-4" />
            <span className="text-white font-orbitron text-xl">FURIA</span>
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          
          {/* Menu para desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/dashboard' ? 'text-furia-primary' : 'text-white'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <FaDoorOpen className="mr-1" />
                Chat BOT
              </motion.div>
            </Link>
            
            <Link to="/chat-torcedor" className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/chat-torcedor' ? 'text-furia-primary' : 'text-white'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <FaComments className="mr-1" />
                Chat do Torcedor
              </motion.div>
            </Link>
            
            <Link to="/quiz" className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/quiz' ? 'text-furia-primary' : 'text-white'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <FaQuestionCircle className="mr-1" />
                Quiz
              </motion.div>
            </Link>
            
            <Link to="/elenco" className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/elenco' ? 'text-furia-primary' : 'text-white'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <FaUsers className="mr-1" />
                Elenco
              </motion.div>
            </Link>
            
            <div className="border-l border-gray-700 h-6 mx-2"></div>
            
            <div className="text-white text-[16px]">
              <span className="font-rajdhani">{user.nome}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500 text-[16px] font-rajdhani flex items-center"
            >
              <FaSignOutAlt className="mr-1" />
              Sair
            </motion.button>
          </div>
        </div>
        
        {/* Menu para mobile */}
        {menuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/dashboard' ? 'text-furia-primary' : 'text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center py-2">
                  <FaDoorOpen className="mr-2" />
                  Chat BOT
                </div>
              </Link>
              
              <Link 
                to="/chat-torcedor" 
                className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/chat-torcedor' ? 'text-furia-primary' : 'text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center py-2">
                  <FaComments className="mr-2" />
                  Chat do Torcedor
                </div>
              </Link>
              
              <Link 
                to="/quiz" 
                className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/quiz' ? 'text-furia-primary' : 'text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center py-2">
                  <FaQuestionCircle className="mr-2" />
                  Quiz
                </div>
              </Link>
              
              <Link 
                to="/elenco" 
                className={`text-[16px] font-rajdhani font-medium ${location.pathname === '/elenco' ? 'text-furia-primary' : 'text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center py-2">
                  <FaUsers className="mr-2" />
                  Elenco
                </div>
              </Link>
              
              <div className="border-t border-gray-700 pt-4 mt-2">
                <div className="text-white text-[16px] mb-4">
                  <span className="font-rajdhani">{user.nome}</span>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-400 hover:text-red-500 text-[16px] font-rajdhani flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 