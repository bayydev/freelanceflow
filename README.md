# 🚀 Flow

<div align="center">

![Flow](https://img.shields.io/badge/Micro--SaaS-Flow-06b6d4?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=flat-square&logo=supabase)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)

**Sistema de Produtividade de Precisão para Freelancers Criativos**

[Demonstração](#demonstração) • [Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Stack](#-stack-tecnológica)

</div>

---

## 📋 Sobre

O **Flow** é um Micro-SaaS desenvolvido especificamente para **designers gráficos**, **motion designers** e **editores de vídeo** que trabalham como freelancers. O sistema combina gestão de tempo inteligente, CRM de clientes, calculadora de preços e módulo financeiro em uma única plataforma com design cyberpunk moderno.

### 🎯 Para quem é?

- **Designers Gráficos** — Profissionais que trabalham com identidade visual, KVs, e peças gráficas
- **Motion Designers** — Criadores de animações, vinhetas e conteúdo animado
- **Editores de Vídeo** — Profissionais de edição, cortes e montagem de conteúdo audiovisual

---

## ✨ Funcionalidades

### 📅 Blocos de Tempo Inteligentes
Sistema dinâmico que gera uma rotina diária otimizada baseada no seu nicho de mercado:
- **B2B (Business to Business)** — Prospecção pela manhã, produção à tarde
- **B2C (Business to Consumer)** — Produção pela manhã, vendas à noite

Os blocos incluem:
- 🔍 **Radar de Tendências** — Aquecimento com referências de alto nível
- 🎯 **Prospecção Ativa** — Tempo dedicado para captar clientes
- 🧠 **Deep Work** — Foco total na produção sem distrações
- ⚡ **Admin** — Organização e planejamento
- ☕ **Descompressão** — Pausas estratégicas

### 💼 CRM / Pipeline de Vendas
Gerencie seus leads e clientes em um kanban visual:
- Status: Novo → Contatado → Negociando → Fechado/Perdido
- Acompanhamento de valor por lead
- Histórico de interações

### 💰 Calculadora de Preços
Precifique seus serviços de forma profissional:
- Cálculo baseado em complexidade e tempo
- Geração de propostas automáticas

### 📊 Módulo Financeiro
Controle suas finanças de freelancer:
- Entrada e saída de caixa
- Relatórios de faturamento
- Metas financeiras

### 📄 Gerador de Contratos (PDF)
Crie contratos profissionais personalizados com:
- Dados do contratante e cliente
- Escopo do projeto
- Condições de pagamento
- Termos e revisões

### 🎓 Módulo de Carreira
Conteúdo educacional para evolução profissional:
- Dicas específicas para cada área
- Recursos de aprendizado

### ⏱️ Timer Pomodoro
Técnica de produtividade integrada para manter o foco durante os blocos de trabalho.

### 🏆 Daily Win
Sistema de celebração diária para manter a motivação e consistência.

### 👑 Sistema Premium
Funcionalidades exclusivas com modelo de assinatura.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|------------|-----|
| **React 19** | Framework UI |
| **TypeScript 5.8** | Tipagem estática |
| **Vite 6** | Build tool & Dev server |
| **Supabase** | Autenticação & Banco de dados |
| **Tailwind CSS** | Estilização |
| **Lucide React** | Ícones |
| **jsPDF** | Geração de contratos em PDF |
| **Canvas Confetti** | Animações de celebração |

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/bayydev/freelanceflow.git
cd freelanceflow
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_supabase
```

4. **Configure o banco de dados**

Execute o script SQL no seu projeto Supabase:
```bash
# Abra o arquivo supabase_install.sql e execute no SQL Editor do Supabase
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:5173
```

---

## 🗂️ Estrutura do Projeto

```
freelanceflow/
├── components/
│   ├── AdminConsole.tsx      # Painel administrativo
│   ├── Auth.tsx              # Autenticação (Login/Registro)
│   ├── CareerModule.tsx      # Módulo de carreira
│   ├── CyberStore.tsx        # Loja premium
│   ├── DailyWin.tsx          # Celebração diária
│   ├── Dashboard.tsx         # Dashboard principal
│   ├── FinanceModule.tsx     # Módulo financeiro
│   ├── Onboarding.tsx        # Configuração inicial
│   ├── Pipeline.tsx          # CRM / Kanban de leads
│   ├── Pomodoro.tsx          # Timer Pomodoro
│   ├── PremiumModal.tsx      # Modal de upgrade
│   └── PricingCalculator.tsx # Calculadora de preços
├── services/
│   └── supabase.ts           # Cliente Supabase
├── App.tsx                   # Componente raiz
├── types.ts                  # Tipos TypeScript
├── constants.ts              # Constantes e algoritmo de blocos
├── index.html                # HTML principal
├── index.tsx                 # Entry point
└── vite.config.ts            # Configuração Vite
```

---

## 🔐 Autenticação

O Flow utiliza **Supabase Auth** com suporte a:
- ✉️ Magic Link (Login por e-mail)
- 🔑 Senha tradicional
- 📱 Verificação por telefone (opcional)

---

## 🎨 Design System

O projeto utiliza um tema **Cyberpunk/Tech** com:

| Cor | Hex | Uso |
|-----|-----|-----|
| Cyber Dark | `#020617` | Background principal |
| Cyber Panel | `#0f172a` | Painéis e cards |
| Cyber Primary | `#06b6d4` | Ações principais (Cyan) |
| Cyber Secondary | `#d946ef` | Destaques (Fuchsia) |
| Cyber Success | `#10b981` | Sucesso (Emerald) |

Fontes:
- **Inter** — Textos gerais
- **JetBrains Mono** — Código e números

---

## 📜 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
```

---

## 🚀 Deploy

O projeto está configurado para deploy fácil em:
- **Vercel** (Recomendado)
- **Netlify**
- **Railway**

---

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença proprietária. Todos os direitos reservados.

---

## 👨‍💻 Autor

Desenvolvido com 💜 por **Cauã**

[![Portfolio](https://img.shields.io/badge/Portfolio-visualcaua-06b6d4?style=flat-square)](https://beacons.ai/visualcaua)
[![Email](https://img.shields.io/badge/Email-contato.visualcaua%40gmail.com-d946ef?style=flat-square)](mailto:contato.visualcaua@gmail.com)

---

<div align="center">

**Flow** — Transformando freelancers em profissionais de elite ⚡

</div>
