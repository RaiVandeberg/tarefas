# 📋 Tarefas+

Tarefas+ é uma aplicação web desenvolvida com **Next.js** que auxilia na organização de tarefas e estudos de forma eficiente. Permite criar, gerenciar e compartilhar tarefas públicas ou privadas, proporcionando uma experiência intuitiva e moderna.

## 🚀 Funcionalidades

- ✅ Cadastro de tarefas com título e visibilidade (pública ou privada)
- 📋 Listagem de tarefas cadastradas
- 🔗 Compartilhamento de tarefas públicas
- 🔐 Autenticação de usuários com NextAuth
- ☁️ Persistência de dados utilizando Firebase
- 💬 Alertas personalizados para feedbacks de ações

## 🛠️ Tecnologias Utilizadas

- Next.js  
- React  
- Firebase  
- NextAuth  
- React Icons  
- React Hot Toast  

## 📁 Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar o desenvolvimento e a manutenção:

```bash
tarefas/
├── .next/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── header/
│ │ │ ├── index.tsx
│ │ │ └── styles.module.css
│ │ └── textarea/
│ │ ├── index.tsx
│ │ └── styles.module.css
│ ├── pages/
│ │ ├── api/
│ │ │ └── auth/
│ │ │ └── [...nextauth].ts
│ │ ├── dashboard/
│ │ │ ├── deleteTask.tsx
│ │ │ ├── index.tsx
│ │ │ └── styles.module.css
│ │ ├── task/
│ │ │ ├── [id].tsx
│ │ │ ├── _document.tsx
│ │ │ ├── index.tsx
│ │ │ └── style.module.css
│ │ ├── _app.tsx
│ ├── services/
│ │ └── firebaseConnection.ts
│ └── styles/
│ ├── globals.css
│ └── home.module.css
├── .env
├── .gitignore
├── README.md
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json

```


## ⚙️ Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/RaiVandeberg/tarefas.git
```

2. Acesse o diretório do projeto:

```bash
cd tarefas
```

3. Instale as dependências:

```bash
npm install
# ou
yarn install

```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev

```

Abra http://localhost:3000 no seu navegador para visualizar a aplicação.

🔐 Configuração do Firebase e NextAuth
Para utilizar o Firebase e o NextAuth, é necessário configurar as variáveis de ambiente. Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

💡 Contribuindo
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
