import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Elenco from './pages/Elenco';
import ChatTorcedor from './pages/ChatTorcedor';
import backgroundImage from './assets/images/background-furia.png';

// Contexto de autenticação global
export const AuthContext = createContext<{
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
}>({
  isAuthenticated: false,
  isLoading: true,
  userId: null
});

// Protege rotas contra acesso não autorizado
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-furia-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Monitora mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
        
        // Salva dados do usuário localmente
        const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...userInfo,
          email: user.email,
          uid: user.uid
        }));
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.removeItem('user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Captura erros não tratados
    const handleError = (event: ErrorEvent) => {
      console.error('Erro capturado:', event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userId }}>
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="min-h-screen bg-zinc-950 bg-opacity-80">
          <Router>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/quiz" 
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/elenco" 
                element={
                  <ProtectedRoute>
                    <Elenco />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat-torcedor" 
                element={
                  <ProtectedRoute>
                    <ChatTorcedor />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
