# FURIA Web App - Prototipo

Este projeto é um protótipo de aplicação web para a FURIA Esports, focado no time de CS. Inclui funcionalidades de autenticação, chat bot, quiz e informações sobre os times.

## Funcionalidades

- **Autenticação Segura**: Sistema de login e cadastro com Firebase Auth
- **Chat Bot**: Converse com o bot da FURIA para obter informações sobre jogadores, partidas e mais
- **Quiz**: Teste seus conhecimentos sobre a FURIA e Counter-Strike com um ranking salvo localmente
- **Elenco**: Explore os jogadores dos times masculino e feminino da FURIA com detalhes e fotos
- **Lista de Usuários**: Simulação de usuários online com status dinâmicos

## Tecnologias 

- **React** + **TypeScript**: Para a interface de usuário
- **Vite**: Como bundler e ferramenta de desenvolvimento
- **TailwindCSS**: Para estilização moderna e responsiva
- **Firebase Auth**: Para autenticação segura
- **Framer Motion**: Para animações fluidas
- **React Router**: Para navegação entre páginas
- **LocalStorage**: Para armazenamento de dados do ranking

## Medidas de Segurança 

- **Proteção contra XSS**: Sanitização de entradas do usuário usando DOMPurify
- **Validação de Formulários**: Validação completa nos formulários de login e cadastro
- **Rotas Protegidas**: Middleware de autenticação para proteger rotas privadas
- **Tratamento de Erros**: Mensagens de erro amigáveis sem expor detalhes técnicos
- **Limitação de Tamanho**: Limitação no tamanho das mensagens do chat para evitar spam

## Pré-requisitos

- Node.js (v14+)
- npm ou yarn

## Instalação e Execução

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/furia-web-app.git
cd furia-web-app
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

4. Acesse o aplicativo no navegador
```
http://localhost:5173
```

