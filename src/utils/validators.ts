// Funções de validação para formulários e dados

// Valida email
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Verifica a senha 
export const isValidPassword = (password: string): boolean => {
  if (!password) return false;
  return password.length >= 6;
};

// Compara valores
export const valuesMatch = (value1: any, value2: any): boolean => {
  return value1 === value2;
};

// Previne ataques XSS 
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}; 