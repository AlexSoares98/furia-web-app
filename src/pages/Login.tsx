import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../firebase/config';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaTelegram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/images/background-furia.png';
import logoImage from '../assets/images/logo-furia.png';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

// Interface para os erros de validação
interface ValidationErrors {
  nome?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Limpar erros ao trocar entre login e cadastro
  useEffect(() => {
    setError('');
    setValidationErrors({});
  }, [isLogin]);

  // Validação de campos
  const validateFields = (): boolean => {
    const errors: ValidationErrors = {};
    
    // Validação de email
    if (!email) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido';
    }
    
    // Validação de senha
    if (!password) {
      errors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    // Validações adicionais para cadastro
    if (!isLogin) {
      if (!nome) {
        errors.nome = 'Nome é obrigatório';
      }
      
      if (!confirmPassword) {
        errors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'As senhas não coincidem';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Verificar validação dos campos
    if (!validateFields()) {
      return;
    }
    
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          setError('As senhas não coincidem');
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // Armazenar informações do usuário
      localStorage.setItem('user', JSON.stringify({ email, nome }));
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Erro de autenticação:", error.code); 
      
      let userFriendlyMessage = 'Ocorreu um erro. Tente novamente.';
      
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          userFriendlyMessage = 'Email ou senha incorretos';
          break;
        case 'auth/email-already-in-use':
          userFriendlyMessage = 'Este email já está sendo usado';
          break;
        case 'auth/weak-password':
          userFriendlyMessage = 'A senha deve ter pelo menos 6 caracteres';
          break;
        case 'auth/network-request-failed':
          userFriendlyMessage = 'Erro de conexão. Verifique sua internet.';
          break;
      }
      
      setError(userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 text-white mb-8 md:mb-0"
          >
            <img src={logoImage} alt="FURIA" className="h-20 mb-6" />
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              ENTRE NO <span className="text-furia-primary">UNIVERSO FURIA</span>
            </h1>
            <p className="text-lg mb-6">
              Faça parte do time e acompanhe as novidades, partidas e interaja com o bot da FURIA.
            </p>
            
            {/* Feature Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4"
              >
                <h3 className="font-orbitron text-furia-primary mb-2">Chat Bot</h3>
                <p className="text-[16px]">Converse com o bot inteligente da FURIA para obter informações e novidades</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4"
              >
                <h3 className="font-orbitron text-furia-primary mb-2">Quiz</h3>
                <p className="text-[16px]">Teste seus conhecimentos sobre a FURIA e Counter-Strike</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-4"
              >
                <h3 className="font-orbitron text-furia-primary mb-2">Elenco</h3>
                <p className="text-[16px]">Conheça os jogadores dos times masculino e feminino da FURIA</p>
              </motion.div>
            </div>

            {/* Telegram Button */}
            <a 
              href="https://t.me/GGFuria_Bot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center mt-8 bg-blue-500 hover:bg-blue-600 text-white font-orbitron py-2 px-4 rounded-md transition-all duration-300"
            >
              <FaTelegram className="mr-2" />
              Bot Telegram FURIA
            </a>
          </motion.div>
          
          {/* Login/Register Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-5/12 glass-effect p-8 rounded-lg"
          >
            <h2 className="text-2xl font-orbitron text-furia-primary mb-6 text-center">
              {isLogin ? 'Login' : 'Cadastro'}
            </h2>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-2 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-white text-sm mb-2" htmlFor="nome">
                    Nome
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      id="nome"
                      type="text"
                      className={`input-primary w-full pl-10 ${validationErrors.nome ? 'border-red-500' : ''}`}
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  {validationErrors.nome && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.nome}</p>
                  )}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-white text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`input-primary w-full pl-10 ${validationErrors.email ? 'border-red-500' : ''}`}
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-white text-sm mb-2" htmlFor="password">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`input-primary w-full pl-10 pr-10 ${validationErrors.password ? 'border-red-500' : ''}`}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-400" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-400 text-xs mt-1">{validationErrors.password}</p>
                )}
              </div>
              
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-white text-sm mb-2" htmlFor="confirmPassword">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`input-primary w-full pl-10 pr-10 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              )}
              
              <button
                type="submit"
                className="btn-primary w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
              
              <div className="text-center text-white">
                <button
                  type="button"
                  className="text-furia-primary hover:underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login; 