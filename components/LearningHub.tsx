import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { supabase } from '../services/supabase';
import {
    ArrowLeft, BookOpen, GraduationCap, CheckCircle2, Circle, Lock,
    ChevronRight, Star, Crown, Briefcase, Image, Menu, X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ==================== TIPOS ====================
interface LearningHubProps {
    user: User;
    onBack: () => void;
    onRequestUpgrade: () => void;
}

interface Lesson {
    id: string;
    title: string;
    isFree: boolean;
    content: string;
    module?: string;
}

interface Course {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    lessons: Lesson[];
    color: string;
}

// ==================== CONTEÚDO: PHOTOSHOP AULA 1 ====================
const PHOTOSHOP_LESSON_1 = `
### OBJETIVO DA AULA

Criar sua primeira arte no Photoshop: um post para Instagram (1080x1350px) com fundo colorido e texto. Você vai dominar a interface básica e exportar um arquivo profissional.

**Por que isso importa?** Posts de redes sociais são 70% dos trabalhos de freelancers iniciantes. Saber criar rapidamente = mais entregas = mais dinheiro.

---

### DURAÇÃO ESTIMADA: 25 minutos

### FERRAMENTAS ABORDADAS
- Interface do Photoshop (painéis essenciais)
- Novo Documento (Arquivo > New)
- Ferramenta Retangulo (U)
- Ferramenta Texto (T)
- Exportar Como (Ctrl+Shift+Alt+W)

---

### TEORIA (30%)

#### A Interface do Photoshop

Quando você abre o Photoshop pela primeira vez, pode parecer intimidador. Mas você só precisa conhecer 4 áreas:

1. **Barra de Ferramentas** (esquerda): Todas as ferramentas de criação
2. **Painel de Layers** (direita, embaixo): Onde você organiza elementos
3. **Barra de Opções** (topo): Configurações da ferramenta ativa
4. **Área de Trabalho** (centro): Onde sua arte aparece

**Analogia:** Pense no Photoshop como uma mesa de trabalho. As ferramentas ficam à esquerda (como lápis, tesoura), os layers são folhas empilhadas uma sobre a outra, e o centro é seu papel.

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Criar Novo Documento

1. Abra o Photoshop
2. Vá em **Arquivo > New** (ou Ctrl+N)
3. Na janela que abrir, configure:
   - **Width:** 1080 pixels
   - **Height:** 1350 pixels
   - **Resolution:** 72 pixels/inch (padrão para web)
   - **Color Mode:** RGB Color
   - **Background:** White
4. Clique em **Create**

**DICA PRO:** Atalho \`Ctrl+N\` abre direto a janela de novo documento.

**ERRO COMUM:** Usar resolução 300 para web. Isso deixa o arquivo pesado sem necessidade. Use 72 para digital.

---

#### PASSO 2: Criar Fundo Colorido

1. Na barra de ferramentas (esquerda), clique e segure no ícone de retângulo (4º de cima para baixo)
2. Selecione **Ferramenta Retangulo**
3. Na barra de opções (topo), mude de "Path" para **Shape**
4. Clique no quadrado de **Fill** (preenchimento) e escolha uma cor (ex: #1E3A5F - azul escuro)
5. Clique e arraste para cobrir todo o documento

**DICA PRO:** Segure Shift enquanto arrasta para manter proporção perfeita.

---

#### PASSO 3: Adicionar Texto

1. Pressione **T** no teclado (ativa Ferramenta Texto)
2. Clique no centro do documento
3. Digite: "SUA MENSAGEM AQUI"
4. Com o texto selecionado, vá na barra de opções (topo) e configure:
   - **Fonte:** Arial Black (ou qualquer bold)
   - **Tamanho:** 72pt
   - **Cor:** Branco (#FFFFFF)
5. Use **Ctrl+T** para redimensionar se necessário

**DICA PRO:** \`Ctrl+Enter\` confirma o texto. \`Esc\` cancela.

**ERRO COMUM:** Texto pequeno demais. Em posts de Instagram, o texto principal deve ter no mínimo 48pt para boa leitura em mobile.

---

#### PASSO 4: Organizar Layers

1. Olhe o painel **Layers** (direita, embaixo)
2. Você deve ter:
   - Layer do texto (em cima)
   - Layer do retângulo (meio)
   - Background (embaixo)
3. Renomeie clicando duas vezes no nome: "texto-principal", "fundo", "background"

**Por que isso importa?** Organização de layers é FUNDAMENTAL. Clientes pedem alterações, e se seu arquivo for bagunçado, você perde tempo.

---

#### PASSO 5: Exportar JPEG Profissional

1. Vá em **Arquivo > Export > Exportar Como** (Ctrl+Shift+Alt+W)
2. Configure:
   - **Format:** JPG
   - **Quality:** 80% (equivalente ao Q11 - ótimo equilíbrio tamanho/qualidade)
   - Verifique se **Width: 1080px** e **Height: 1350px**
3. Clique em **Export**
4. Escolha pasta e nome: "post-instagram-01.jpg"

**DICA PRO:** JPEG Quality 80% (Q11) é o padrão profissional. Abaixo de 60% perde qualidade visível.

---

### PROJETO PRÁTICO

**Desafio:** Criar post de Instagram para uma cafeteria fictícia

**Briefing:**
- **Objetivo:** Anunciar promoção de café
- **Dimensões:** 1080x1350px
- **Texto:** "CAFÉ EXPRESSO R$ 5,90" (headline) + "Só hoje!" (subtítulo)
- **Cores:** Fundo marrom (#4A2C2A), texto branco
- **Entregável:** JPEG Quality 80%

**Passo a passo resumido:**
1. Novo documento 1080x1350px
2. Ferramenta Retangulo > fundo marrom
3. Ferramenta Texto > headline 72pt centralizado
4. Ferramenta Texto > subtítulo 36pt abaixo
5. Exportar Como > JPEG 80%

**Critérios de sucesso:**
- Dimensões corretas (1080x1350)
- Texto legível (mínimo 36pt)
- Arquivo exportado em JPEG (não PSD)

---

### ERROS A EVITAR

**Erro 1:** Salvar como PSD e enviar ao cliente
**Solução:** Sempre exportar JPEG/PNG para entrega final

**Erro 2:** Resolução 300dpi para web
**Solução:** Use 72dpi para digital, 300dpi só para impressão

**Erro 3:** Não organizar layers
**Solução:** Renomeie cada layer imediatamente após criar

---

### ATALHOS DESTA AULA

- \`Ctrl+N\` - Novo documento
- \`T\` - Ferramenta Texto
- \`U\` - Shape Tools
- \`Ctrl+T\` - Transform (redimensionar)
- \`Ctrl+Shift+Alt+W\` - Exportar Como

**Próxima aula:** "Dominando Layers" - Você vai aprender a organizar, agrupar e usar máscaras básicas.

---

### FAQ

**P: Posso usar PNG em vez de JPEG?**
R: Sim! Use PNG quando precisar de fundo transparente. Para posts com fundo sólido, JPEG é menor e mais rápido.

**P: Qual a diferença entre Save e Export?**
R: Save (Ctrl+S) salva o arquivo editável (.PSD). Export cria uma cópia otimizada para uso final (JPEG/PNG).

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 2 ====================
const PHOTOSHOP_LESSON_2 = `
### OBJETIVO DA AULA

Dominar o painel de Layers: renomear, duplicar, agrupar em pastas, controlar visibilidade e opacidade. Você vai criar uma arte organizada com 5 layers estruturadas profissionalmente.

**Por que isso importa?** Layers são a espinha dorsal do Photoshop. Arquivos desorganizados = retrabalho = menos lucro. Designers profissionais são reconhecidos pela organização impecável.

---

### DURAÇÃO ESTIMADA: 30 minutos

### FERRAMENTAS ABORDADAS
- Painel Camadas (F7)
- Renomear layers
- Duplicar layers (Ctrl+J)
- Criar pastas/grupos (Ctrl+G)
- Visibilidade (ícone do olho)
- Opacidade e Fill

---

### TEORIA (30%)

#### O Conceito de Layers

Imagine layers como **folhas de papel transparente empilhadas**. Cada folha pode ter um desenho diferente, e quando você olha de cima, vê todas sobrepostas formando a imagem final.

**Regras fundamentais:**
- Layer de cima cobre a de baixo
- Áreas transparentes deixam ver o que está abaixo
- Você pode reorganizar a ordem arrastando
- Cada layer pode ser editada independentemente

#### Anatomia do Painel de Layers

O painel fica no canto direito (Janela > Layers ou F7). Elementos importantes:

1. **Thumbnail**: Prévia do conteúdo da layer
2. **Nome**: Identifica a layer (clique duplo para renomear)
3. **Olho**: Controla visibilidade (clique para esconder/mostrar)
4. **Cadeado**: Protege a layer de edições
5. **Opacidade**: Transparência geral (0-100%)
6. **Fill**: Transparência do conteúdo (ignora efeitos)

#### Diferença entre Opacidade e Fill

- **Opacidade**: Afeta TUDO na layer (conteúdo + efeitos)
- **Fill**: Afeta apenas o CONTEÚDO (efeitos ficam 100%)

**Quando usar Fill?** Quando você quer um texto com sombra visível mas o texto em si transparente (efeito "vidro").

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Criar Documento Base

1. **Arquivo > New** (Ctrl+N)
2. Configure: 1080x1080px, 72dpi, RGB
3. Clique em **Create**

---

#### PASSO 2: Criar a Primeira Layer (Fundo)

1. Selecione a ferramenta **Ferramenta Retangulo** (U)
2. Desenhe um retângulo cobrindo todo o documento
3. Cor: #1A1A2E (azul escuro)
4. No painel Layers, **clique duplo** no nome "Rectangle 1"
5. Renomeie para: **"BG - Fundo Principal"**

**DICA PRO:** Use prefixos para organizar: BG (background), TXT (texto), IMG (imagem), FX (efeitos).

---

#### PASSO 3: Duplicar Layer

1. Selecione a layer "BG - Fundo Principal"
2. Pressione **Ctrl+J** (duplica a layer)
3. Uma nova layer aparece: "BG - Fundo Principal copy"
4. Renomeie para: **"Overlay - Gradiente"**
5. Com essa layer selecionada, mude a cor para um gradiente ou cor diferente

**ERRO COMUM:** Duplicar usando Ctrl+C/Ctrl+V. Isso cria a cópia no centro do documento. Use Ctrl+J para duplicar no mesmo lugar.

---

#### PASSO 4: Adicionar Elementos de Texto

1. Pressione **T** (Ferramenta Texto)
2. Digite: "DOMINANDO LAYERS"
3. Fonte: Arial Black, 60pt, cor branca
4. Renomeie a layer para: **"TXT - Título Principal"**

5. Crie outro texto: "Aula 02 - Photoshop"
6. Fonte: Arial, 24pt, cor #00D9FF (cyan)
7. Renomeie para: **"TXT - Subtítulo"**

---

#### PASSO 5: Criar Pasta/Grupo

1. Segure **Ctrl** e clique nas duas layers de texto para selecioná-las
2. Pressione **Ctrl+G** (cria grupo)
3. Uma pasta aparece contendo as duas layers
4. Renomeie a pasta para: **"textos"**

**Por que usar pastas?**
- Organização visual
- Mover múltiplas layers de uma vez
- Aplicar efeitos ao grupo inteiro
- Colapsar para economizar espaço no painel

---

#### PASSO 6: Controlar Visibilidade

1. No painel Layers, localize o **ícone do olho** à esquerda de cada layer
2. Clique no olho da pasta "textos"
3. Todos os textos somem (pasta oculta)
4. Clique novamente para mostrar

**DICA PRO:** Segure **Alt** e clique no olho para esconder TODAS as outras layers, mostrando apenas aquela.

---

#### PASSO 7: Ajustar Opacidade

1. Selecione a layer "Overlay - Gradiente"
2. No topo do painel Layers, localize **Opacity: 100%**
3. Arraste para **50%**
4. Observe como a layer fica semi-transparente, revelando o fundo abaixo

5. Agora localize **Fill** (abaixo de Opacity)
6. Mude para **30%**
7. Se a layer tiver efeitos (como sombra), eles continuam 100% visíveis

---

#### PASSO 8: Reorganizar Ordem das Layers

1. Clique e arraste a layer "Overlay - Gradiente" para CIMA da pasta "textos"
2. Observe como ela agora cobre os textos
3. Arraste de volta para BAIXO da pasta
4. Textos visíveis novamente

**Regra de ouro:** A ordem no painel = ordem visual. Topo do painel = frente da imagem.

---

### PROJETO PRÁTICO

**Desafio:** Criar uma arte para story de Instagram com 5 layers organizadas

**Briefing:**
- **Dimensões:** 1080x1920px (story)
- **Tema:** Anúncio de promoção

**Estrutura obrigatória (5 layers + grupos):**
1. **bg** (cor sólida ou gradiente)
2. **elementos** (pasta contendo):
   - icone ou shape decorativo
   - linha ou divisória
3. **textos** (pasta contendo):
   - titulo
   - subtitulo/cta

**Requisitos técnicos:**
- Pelo menos 1 layer com opacidade diferente de 100%
- Todas as layers renomeadas com prefixos
- No mínimo 2 pastas/grupos

**Critérios de sucesso:**
- 5+ layers organizadas
- Prefixos corretos (BG, TXT, IMG)
- Pelo menos 2 grupos/pastas
- Opacidade usada em pelo menos 1 layer

---

### ERROS A EVITAR

**Erro 1:** Layers com nomes genéricos (Layer 1, Layer 2) → **Solução:** Renomeie IMEDIATAMENTE após criar cada layer

**Erro 2:** Layers soltas sem organização → **Solução:** Agrupe por função (textos, imagens, fundos)

**Erro 3:** Não usar pastas em projetos complexos → **Solução:** Crie pastas quando tiver 3+ layers relacionadas

**Erro 4:** Confundir Opacity com Fill → **Solução:** Opacity afeta tudo, Fill preserva efeitos

---

### ATALHOS DESTA AULA

**Atalhos desta aula:**
- \`F7\` - Abrir/Fechar painel Layers
- \`Ctrl+J\` - Duplicar layer
- \`Ctrl+G\` - Criar grupo/pasta
- \`Ctrl+Shift+G\` - Desagrupar
- \`Ctrl+[\` - Mover layer para baixo
- \`Ctrl+]\` - Mover layer para cima
- \`Ctrl+Shift+[\` - Mover layer para o fundo
- \`Ctrl+Shift+]\` - Mover layer para o topo

**Próxima aula:** "Texto que Vende" - Você vai aprender tipografia profissional, hierarquia visual e como criar textos que convertem.

---

### FAQ

**P: Posso ter quantas layers quiser?**
R: Sim! Projetos complexos podem ter 100+ layers. Por isso organização é CRÍTICA.

**P: Como deletar uma layer?**
R: Selecione a layer e pressione **Delete** ou arraste para o ícone de lixeira no painel.

**P: O que é "Flatten Image"?**
R: Junta TODAS as layers em uma só. Use apenas para exportação final. Nunca faça isso no arquivo de trabalho original.

**P: Posso colocar pasta dentro de pasta?**
R: Sim! Grupos aninhados são úteis para projetos grandes. Ex: header > logo + menu

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 3 ====================
const PHOTOSHOP_LESSON_3 = `
### OBJETIVO DA AULA

Dominar a ferramenta de texto no Photoshop: criar hierarquia visual usando 3 níveis de texto (H1, H2, Body), aplicar anti-aliasing correto e garantir contraste legível. Você vai criar um flyer profissional seguindo a regra de máximo 2 fontes.

**Por que isso importa?** Texto mal formatado é o erro mais comum de iniciantes. Hierarquia visual guia o olho do cliente e aumenta conversões. Designers que dominam tipografia cobram mais.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Ferramenta Texto (T)
- Character Panel (Janela > Character)
- Paragraph Panel (Janela > Paragraph)
- Anti-aliasing settings
- Blending options para contraste

---

### TEORIA (30%)

#### Hierarquia Visual com Texto

Hierarquia é a ordem de importância visual dos elementos. Em tipografia, criamos hierarquia com:

1. **Tamanho** - Maior = mais importante
2. **Peso** - Bold chama mais atenção que Regular
3. **Cor** - Cores vibrantes destacam, cinzas recuam
4. **Espaçamento** - Mais espaço ao redor = mais destaque

#### Os 3 Níveis de Texto

**H1 - Título Principal (48px ou maior)**
- É a primeira coisa que o olho vê
- Deve comunicar a mensagem principal em 1-3 palavras
- Fonte: Bold ou Black
- Exemplo: "50% OFF"

**H2 - Subtítulo (28px)**
- Complementa o H1 com informação adicional
- Fonte: Medium ou Semibold
- Exemplo: "Só neste fim de semana"

**Body - Texto corrido (16px)**
- Detalhes, condições, informações secundárias
- Fonte: Regular
- Exemplo: "Válido para compras acima de R$100"

#### A Regra de 2 Fontes

Nunca use mais de 2 famílias tipográficas no mesmo projeto.

**Combinação clássica:**
- 1 fonte DISPLAY (para títulos) - ex: Montserrat Bold
- 1 fonte TEXTO (para body) - ex: Open Sans Regular

**Por que funciona?** Contraste suficiente para criar hierarquia, mas coesão visual para parecer profissional.

#### Anti-aliasing: O Segredo do Texto Nítido

Anti-aliasing suaviza as bordas do texto. No Photoshop temos 5 opções:

- **None**: Bordas pixeladas (evite)
- **Sharp**: Mais nítido, bom para texto pequeno
- **Crisp**: Equilibrado, uso geral
- **Strong**: Mais peso visual
- **Smooth**: Mais suave, bom para títulos grandes

**Regra prática:** Use "Sharp" para body text e "Smooth" para títulos grandes.

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Criar Documento

1. **Arquivo > New** (Ctrl+N)
2. Configure: 1080x1080px, 72dpi, RGB
3. Fundo: #1A1A2E (azul escuro)
4. Clique em **Create**

---

#### PASSO 2: Criar H1 (Título Principal)

1. Pressione **T** (Ferramenta Texto)
2. Clique no documento e digite: "BLACK FRIDAY"
3. Selecione o texto (Ctrl+A com a layer de texto ativa)
4. Abra **Janela > Character** se não estiver visível
5. Configure:
   - **Fonte:** Montserrat (ou Arial Black)
   - **Peso:** Bold ou Black
   - **Tamanho:** 72pt
   - **Cor:** Branco (#FFFFFF)
   - **Anti-aliasing:** Smooth
6. Renomeie a layer para: **"h1-titulo"**

**DICA PRO:** Para textos grandes (acima de 48pt), sempre use anti-aliasing "Smooth".

---

#### PASSO 3: Criar H2 (Subtítulo)

1. Com Ferramenta Texto ativo, clique abaixo do H1
2. Digite: "Até 70% de desconto"
3. Configure no painel Character:
   - **Fonte:** Montserrat Medium (mesma família, peso menor)
   - **Tamanho:** 28pt
   - **Cor:** #00D9FF (cyan)
   - **Anti-aliasing:** Crisp
4. Renomeie a layer para: **"h2-subtitulo"**

---

#### PASSO 4: Criar Body Text

1. Clique abaixo do H2
2. Digite: "Ofertas válidas de 25 a 28 de novembro"
3. Configure:
   - **Fonte:** Open Sans Regular (ou Arial Regular)
   - **Tamanho:** 16pt
   - **Cor:** #CCCCCC (cinza claro)
   - **Anti-aliasing:** Sharp
4. Renomeie para: **"body-info"**

**ERRO COMUM:** Usar a mesma cor para todos os textos. Use cores diferentes para criar hierarquia visual.

---

#### PASSO 5: Verificar Contraste

Texto precisa ter contraste suficiente com o fundo para ser legível.

1. Selecione a layer "body-info"
2. Olhe a cor do texto (#CCCCCC) vs fundo (#1A1A2E)
3. Se difícil de ler, aumente a luminosidade do texto

**Regra de ouro:** Diferença de luminosidade mínima de 40% entre texto e fundo.

**DICA PRO:** Use o site webaim.org/resources/contrastchecker para verificar contraste.

---

#### PASSO 6: Alinhar Textos

1. Selecione as 3 layers de texto (Ctrl+clique em cada uma)
2. Com a Move Tool (V), vá na barra de opções
3. Clique em **Align horizontal centers** (centralizar)
4. Para espaçamento vertical, use **Distribute vertical centers**

---

#### PASSO 7: Organizar Layers

1. Selecione as 3 layers de texto
2. Pressione **Ctrl+G** (criar grupo)
3. Renomeie o grupo para: **"textos"**

Estrutura final:
- textos (grupo)
  - h1-titulo
  - h2-subtitulo
  - body-info
- bg (fundo)

---

### PROJETO PRÁTICO

**Desafio:** Criar flyer promocional com 3 níveis de texto

**Briefing:**
- **Dimensões:** 1080x1350px (post Instagram)
- **Tema:** Promoção de loja de roupas

**Textos obrigatórios:**
1. **H1 (48px+):** "LIQUIDA VERÃO"
2. **H2 (28px):** "Peças a partir de R$ 29,90"
3. **Body (16px):** "Válido até 31/01 | Loja física e online"

**Regras:**
- Máximo 2 fontes
- Anti-aliasing apropriado para cada tamanho
- Contraste legível
- Layers organizadas em grupo "textos"

**Critérios de sucesso:**
- 3 níveis de texto visualmente distintos
- Hierarquia clara (H1 se destaca primeiro)
- Máximo 2 famílias tipográficas
- Contraste adequado para leitura

---

### ERROS A EVITAR

**Erro 1:** Usar 3+ fontes diferentes
**Solução:** Máximo 2 famílias, varie apenas o peso (Regular, Bold)

**Erro 2:** Texto do mesmo tamanho para tudo
**Solução:** H1 = 48px+, H2 = 28px, Body = 16px

**Erro 3:** Anti-aliasing "None" ou incorreto
**Solução:** Sharp para texto pequeno, Smooth para grande

**Erro 4:** Baixo contraste texto/fundo
**Solução:** Mínimo 40% diferença de luminosidade

**Erro 5:** Texto centralizado sem alinhamento real
**Solução:** Use Align horizontal centers na barra de opções

---

### ATALHOS DESTA AULA

- \`T\` - Ferramenta Texto
- \`Ctrl+T\` - Transformacao Livre (redimensionar texto)
- \`Ctrl+A\` - Selecionar todo o texto na layer
- \`Ctrl+Shift+>\` - Aumentar tamanho da fonte
- \`Ctrl+Shift+<\` - Diminuir tamanho da fonte
- \`Ctrl+Shift+L\` - Alinhar à esquerda
- \`Ctrl+Shift+C\` - Centralizar
- \`Ctrl+Shift+R\` - Alinhar à direita

**Próxima aula:** "Seleções Inteligentes" - Você vai aprender a usar as ferramentas de seleção incluindo as novas com AI.

---

### FAQ

**P: Posso usar fontes do Google Fonts?**
R: Sim! Google Fonts são gratuitas e profissionais. Baixe e instale no sistema antes de usar no Photoshop.

**P: Como instalar fontes no Windows?**
R: Baixe o arquivo .ttf ou .otf, clique com botão direito > Instalar. Reinicie o Photoshop.

**P: E se o cliente pedir fonte específica que não tenho?**
R: Peça o arquivo da fonte ou sugira alternativas similares gratuitas. Use fonts.google.com para encontrar.

**P: Qual a diferença entre Character e Paragraph panel?**
R: Character controla a aparência das letras (fonte, tamanho, cor). Paragraph controla o bloco de texto (alinhamento, espaçamento entre parágrafos).

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 4 ====================
const PHOTOSHOP_LESSON_4 = `
### OBJETIVO DA AULA

Dominar as ferramentas de seleção do Photoshop, desde as clássicas até as novas com Inteligência Artificial. Você vai aprender a selecionar objetos complexos em segundos usando Selecionar Tema AI e refinar bordas com Selecionar e Aplicar Mascara.

**Por que isso importa?** Seleções são a base de 80% do trabalho em Photoshop. Recortes, composições, ajustes localizados - tudo começa com uma boa seleção. Designers que dominam seleções entregam mais rápido.

---

### DURAÇÃO ESTIMADA: 40 minutos

### FERRAMENTAS ABORDADAS
- Varinha Magica Tool (W) - legado
- Ferramenta Selecao Rapida (W)
- Ferramenta Selecao de Objeto (W)
- Selecionar > Subject (AI 2024)
- Selecionar e Aplicar Mascara workspace

---

### TEORIA (30%)

#### Evolução das Ferramentas de Seleção

O Photoshop evoluiu drasticamente nas ferramentas de seleção:

**Antes (2010s):**
- Varinha Magica: Seleciona por cor similar
- Pen Tool: Manual, pixel por pixel
- Tempo médio para recortar pessoa: 15-30 minutos

**Agora (2024):**
- Selecionar Tema AI: 1 clique seleciona o objeto principal
- Selecao de Objeto: Desenhe um retângulo, AI faz o resto
- Tempo médio para recortar pessoa: 30 segundos - 2 minutos

#### Comparação: Varinha Magica vs Selecionar Tema AI

**Varinha Magica (Ferramenta Antiga)**
- Funciona bem: Fundos sólidos, cores uniformes
- Funciona mal: Fotos reais, cabelos, bordas suaves
- Configuração: Tolerance (0-255), quanto maior = mais cores selecionadas
- Limitação: Não entende contexto, só vê pixels

**Selecionar Tema AI (Ferramenta Nova)**
- Funciona bem: Qualquer foto, pessoas, produtos, animais
- Funciona mal: Objetos muito pequenos ou muito fundidos com fundo
- Configuração: Nenhuma - a AI decide
- Vantagem: Entende contexto, reconhece objetos

#### Quando Usar Cada Ferramenta

**Varinha Magica (W)**
- Logos em fundo branco
- Ícones flat com cores sólidas
- Remoção de fundo de vetor

**Selecao Rapida (W)**
- Seleções rápidas "pintando" sobre o objeto
- Objetos com bordas definidas
- Quando precisa de controle manual rápido

**Selecao de Objeto (W)**
- Múltiplos objetos em uma cena
- Produtos em fotos de catálogo
- Quando você sabe exatamente o que quer selecionar

**Selecionar Tema (AI)**
- Pessoas, rostos, corpo inteiro
- Produtos em fundo neutro
- Quando precisa de velocidade máxima

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Abrir Imagem de Teste

1. **Arquivo > Open** e escolha uma foto com produto ou pessoa
2. Se não tiver, use uma foto de banco de imagens gratuito (Unsplash, Pexels)
3. Ideal: foto de produto em fundo neutro (branco, cinza)

---

#### PASSO 2: Testar Varinha Magica (Método Antigo)

1. Pressione **W** para selecionar ferramenta de seleção
2. Clique e segure no ícone, escolha **Varinha Magica Tool**
3. Na barra de opções, configure **Tolerance: 32**
4. Clique no fundo da imagem
5. Observe: provavelmente selecionou apenas parte do fundo

**Problema comum:** Você precisa clicar várias vezes segurando Shift para adicionar mais áreas.

6. Pressione **Ctrl+D** para desselecionar

---

#### PASSO 3: Testar Selecionar Tema AI (Método Novo)

1. Com a imagem aberta, vá em **Selecionar > Subject**
2. Aguarde 2-5 segundos (a AI está processando)
3. Observe: o objeto principal foi selecionado automaticamente
4. As "formigas marchando" mostram a seleção

**Comparação direta:** O que levaria 5 minutos com Varinha Magica, levou 3 segundos com AI.

---

#### PASSO 4: Refinar Seleção com Selecao Rapida

Se a AI errou em alguma área:

1. Pressione **W** e escolha **Ferramenta Selecao Rapida**
2. Para ADICIONAR à seleção: pinte sobre a área faltando
3. Para REMOVER da seleção: segure **Alt** e pinte sobre a área errada
4. Ajuste o tamanho do brush com **[** e **]**

**DICA PRO:** Use brush pequeno para detalhes e grande para áreas amplas.

---

#### PASSO 5: Usar Ferramenta Selecao de Objeto

1. Pressione **W** e escolha **Ferramenta Selecao de Objeto**
2. Na barra de opções, escolha modo **Rectangle** ou **Lasso**
3. Desenhe um retângulo ao redor do objeto que quer selecionar
4. A AI automaticamente detecta o objeto dentro do retângulo

**Vantagem:** Útil quando tem múltiplos objetos e você quer selecionar apenas um.

---

#### PASSO 6: Refinar Bordas com Selecionar e Aplicar Mascara

Esta é a ferramenta mais poderosa para bordas perfeitas:

1. Com uma seleção ativa, clique em **Selecionar e Aplicar Mascara** na barra de opções
2. Ou vá em **Selecionar > Selecionar e Aplicar Mascara**
3. No workspace que abrir, você verá:
   - **View Mode**: Como visualizar (recomendo "On Black" ou "Overlay")
   - **Edge Detection**: Radius controla quanto a AI busca bordas
   - **Global Refinements**: Suavizar, contraste, deslocar borda

**Configurações recomendadas para cabelo/pelos:**
- Radius: 5-10px
- Smart Radius: Ativado
- Shift Edge: -10% a -30% (puxa a borda para dentro)

4. Use o **Refinar Borda Brush** para pintar sobre cabelos e bordas difíceis
5. Em **Output Settings**, escolha:
   - Output To: **New Layer with Mascara de Camada**
6. Clique **OK**

---

#### PASSO 7: Verificar Resultado

1. Crie uma nova layer abaixo do recorte
2. Preencha com cor sólida contrastante (vermelho, verde)
3. Verifique se há "halos" brancos ou bordas mal recortadas
4. Se necessário, volte ao Selecionar e Aplicar Mascara e refine

---

### PROJETO PRÁTICO

**Desafio:** Recortar produto de foto complexa e compor em novo fundo

**Briefing:**
- Baixe uma foto de produto (exemplo: tênis, celular, garrafa)
- Selecione o produto usando as ferramentas AI
- Refine as bordas com Selecionar e Aplicar Mascara
- Coloque em fundo gradiente limpo
- Exporte como PNG com transparência

**Passo a passo:**
1. Abra foto do produto
2. Selecionar > Subject para seleção inicial
3. Refine com Selecao Rapida se necessário
4. Selecionar e Aplicar Mascara para bordas perfeitas
5. Output: New Layer with Mascara de Camada
6. Adicione fundo gradiente
7. Exportar Como > PNG (para manter transparência se quiser)

**Critérios de sucesso:**
- Produto completamente selecionado
- Sem halos brancos nas bordas
- Sombras naturais preservadas (se aplicável)
- Fundo novo aplicado corretamente

---

### ERROS A EVITAR

**Erro 1:** Usar Varinha Magica em fotos reais complexas
**Solução:** Use Selecionar Tema AI para fotos, Varinha Magica só para gráficos

**Erro 2:** Não refinar bordas de cabelo/pelos
**Solução:** Sempre use Selecionar e Aplicar Mascara com Refinar Borda Brush para cabelos

**Erro 3:** Esquecer de verificar em fundo contrastante
**Solução:** Crie layer colorida abaixo para revelar problemas nas bordas

**Erro 4:** Exportar recorte como JPEG (perde transparência)
**Solução:** Use PNG para manter áreas transparentes

**Erro 5:** Tolerance muito alto no Varinha Magica
**Solução:** Comece com 20-32, aumente gradualmente se necessário

---

### ATALHOS DESTA AULA

- \`W\` - Ferramentas de Seleção (cicla entre elas)
- \`Ctrl+D\` - Desselecionar tudo
- \`Ctrl+Shift+I\` - Inverter seleção
- \`Shift+clique\` - Adicionar à seleção
- \`Alt+clique\` - Remover da seleção
- \`[\` e \`]\` - Diminuir/Aumentar tamanho do brush
- \`Q\` - Quick Mask mode (visualizar seleção como vermelho)
- \`Ctrl+J\` - Duplicar seleção para nova layer

**Próxima aula:** "Removendo Fundos como Mágica" - Você vai dominar a remoção automática de fundos e criar composições profissionais.

---

### FAQ

**P: O Selecionar Tema não funciona bem na minha imagem, o que fazer?**
R: Tente Selecao de Objeto com retângulo preciso, ou combine múltiplas ferramentas. AI funciona melhor com fotos bem iluminadas e contraste claro.

**P: Posso salvar uma seleção para usar depois?**
R: Sim! Selecionar > Save Selection. Ela fica salva como "canal" no painel Channels.

**P: Qual a diferença entre máscara e seleção?**
R: Seleção é temporária (as formigas). Máscara é permanente e editável (Mascara de Camada). Sempre converta seleções importantes em máscaras.

**P: Por que meu recorte tem borda branca?**
R: É o "halo" do fundo original. Use Shift Edge negativo (-10 a -30%) no Selecionar e Aplicar Mascara para contrair a borda.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 5 ====================
const PHOTOSHOP_LESSON_5 = `
### OBJETIVO DA AULA

Dominar a remoção de fundos usando máscaras de layer (método não-destrutivo). Você vai aprender a usar Remover Plano de Fundo, criar e editar Mascara de Camadas pintando com preto e branco, e exportar PNG-24 com transparência perfeita.

**Por que isso importa?** Remoção de fundo é o serviço mais pedido para designers iniciantes. Saber fazer de forma não-destrutiva significa poder corrigir erros e atender ajustes do cliente sem recomeçar.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Remover Plano de Fundo (Properties panel)
- Mascara de Camadas
- Brush Tool para pintar máscaras
- Refinar Borda Brush
- Exportar Como PNG-24

---

### TEORIA (30%)

#### Mascarar vs Deletar: A Diferença Crucial

**Deletar (Destrutivo)**
- Remove pixels permanentemente
- Não pode ser desfeito depois de salvar
- Se o cliente pedir ajuste, você recomeça
- Exemplo: Usar borracha ou Delete após seleção

**Mascarar (Não-Destrutivo)**
- Esconde pixels sem deletá-los
- Pode ser editado a qualquer momento
- Ajustes são simples e rápidos
- Exemplo: Mascara de Camada

**Regra de ouro:** NUNCA delete pixels. Sempre use máscaras.

#### Como Mascara de Camadas Funcionam

Uma Mascara de Camada é uma "capa" sobre a layer que controla visibilidade:

- **Branco (255)** = Totalmente visível
- **Preto (0)** = Totalmente invisível/transparente
- **Cinza (1-254)** = Parcialmente transparente

Você pode pintar na máscara a qualquer momento para ajustar o que aparece ou não.

#### O Botão Remover Plano de Fundo

No Photoshop 2024+, existe um botão mágico no painel Properties:

1. Selecione a layer
2. Vá em **Janela > Properties**
3. Em "Quick Actions", clique em **Remover Plano de Fundo**
4. O Photoshop usa AI para criar uma máscara automaticamente

Isso é MUITO mais rápido que selecionar e deletar manualmente.

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Abrir Imagem

1. **Arquivo > Open** e escolha uma foto de pessoa
2. Use Unsplash ou Pexels se não tiver uma
3. Ideal: pessoa em fundo relativamente simples

---

#### PASSO 2: Usar Remover Plano de Fundo (Método Rápido)

1. Certifique que a layer da foto está selecionada
2. Se for "Background", clique duas vezes e converta para layer normal
3. Vá em **Janela > Properties** para abrir o painel
4. Em "Quick Actions", clique em **Remover Plano de Fundo**
5. Aguarde 2-5 segundos

Observe: uma máscara foi criada automaticamente na layer!

---

#### PASSO 3: Entender a Máscara Criada

1. Olhe no painel Layers
2. Você verá dois thumbnails na layer: a imagem + a máscara (preto e branco)
3. Clique na máscara para selecioná-la (borda branca aparece)
4. Branco = pessoa visível, Preto = fundo removido

---

#### PASSO 4: Verificar Resultado em Fundo Colorido

1. Crie uma nova layer abaixo (Ctrl+clique no ícone de nova layer)
2. Preencha com cor sólida: **Editar > Fill > Color** (escolha vermelho ou verde)
3. Agora você pode ver claramente onde a máscara precisa de ajustes

---

#### PASSO 5: Pintar na Máscara para Corrigir

Se a AI errou em alguma área:

1. Clique na máscara (não na imagem!)
2. Pressione **B** para Brush Tool
3. Configure:
   - **Cor Frontal:** Preto (para esconder) ou Branco (para revelar)
   - **Hardness:** 0% para bordas suaves, 100% para bordas duras
   - **Opacity:** 100% para correção total, menor para transições
4. Pinte sobre as áreas que precisam de correção

**Atalho crucial:** Pressione **X** para alternar entre preto e branco rapidamente.

---

#### PASSO 6: Refinar Bordas de Cabelo

Cabelos são o maior desafio em remoção de fundo:

1. Com a máscara selecionada, vá em **Selecionar > Selecionar e Aplicar Mascara**
2. Use o **Refinar Borda Brush** (segundo ícone na esquerda)
3. Pinte sobre os fios de cabelo
4. Configure:
   - Smart Radius: Ativado
   - Radius: 3-8px
   - Shift Edge: -15% (puxa borda para dentro)
5. Output To: **Mascara de Camada**
6. Clique **OK**

---

#### PASSO 7: Adicionar Novo Fundo

1. Arraste uma imagem de fundo para o documento
2. Posicione a layer do fundo ABAIXO da pessoa
3. Use **Ctrl+T** para redimensionar o fundo
4. Ajuste posição para composição harmoniosa

---

#### PASSO 8: Exportar PNG-24 com Transparência

Se quiser entregar apenas a pessoa sem fundo:

1. Esconda ou delete a layer de fundo colorido
2. **Arquivo > Export > Exportar Como**
3. Configure:
   - **Format:** PNG
   - **Transparency:** Marcado
   - **Smaller File (8-bit):** Desmarcado para PNG-24 (melhor qualidade)
4. Clique **Export**

**DICA PRO:** PNG-24 = máxima qualidade com transparência. PNG-8 = menor tamanho, mas perde qualidade em gradientes.

---

### PROJETO PRÁTICO

**Desafio:** Remover fundo de pessoa e criar composição com novo cenário

**Briefing:**
- Baixe foto de pessoa (Unsplash: "portrait")
- Baixe foto de cenário (Unsplash: "landscape" ou "city")
- Remova o fundo usando Mascara de Camada
- Componha a pessoa no novo cenário
- Exporte duas versões: com fundo e PNG transparente

**Passo a passo:**
1. Remover Plano de Fundo para seleção inicial
2. Verificar em fundo colorido
3. Pintar máscara para correções
4. Refinar Borda para cabelos
5. Adicionar fundo de cenário
6. Exportar Como: JPEG (com fundo) e PNG (transparente)

**Critérios de sucesso:**
- Sem halos brancos nas bordas
- Cabelos com bordas naturais
- Composição realista (escala e perspectiva)
- PNG com transparência funcional

---

### ERROS A EVITAR

**Erro 1:** Deletar o fundo em vez de mascarar
**Solução:** Sempre use Mascara de Camada ou Remover Plano de Fundo

**Erro 2:** Pintar na imagem em vez da máscara
**Solução:** Verifique se a máscara está selecionada (borda branca no thumbnail)

**Erro 3:** Usar brush com hardness 100% em bordas suaves
**Solução:** Use hardness 0% para cabelos e bordas naturais

**Erro 4:** Exportar JPEG quando precisa de transparência
**Solução:** JPEG não suporta transparência, use PNG

**Erro 5:** Não verificar em fundo contrastante
**Solução:** Sempre adicione layer colorida para revelar problemas

---

### ATALHOS DESTA AULA

- \`B\` - Brush Tool
- \`X\` - Alternar cores frontal/fundo (preto/branco)
- \`D\` - Resetar cores para preto e branco
- \`\\\` - Mostrar/ocultar máscara como overlay vermelho
- \`Shift+clique na máscara\` - Desativar/ativar máscara temporariamente
- \`Alt+clique na máscara\` - Visualizar apenas a máscara
- \`Ctrl+I\` - Inverter máscara (branco vira preto e vice-versa)
- \`Ctrl+Shift+Alt+E\` - Mesclar tudo em nova layer

**Próxima aula:** "Recorte e Composição Profissional" - Você vai aprender técnicas avançadas de composição e integração de elementos.

---

### FAQ

**P: Posso editar a máscara depois de salvar?**
R: Sim! Máscaras são permanentemente editáveis. Abra o PSD e pinte na máscara a qualquer momento.

**P: Como desativar a máscara temporariamente?**
R: Shift+clique no thumbnail da máscara. Um X vermelho aparece indicando que está desativada.

**P: Como deletar a máscara mantendo o recorte?**
R: Clique direito na máscara > Apply Mascara de Camada. Os pixels serão deletados permanentemente.

**P: Por que meu PNG não tem transparência?**
R: Verifique se "Transparency" está marcado em Exportar Como e se não há layer de fundo visível.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 6 ====================
const PHOTOSHOP_LESSON_6 = `
### OBJETIVO DA AULA

Dominar técnicas de composição profissional: selecionar objetos com precisão, combinar múltiplas seleções, usar Preenchimento Generativo para preencher áreas, e integrar elementos de diferentes fotos com matching de luz e sombras realistas.

**Por que isso importa?** Composição é onde designers se destacam. Saber combinar elementos de forma realista abre portas para trabalhos de publicidade, manipulação de imagens e arte digital de alto valor.

---

### DURAÇÃO ESTIMADA: 45 minutos

### FERRAMENTAS ABORDADAS
- Ferramenta Selecao de Objeto (preciso)
- Combinar seleções (Add/Subtract)
- Preenchimento Generativo (AI 2024)
- Camadas de Ajuste para matching
- Sombra Projetada e sombras pintadas

---

### TEORIA (30%)

#### O que é Composição Fotográfica?

Composição é a arte de combinar elementos de diferentes fontes em uma única imagem coesa. Para parecer realista, você precisa:

1. **Escala correta** - Elementos proporcionais entre si
2. **Perspectiva** - Ângulos consistentes
3. **Iluminação** - Luz vindo da mesma direção
4. **Cor** - Temperatura e saturação similares
5. **Sombras** - Projetadas de forma realista

#### Combinar Seleções: Add, Subtract, Intersect

Quando uma única seleção não é suficiente, você pode combinar várias:

- **Shift + seleção** = ADICIONA à seleção existente
- **Alt + seleção** = SUBTRAI da seleção existente
- **Shift + Alt + seleção** = mantém apenas a INTERSEÇÃO

Isso permite selecionar objetos complexos em partes.

#### Preenchimento Generativo: O Poder da AI

O Preenchimento Generativo (Photoshop 2024+) usa inteligência artificial para:

- Preencher áreas selecionadas com conteúdo gerado
- Expandir imagens além das bordas originais
- Remover objetos e preencher naturalmente
- Adicionar elementos que não existiam

Você seleciona uma área, descreve o que quer (ou deixa em branco), e a AI gera.

#### Matching de Luz: A Chave do Realismo

Se a luz está errada, a composição parece falsa. Observe:

**Na foto original:**
- De onde vem a luz? (esquerda, direita, cima, baixo)
- É luz dura (sombras definidas) ou suave (sombras difusas)?
- Qual a cor da luz? (quente, fria, neutra)

**No elemento que você vai adicionar:**
- A luz deve vir da MESMA direção
- A intensidade deve ser similar
- Use Curves ou Levels para ajustar

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Preparar Imagens Base

1. Baixe 3 fotos do Unsplash:
   - 1 fundo/cenário (ex: mesa de madeira, paisagem)
   - 1 objeto principal (ex: produto, pessoa)
   - 1 elemento decorativo (ex: planta, xícara)
2. Abra o fundo como documento principal
3. Abra as outras duas em abas separadas

---

#### PASSO 2: Seleção Precisa com Selecao de Objeto

1. Na aba do objeto principal, pressione **W** e escolha **Ferramenta Selecao de Objeto**
2. Na barra de opções, certifique que **Mode: Rectangle** está selecionado
3. Desenhe um retângulo apertado ao redor do objeto
4. A AI seleciona automaticamente

Se a seleção não ficou perfeita:
- Segure **Shift** e desenhe mais retângulos para ADICIONAR áreas
- Segure **Alt** e desenhe para REMOVER áreas indesejadas

---

#### PASSO 3: Mover Entre Documentos

1. Com o objeto selecionado, pressione **Ctrl+C** (copiar)
2. Vá para a aba do documento principal (fundo)
3. Pressione **Ctrl+V** (colar)
4. O objeto aparece em nova layer

5. Use **Ctrl+T** para redimensionar:
   - Segure **Shift** para manter proporção
   - Ajuste tamanho para parecer realista no cenário

---

#### PASSO 4: Repetir para o Terceiro Elemento

1. Volte para a terceira imagem
2. Use Selecao de Objeto para selecionar
3. Combine seleções se necessário (Shift+clique para adicionar)
4. Copie e cole no documento principal
5. Redimensione e posicione

---

#### PASSO 5: Usar Preenchimento Generativo (Preencher Gaps)

Se algum elemento foi cortado ou precisa de extensão:

1. Use a ferramenta de seleção para selecionar a área vazia
2. Vá em **Editar > Preenchimento Generativo** (ou clique no botão na barra de seleção)
3. No prompt, deixe em branco (para preencher com continuação) ou descreva o que quer
4. Clique **Generate**
5. Escolha entre as variações geradas

**Exemplo prático:**
- Selecione área ao lado de uma mesa
- Preenchimento Generativo com prompt vazio = continua a textura da mesa
- Preenchimento Generativo com "coffee cup" = adiciona xícara de café

---

#### PASSO 6: Matching de Luz com Curves

1. Identifique de onde vem a luz na foto de fundo
2. Selecione a layer do objeto inserido
3. Vá em **Imagem > Adjustments > Curves** (ou Ctrl+M)
4. Ajuste a curva:
   - Se objeto está muito claro: puxe o meio da curva para baixo
   - Se objeto está muito escuro: puxe para cima
   - Para adicionar tom quente: levante o canal Red levemente

**DICA PRO:** Use Camada de Ajuste (Layer > New Camada de Ajuste > Curves) para edição não-destrutiva.

---

#### PASSO 7: Criar Sombra Realista

**Método 1: Sombra Projetada (rápido)**
1. Selecione a layer do objeto
2. Clique no ícone **fx** no painel Layers
3. Escolha **Sombra Projetada**
4. Configure:
   - Angle: direção oposta à luz (luz da esquerda = sombra para direita)
   - Distance: 10-30px (depende da distância do chão)
   - Size: 20-40px (sombras suaves)
   - Opacity: 30-50%

**Método 2: Sombra Pintada (profissional)**
1. Crie nova layer ABAIXO do objeto
2. Pressione **B** para Brush
3. Brush grande, Hardness 0%, cor preta
4. Opacity do brush: 15-25%
5. Pinte suavemente onde a sombra deveria estar
6. Use **Editar > Transform > Warp** para moldar a sombra
7. Reduza a opacity da layer se necessário

---

#### PASSO 8: Unificar Cores com Color Lookup

Para dar coesão visual à composição:

1. Vá em **Layer > New Camada de Ajuste > Color Lookup**
2. Escolha um LUT (Look Up Table) que combina com a cena
3. Exemplos: Crisp_Warm, Soft_Warming, FilmStock_50
4. Ajuste a opacity da Camada de Ajuste para 30-60%

Isso aplica a mesma "gradação de cor" a todos os elementos.

---

### PROJETO PRÁTICO

**Desafio:** Criar composição publicitária com 3 elementos

**Briefing:**
- Baixe: foto de mesa/superfície + 2 produtos diferentes
- Componha os produtos na mesa
- Crie sombras realistas
- Unifique cores e iluminação
- Exporte JPEG alta qualidade

**Passo a passo:**
1. Selecao de Objeto nos produtos
2. Copiar/colar no documento principal
3. Redimensionar com proporção realista
4. Preenchimento Generativo se precisar expandir
5. Curves para matching de exposição
6. Sombra Projetada ou sombra pintada
7. Color Lookup para unificar

**Critérios de sucesso:**
- 3 elementos de fontes diferentes
- Escala realista e harmoniosa
- Sombras na direção correta
- Cores unificadas
- Sem bordas recortadas visíveis

---

### ERROS A EVITAR

**Erro 1:** Elementos em escalas irreais
**Solução:** Compare tamanhos relativos. Uma xícara não pode ser maior que um laptop

**Erro 2:** Luz vindo de direções diferentes
**Solução:** Identifique a direção da luz do fundo e ajuste os elementos

**Erro 3:** Sombras muito duras ou na direção errada
**Solução:** Sombras devem estar na direção oposta à fonte de luz

**Erro 4:** Elementos "flutuando" sem sombra
**Solução:** Todo objeto que toca uma superfície projeta sombra

**Erro 5:** Cores muito diferentes entre elementos
**Solução:** Use Color Lookup ou Matiz/Saturacao para unificar

---

### ATALHOS DESTA AULA

- \`W\` - Ferramenta Selecao de Objeto
- \`Shift+seleção\` - Adicionar à seleção
- \`Alt+seleção\` - Subtrair da seleção
- \`Ctrl+M\` - Curves
- \`Ctrl+T\` - Transformacao Livre
- \`Ctrl+Shift+U\` - Desaturar
- \`Ctrl+U\` - Matiz/Saturacao
- \`Ctrl+E\` - Merge layer com a de baixo

**Próxima aula:** "Ajustes de Cor Profissionais" - Você vai dominar Curves, Levels, e Camadas de Ajuste para correção de cor avançada.

---

### FAQ

**P: Preenchimento Generativo não aparece no meu Photoshop, o que fazer?**
R: Preenchimento Generativo requer Photoshop 2024+ com funcionalidades de AI ativadas. Verifique se está logado na conta Adobe e se tem a versão mais recente.

**P: Como fazer sombras de objetos complexos?**
R: Duplique o objeto, preencha de preto (Editar > Fill > Black), aplique blur (Filtro > Blur > Gaussian Blur), transforme para parecer projetada.

**P: Posso usar fotos de qualquer fonte?**
R: Para projetos comerciais, use apenas fotos com licença adequada. Unsplash e Pexels são gratuitas até para uso comercial.

**P: A composição ficou muito saturada, como ajustar?**
R: Use Matiz/Saturacao (Ctrl+U) ou Vibrance Camada de Ajuste para reduzir saturação geral.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 7 ====================
const PHOTOSHOP_LESSON_7 = `
### OBJETIVO DA AULA

Dominar Camadas de Ajuste para edição de cor não-destrutiva. Você vai aprender a usar Matiz/Saturacao, Equilibrio de Cores e Vibrance para transformar fotos sem vida em imagens vibrantes e impactantes.

**Por que isso importa?** Correção de cor é obrigatória em qualquer trabalho visual. Camadas de Ajuste permitem editar cores sem destruir a imagem original - você pode mudar tudo a qualquer momento.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Camadas de Ajuste (conceito)
- Matiz/Saturacao
- Equilibrio de Cores
- Vibrance
- Properties Panel

---

### TEORIA (30%)

#### O que são Camadas de Ajuste?

Camadas de Ajuste são layers especiais que aplicam efeitos às layers abaixo SEM modificá-las permanentemente.

**Vantagens:**
- **Não-destrutivo**: A imagem original permanece intacta
- **Editável**: Altere as configurações a qualquer momento
- **Reversível**: Delete a Camada de Ajuste e volta ao original
- **Seletivo**: Use máscaras para aplicar só em partes da imagem

#### Camada de Ajuste vs Ajuste Direto

**Ajuste Direto (Imagem > Adjustments)**
- Modifica os pixels permanentemente
- Não pode ser editado depois
- Se errar, precisa usar Ctrl+Z ou recomeçar
- NÃO USE para trabalhos profissionais

**Camada de Ajuste (Layer > New Camada de Ajuste)**
- Cria uma layer separada com o efeito
- Pode ser editada infinitamente
- Pode ser desligada ou deletada
- SEMPRE USE para trabalhos profissionais

#### Os 3 Ajustes Essenciais de Cor

**1. Matiz/Saturacao**
- **Hue**: Muda a cor (vermelho vira azul, etc)
- **Saturation**: Intensidade da cor (-100 = cinza, +100 = super vibrante)
- **Lightness**: Clareia ou escurece

**2. Equilibrio de Cores**
- Ajusta o equilíbrio entre cores opostas
- Cyan ↔ Red, Magenta ↔ Green, Yellow ↔ Blue
- Controla Shadows, Midtones e Highlights separadamente
- Ótimo para corrigir temperatura de cor

**3. Vibrance**
- **Vibrance**: Aumenta saturação inteligentemente (protege tons de pele)
- **Saturation**: Aumenta saturação de todas as cores igualmente
- Use Vibrance para fotos com pessoas, Saturation para objetos

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Abrir Foto "Sem Vida"

1. Baixe uma foto de paisagem ou produto que parece "apagada"
2. Dica: Procure por "overcast landscape" ou "flat lighting product"
3. **Arquivo > Open** e selecione a imagem

---

#### PASSO 2: Criar Camada de Ajuste de Vibrance

1. Com a layer da imagem selecionada
2. Vá em **Layer > New Camada de Ajuste > Vibrance**
3. Ou clique no ícone de círculo meio-preenchido no painel Layers
4. Escolha **Vibrance**

No painel Properties que abrir:
- Aumente **Vibrance** para +30 a +50
- Deixe **Saturation** em 0 por enquanto
- Observe como as cores ficam mais vivas sem exagerar

---

#### PASSO 3: Adicionar Matiz/Saturacao

1. **Layer > New Camada de Ajuste > Matiz/Saturacao**
2. No painel Properties:
   - Deixe **Master** selecionado (afeta todas as cores)
   - Aumente **Saturation** levemente: +10 a +20
   
3. Para ajustar cores específicas:
   - No dropdown "Master", escolha uma cor (ex: Blues)
   - Ajuste o Hue para mudar o tom do azul
   - Ajuste Saturation para intensificar ou reduzir azuis

**DICA PRO:** Para céus mais dramáticos, selecione "Blues" e aumente Saturation +20 a +40.

---

#### PASSO 4: Equilibrar com Equilibrio de Cores

1. **Layer > New Camada de Ajuste > Equilibrio de Cores**
2. No painel Properties, você verá 3 sliders:
   - Cyan — Red
   - Magenta — Green  
   - Yellow — Blue

3. Selecione **Highlights** (no radio button)
   - Para tom mais quente: mova para Yellow e Red
   - Para tom mais frio: mova para Blue e Cyan

4. Selecione **Shadows**
   - Sombras frias (azuladas) são mais cinematográficas
   - Sombras quentes são mais acolhedoras

**Receita clássica "Orange and Teal":**
- Highlights: +15 Yellow, +10 Red
- Shadows: +20 Cyan, +10 Blue

---

#### PASSO 5: Organizar Camadas de Ajuste

1. Selecione todas as Camadas de Ajuste
2. **Ctrl+G** para criar grupo
3. Renomeie para: **"ajustes-cor"**

Estrutura ideal:
- ajustes-cor (grupo)
  - Equilibrio de Cores
  - Matiz/Saturacao
  - Vibrance
- foto-original

---

#### PASSO 6: Ajustar Intensidade Global

Se os ajustes ficaram muito fortes:

1. Selecione o GRUPO "ajustes-cor"
2. Reduza a **Opacity** do grupo para 70-85%
3. Isso suaviza todos os efeitos proporcionalmente

Ou ajuste individualmente:
- Clique em cada Camada de Ajuste
- Reduza sua opacity específica

---

#### PASSO 7: Comparar Antes/Depois

1. Clique no ícone do **olho** do grupo "ajustes-cor"
2. Observe a foto original (antes)
3. Clique novamente para ver com ajustes (depois)
4. Ajuste o que for necessário

**Atalho:** Segure **\\** (barra invertida) para preview temporário do antes.

---

### PROJETO PRÁTICO

**Desafio:** Transformar foto opaca em imagem vibrante e impactante

**Briefing:**
- Baixe uma foto de paisagem com céu nublado/opaco
- Aplique Vibrance, Matiz/Saturacao e Equilibrio de Cores
- Crie look "Orange and Teal" cinematográfico
- Exporte antes/depois lado a lado

**Passo a passo:**
1. Abrir foto original
2. Vibrance +40, Saturation 0
3. Matiz/Saturacao: Blues +25 saturation
4. Equilibrio de Cores: Highlights warm, Shadows cool
5. Agrupar Camadas de Ajuste
6. Ajustar opacity geral se necessário
7. Duplicar documento, flatten, colocar lado a lado

**Critérios de sucesso:**
- Cores visivelmente mais vibrantes
- Nada saturado exageradamente
- Equilíbrio de cor agradável
- Edição 100% não-destrutiva

---

### ERROS A EVITAR

**Erro 1:** Usar Imagem > Adjustments em vez de Camada de Ajuste
**Solução:** SEMPRE use Layer > New Camada de Ajuste

**Erro 2:** Saturação exagerada (+50 ou mais no geral)
**Solução:** Comece com valores baixos (+10 a +30), aumente gradualmente

**Erro 3:** Não usar Vibrance para fotos com pessoas
**Solução:** Vibrance protege tons de pele de ficarem laranja

**Erro 4:** Aplicar o mesmo ajuste a todas as fotos
**Solução:** Cada foto tem necessidades diferentes, analise antes

**Erro 5:** Não organizar Camadas de Ajuste em grupo
**Solução:** Agrupe para controlar intensidade global e organização

---

### ATALHOS DESTA AULA

- \`Ctrl+U\` - Matiz/Saturacao (direto, EVITE)
- \`Ctrl+B\` - Equilibrio de Cores (direto, EVITE)
- \`\\\` - Preview antes/depois temporário
- \`Ctrl+J\` - Duplicar layer
- \`Ctrl+G\` - Agrupar layers
- \`Ctrl+Shift+E\` - Merge visible (manter originais)
- \`Ctrl+Alt+Shift+E\` - Stamp visible (nova layer mesclada)

**Próxima aula:** "Curves e Levels Avançado" - Você vai dominar as ferramentas mais poderosas de ajuste tonal.

---

### FAQ

**P: Qual a diferença entre Vibrance e Saturation?**
R: Vibrance é "inteligente" - aumenta cores menos saturadas e protege tons de pele. Saturation aumenta tudo igualmente.

**P: Posso aplicar Camada de Ajuste só em parte da imagem?**
R: Sim! Toda Camada de Ajuste tem uma máscara. Pinte de preto onde NÃO quer o efeito.

**P: Minhas cores estão muito artificiais, o que fazer?**
R: Reduza a opacity do grupo de ajustes para 60-70%. Ajustes sutis parecem mais profissionais.

**P: Como salvar essas configurações para usar em outras fotos?**
R: Arraste as Camadas de Ajuste de um documento para outro, ou use Actions para automatizar.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 8 ====================
const PHOTOSHOP_LESSON_8 = `
### OBJETIVO DA AULA

Dominar ajustes de iluminação usando Curves (ferramenta principal), Levels, Brilho/Contraste, Exposure e Sombras/Realces. Você vai aprender a salvar fotos subexpostas (escuras demais) e superexpostas (claras demais).

**Por que isso importa?** A maioria das fotos precisa de ajuste de luz. Curves é a ferramenta mais poderosa do Photoshop para isso - profissionais usam diariamente. Dominar Curves = dominar luz.

---

### DURAÇÃO ESTIMADA: 40 minutos

### FERRAMENTAS ABORDADAS
- Curves (principal)
- Levels
- Brilho/Contraste
- Exposure
- Sombras/Realces

---

### TEORIA (30%)

#### Entendendo Tons: Sombras, Meios-Tons e Highlights

Uma imagem é composta por 3 zonas de luminosidade:

- **Shadows (Sombras)**: Partes escuras (0-85 no histograma)
- **Midtones (Meios-Tons)**: Partes médias (86-170)
- **Highlights (Luzes Altas)**: Partes claras (171-255)

Cada ferramenta de ajuste manipula essas zonas de forma diferente.

#### Curves: Controle Total de Luz por Tom

**Analogia:** Curves é como um equalizador de música, mas para luz. Você pode aumentar o volume (clarear) apenas dos graves (sombras), apenas dos agudos (highlights), ou qualquer faixa específica.

**Como funciona o gráfico de Curves:**
- Eixo X (horizontal): Tons de entrada (como a imagem ESTÁ)
- Eixo Y (vertical): Tons de saída (como a imagem VAI FICAR)
- Diagonal: Nenhuma alteração (entrada = saída)
- Curva para CIMA: Clareia aquele tom
- Curva para BAIXO: Escurece aquele tom

**Pontos importantes:**
- Canto inferior esquerdo: Preto puro (sombras)
- Canto superior direito: Branco puro (highlights)
- Centro: Meios-tons

#### Levels vs Curves

**Levels** - Ferramenta simplificada
- 3 sliders: Shadows, Midtones, Highlights
- Bom para ajustes rápidos
- Menos controle preciso

**Curves** - Ferramenta avançada
- Infinitos pontos de controle
- Ajuste qualquer tom específico
- Controle total sobre o contraste

**Use Levels para:** Ajustes rápidos, definir preto/branco puro
**Use Curves para:** Ajustes precisos, contraste seletivo, correções complexas

#### Quando Usar Cada Ferramenta

**Brilho/Contraste** - Ajuste global simples
- Bom para: Pequenos ajustes rápidos
- Problema: Afeta tudo igualmente, pode estourar highlights

**Exposure** - Simula exposição de câmera
- Bom para: Fotos muito sub/superexpostas
- Inclui: Offset (sombras) e Gamma (meios-tons)

**Sombras/Realces** - Recuperação seletiva
- Bom para: Recuperar detalhes em sombras ou highlights
- Usa AI para detectar e ajustar automaticamente

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Salvar Foto Subexposta (Escura Demais)

1. Abra uma foto subexposta (escura)
2. **Layer > New Camada de Ajuste > Curves**
3. Na curva, clique no CENTRO da diagonal
4. Arraste o ponto para CIMA
5. Observe: a foto fica mais clara

**Ajuste refinado:**
- Clique na parte inferior-esquerda da curva (sombras)
- Levante levemente para recuperar detalhes escuros
- Clique na parte superior (highlights)
- Abaixe levemente se estourar brancos

---

#### PASSO 2: Aumentar Contraste com Curva S

O "S Curve" é a técnica mais usada para contraste:

1. Na mesma Camada de Ajuste de Curves
2. Clique na parte inferior da curva (1/4 do caminho)
3. Puxe levemente para BAIXO (escurece sombras)
4. Clique na parte superior (3/4 do caminho)
5. Puxe levemente para CIMA (clareia highlights)

Resultado: Formato de "S" suave = contraste agradável.

**DICA PRO:** S muito pronunciado = contraste exagerado. Comece sutil.

---

#### PASSO 3: Salvar Foto Superexposta (Clara Demais)

1. Abra uma foto superexposta (clara demais, sem detalhes nos brancos)
2. **Layer > New Camada de Ajuste > Curves**
3. Clique no canto SUPERIOR DIREITO da curva
4. Arraste para BAIXO e ESQUERDA
5. Isso recupera detalhes nos highlights

**Se ainda estiver muito clara:**
- Clique no centro e puxe para baixo
- Isso escurece os meios-tons

**Alternativa com Exposure:**
1. **Layer > New Camada de Ajuste > Exposure**
2. Reduza **Exposure** para -0.5 a -2.0
3. Ajuste **Offset** para recuperar sombras
4. Ajuste **Gamma** para meios-tons

---

#### PASSO 4: Usar Levels para Definir Preto e Branco

1. **Layer > New Camada de Ajuste > Levels**
2. Observe o histograma:
   - Se não toca a esquerda: falta preto verdadeiro
   - Se não toca a direita: falta branco verdadeiro

3. Arraste o slider PRETO (esquerda) até tocar o início do histograma
4. Arraste o slider BRANCO (direita) até tocar o fim do histograma
5. Isso define o "range" completo de tons

**DICA PRO:** Segure Alt enquanto arrasta para ver "clipping" (áreas que ficam 100% preto ou branco).

---

#### PASSO 5: Recuperar Detalhes com Sombras/Realces

Para fotos com partes muito escuras E muito claras:

1. Primeiro, converta para Objeto Inteligente: **Filtro > Convert for Filtros Inteligentes**
2. **Imagem > Adjustments > Sombras/Realces**
3. Ajuste:
   - **Shadows**: 20-50% (recupera detalhes escuros)
   - **Highlights**: 10-30% (recupera detalhes claros)
4. Marque "Show More Options" para ajustes finos:
   - **Tone**: Qual faixa considerar sombra/highlight
   - **Radius**: Área de transição

---

#### PASSO 6: Ajuste por Canal (Correção de Dominante)

Curves também corrige dominantes de cor:

1. Na Camada de Ajuste de Curves
2. No dropdown "RGB", selecione **Red**
3. Se a foto está muito vermelha: puxe a curva PARA BAIXO
4. Se falta vermelho (muito ciano): puxe PARA CIMA

5. Repita para **Green** e **Blue** conforme necessário

**Correção de branco:**
- Use o conta-gotas de "Set White Point" 
- Clique em algo que deveria ser branco puro
- O Photoshop corrige automaticamente a dominante

---

### PROJETO PRÁTICO

**Desafio:** Salvar duas fotos problemáticas (uma sub e uma superexposta)

**Briefing:**
- Baixe 1 foto escura demais (subexposta)
- Baixe 1 foto clara demais (superexposta)
- Corrija ambas para exposição balanceada
- Adicione contraste sutil com S Curve
- Exporte comparativo antes/depois

**Passo a passo - Foto Subexposta:**
1. Curves: levantar centro e sombras
2. Levels: definir branco verdadeiro
3. S Curve sutil para contraste

**Passo a passo - Foto Superexposta:**
1. Curves: baixar highlights e centro
2. Sombras/Realces: recuperar detalhes
3. Levels: definir preto verdadeiro

**Critérios de sucesso:**
- Detalhes visíveis em sombras E highlights
- Contraste agradável (não esmagado)
- Sem áreas 100% preto ou branco (exceto se desejado)
- Edição não-destrutiva (Camadas de Ajuste)

---

### ERROS A EVITAR

**Erro 1:** Usar Brilho/Contraste para correções grandes
**Solução:** Use Curves ou Exposure para ajustes significativos

**Erro 2:** Estourar highlights (brancos sem detalhes)
**Solução:** Segure Alt ao ajustar Levels para ver clipping

**Erro 3:** Esmagar sombras (pretos sem detalhes)
**Solução:** Mantenha a curva acima do canto inferior esquerdo

**Erro 4:** S Curve muito pronunciada
**Solução:** Contraste sutil é mais profissional, comece pequeno

**Erro 5:** Não usar Objeto Inteligente para Sombras/Realces
**Solução:** Converta para Objeto Inteligente antes para ser editável

---

### ATALHOS DESTA AULA

- \`Ctrl+M\` - Curves (direto, evite)
- \`Ctrl+L\` - Levels (direto, evite)
- \`Alt+arrastar slider\` - Ver clipping em Levels
- \`Ctrl+clique na curva\` - Adicionar ponto do tom clicado na imagem
- \`Ctrl+G\` - Agrupar Camadas de Ajuste
- \`\\\` - Preview antes/depois

**Próxima aula:** "Camera Raw Filter" - Você vai descobrir o editor de fotos mais poderoso escondido dentro do Photoshop.

---

### FAQ

**P: Curves ou Levels, qual usar?**
R: Curves para controle preciso, Levels para ajustes rápidos de range. Profissionais preferem Curves.

**P: Minha foto ainda está escura nos cantos, o que fazer?**
R: Isso é vinheta. Use Curves com máscara ou Filtro > Lens Correction > Vignetting.

**P: Posso usar múltiplas Curves na mesma imagem?**
R: Sim! Uma para exposição geral, outra para contraste, outra para cor. Organize em grupo.

**P: O histograma deve tocar as duas pontas?**
R: Em geral sim, significa que você tem range tonal completo. Mas depende da intenção artística.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 9 ====================
const PHOTOSHOP_LESSON_9 = `
### OBJETIVO DA AULA

Dominar técnicas avançadas de correção de cor: Corresponder Cor para unificar fotos diferentes, Cor Seletiva para ajustes precisos, Filtro de Foto para looks criativos, e Gradacao de Cores para criar identidade visual consistente. Você vai criar presets salvos para feeds de Instagram coesos.

**Por que isso importa?** Feeds de Instagram consistentes têm 30% mais engajamento. Clientes pagam premium por identidade visual forte. Saber criar e salvar presets acelera seu trabalho e cria portfólio reconhecível.

---

### DURAÇÃO ESTIMADA: 45 minutos

### FERRAMENTAS ABORDADAS
- Corresponder Cor (Imagem > Adjustments)
- Cor Seletiva (Camada de Ajuste)
- Filtro de Foto (Camada de Ajuste)
- Gradacao de Cores (Camera Raw / Curves)
- Salvar presets e Actions

---

### TEORIA (30%)

#### O que é Gradacao de Cores?

Gradacao de Cores é a arte de criar uma "atmosfera" visual através de cores. Diferente de correção de cor (que corrige problemas), grading é criativo e estilístico.

**Exemplos famosos:**
- Filme "Matrix": Tom verde, atmosfera digital
- Filme "Mad Max Fury Road": Laranja vibrante, deserto intenso
- Instagram influencer: Tons pastel, estética consistente

#### Corresponder Cor: Unificando Fotos Diferentes

Corresponder Cor copia as cores de uma foto para outra. Útil quando:
- Fotos do mesmo ensaio com iluminação diferente
- Quer aplicar look de referência em suas fotos
- Unificar feed de Instagram

#### Cor Seletiva: Controle Cirúrgico

Cor Seletiva permite ajustar APENAS certas cores sem afetar outras:
- Quer azuis mais vibrantes mas vermelhos iguais? Possível
- Quer tons de pele mais quentes mas céu inalterado? Possível
- Controla: Cyan, Magenta, Yellow, Black de cada cor

#### Filtro de Foto: Looks Rápidos

Filtro de Foto simula filtros de câmera reais:
- Warming Filter (quente, laranja)
- Cooling Filter (frio, azul)
- Sepia, Deep Blue, etc

É o caminho mais rápido para aplicar "mood" consistente.

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Unificar Fotos com Corresponder Cor

1. Abra sua foto DESTINO (que vai receber as cores)
2. Abra a foto REFERÊNCIA (que tem as cores desejadas) em outra aba
3. Na foto DESTINO, vá em **Imagem > Adjustments > Corresponder Cor**
4. Em "Source", selecione o documento da foto referência
5. Ajuste:
   - **Luminance**: Equaliza brilho
   - **Color Intensity**: Força das cores aplicadas
   - **Fade**: Suaviza o efeito (use 20-40% para inicio)
6. Clique OK

**DICA PRO:** Corresponder Cor funciona melhor quando as fotos têm conteúdo similar (ambas retratos, ambas paisagens).

---

#### PASSO 2: Ajuste Preciso com Cor Seletiva

1. **Layer > New Camada de Ajuste > Cor Seletiva**
2. No dropdown "Colors", selecione **Reds** (para ajustar tons de pele)
3. Ajuste os sliders:
   - **Cyan**: -10 a -20 (remove tom ciano, pele mais quente)
   - **Magenta**: +5 a +10 (adiciona rosado natural)
   - **Yellow**: +5 a +15 (dourado saudável)
   - **Black**: -5 a +5 (clareia ou escurece vermelhos)

4. Selecione **Blues** (para céus)
   - **Cyan**: +20 (azul mais profundo)
   - **Blue**: +15 (intensifica azul)

5. Selecione **Neutrals** (afetar toda a imagem)
   - Pequenos ajustes aqui afetam tudo sutilmente

---

#### PASSO 3: Aplicar Filtro de Foto para Mood

1. **Layer > New Camada de Ajuste > Filtro de Foto**
2. Escolha um filtro preset:
   - **Warming Filter (85)**: Laranja quente, pôr do sol
   - **Cooling Filter (80)**: Azul frio, atmosfera
   - **Sepia**: Vintage clássico

3. Ajuste **Density**: 15-30% para sutileza
4. Mantenha "Preserve Luminosity" marcado

**Para criar filtro personalizado:**
1. Selecione "Color" em vez de "Filter"
2. Clique no quadrado de cor
3. Escolha qualquer cor (ex: #FFD4B3 para dourado suave)
4. Ajuste Density

---

#### PASSO 4: Gradacao de Cores com Curves (Método Avançado)

Para looks cinematográficos profissionais:

1. **Layer > New Camada de Ajuste > Curves**
2. Selecione o canal **Red**
   - Levante levemente os highlights (adiciona laranja)
   - Baixe levemente as sombras (adiciona ciano às sombras)

3. Selecione o canal **Blue**
   - Baixe os highlights (remove azul = mais amarelo/dourado)
   - Levante as sombras (adiciona azul às sombras)

Resultado: Look "Orange and Teal" cinematográfico.

**Split Toning simplificado:**
- Sombras frias (azul) + Highlights quentes (laranja) = cinema moderno
- Sombras quentes + Highlights frios = vintage nostálgico

---

#### PASSO 5: Criar Preset Salvo (Action)

Para aplicar o mesmo look em múltiplas fotos:

1. Vá em **Janela > Actions**
2. Clique no ícone de pasta (Create new set)
3. Nome: "Meus Presets"
4. Clique no ícone de + (Create new action)
5. Nome: "Feed Instagram Quente"
6. Clique **Record** (botão vermelho ativa)

7. AGORA, faça todos os ajustes que quer salvar:
   - Adicione Vibrance +30
   - Adicione Filtro de Foto Warming 20%
   - Adicione Cor Seletiva (seus ajustes)

8. Quando terminar, clique no quadrado **Stop** no painel Actions
9. Sua action está salva!

**Para aplicar em outra foto:**
1. Abra a nova foto
2. Vá em **Janela > Actions**
3. Selecione sua action
4. Clique no botão **Play** (triângulo)
5. Todos os ajustes são aplicados automaticamente!

---

#### PASSO 6: Aplicar Unidade Visual em 3 Fotos

1. Escolha 3 fotos diferentes (paisagem, retrato, produto)
2. Defina seu "look" criando Camadas de Ajuste na primeira
3. Quando satisfeito, salve como Action
4. Aplique a Action nas outras 2 fotos
5. Faça ajustes menores se necessário (cada foto é diferente)

**Estrutura de layers para cada foto:**
- Gradacao de Cores (Curves)
- Filtro de Foto
- Cor Seletiva (opcional)
- Vibrance
- Foto Original

---

### PROJETO PRÁTICO

**Desafio:** Criar identidade visual para feed de Instagram (3 fotos unificadas)

**Briefing:**
- Baixe 3 fotos diferentes mas complementares
- Crie um "look" característico (quente, frio, vintage, etc)
- Salve como Action reutilizável
- Aplique em todas, ajuste individualmente
- Exporte como grid 3x1

**Passo a passo:**
1. Escolha estilo: Warm Golden / Cool Teal / Vintage Brown
2. Crie look na foto 1 usando ferramentas aprendidas
3. Grave como Action
4. Aplique nas fotos 2 e 3
5. Fine-tune cada uma (pele, céu, etc)
6. Exporte dimensões Instagram (1080x1080 ou 1080x1350)

**Critérios de sucesso:**
- 3 fotos com identidade visual clara
- Mesmo "mood" reconhecível
- Ajustes individuais mantendo coesão
- Action funcional e salva

---

### ERROS A EVITAR

**Erro 1:** Corresponder Cor com fotos muito diferentes
**Solução:** Use fotos de conteúdo similar (paisagem com paisagem)

**Erro 2:** Filtro de Foto muito forte (Density 50%+)
**Solução:** Comece com 15-25%, sutileza é elegância

**Erro 3:** Cor Seletiva alterando cores indesejadas
**Solução:** Use máscara na Camada de Ajuste para limitar área

**Erro 4:** Action gravada com seleção ou tamanho específico
**Solução:** Deselecione tudo antes de gravar, use valores relativos

**Erro 5:** Mesmo preset para TODAS as fotos sem ajuste
**Solução:** Preset é base, sempre fine-tune individualmente

---

### ATALHOS DESTA AULA

- \`Alt+Ctrl+Shift+E\` - Stamp Visible (nova layer mesclada)
- \`Ctrl+Shift+A\` - Camera Raw Filter
- \`F9\` - Abrir painel Actions (algumas versões)
- \`Ctrl+Alt+A\` - Selecionar todas as layers
- \`Ctrl+G\` - Agrupar Camadas de Ajuste

**Próxima aula:** "Efeitos e Filtros Criativos" - Você vai explorar Filtros Neurais, Blur Gallery e efeitos que transformam fotos em arte.

---

### FAQ

**P: Corresponder Cor não está funcionando bem, o que fazer?**
R: Certifique que a foto referência está aberta como documento separado (não apenas layer). Ajuste Fade para suavizar.

**P: Posso compartilhar minhas Actions com outros?**
R: Sim! No painel Actions, clique no menu > Save Actions. Gera arquivo .atn compartilhável.

**P: Como fazer o grid de 3 fotos para Instagram?**
R: Crie documento 3240x1080px (3x largura), cole cada foto lado a lado, exporte como JPEG.

**P: Cor Seletiva vs Matiz/Saturacao, qual usar?**
R: Matiz/Saturacao muda a cor em si. Cor Seletiva ajusta os componentes CMYK de cada cor. Selective é mais preciso para tons de pele.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 10 ====================
const PHOTOSHOP_LESSON_10 = `
### OBJETIVO DA AULA

Dominar as ferramentas de retoque do Photoshop: Pincel de Recuperacao para Manchas, Pincel de Recuperacao, Carimbo, Ferramenta Correcao e Mover Sensivel ao Conteudo. Você vai aprender a remover manchas de produtos e imperfeições de pele de forma natural e profissional.

**Por que isso importa?** Retoque de produto e retrato são 50% do trabalho de fotógrafos e designers. Saber usar as ferramentas certas = resultados naturais. Usar errado = pele plastificada ou edição óbvia.

---

### DURAÇÃO ESTIMADA: 40 minutos

### FERRAMENTAS ABORDADAS
- Pincel de Recuperacao para Manchas (J)
- Pincel de Recuperacao (J)
- Carimbo (S)
- Ferramenta Correcao (J)
- Mover Sensivel ao Conteudo

---

### TEORIA (30%)

#### Healing vs Clone: A Diferença Crucial

**Healing Tools (Spot Healing, Pincel de Recuperacao, Patch)**
- MISTURAM a textura copiada com o entorno
- Preservam luz, sombra e cor do local
- Ideal para: Pele, superfícies uniformes, fundos
- Resultado: Correção invisível

**Carimbo**
- COPIA exatamente os pixels de origem
- Não faz nenhuma mistura
- Ideal para: Padrões repetitivos, edges, detalhes precisos
- Resultado: Cópia perfeita (cuidado com repetição óbvia)

#### Quando Usar Cada Ferramenta

**Pincel de Recuperacao para Manchas (J)**
- Manchas pequenas e isoladas
- Espinhas, sardas, poeira
- Mais rápido: só clique, sem definir origem

**Pincel de Recuperacao (J)**
- Manchas que precisam de origem específica
- Áreas onde você precisa controlar de onde copia
- Alt+clique define origem, depois pinta

**Carimbo (S)**
- Bordas nítidas, padrões, logos
- Quando healing "borra" demais
- Reconstruir partes que não existem

**Ferramenta Correcao (J)**
- Áreas grandes (fundos, roupas)
- Arrasta seleção para área similar
- Sensivel ao Conteudo blending automático

**Mover Sensivel ao Conteudo**
- Mover objetos de lugar
- O Photoshop preenche o buraco automaticamente

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Preparar Layer de Retoque

SEMPRE retoque em layer separada:

1. Abra uma foto de retrato ou produto
2. **Ctrl+J** para duplicar a layer
3. Renomeie para: **"retoque"**

OU para método não-destrutivo:
1. Crie nova layer vazia acima da foto
2. Renomeie para: **"retoque"**
3. Nas ferramentas de healing, marque **"Sample All Layers"**

---

#### PASSO 2: Pincel de Recuperacao para Manchas (Remoção Rápida)

1. Selecione a layer "retoque"
2. Pressione **J** para Pincel de Recuperacao para Manchas
3. Na barra de opções:
   - **Type**: Sensivel ao Conteudo
   - **Sample All Layers**: Marcado (se usando layer vazia)
4. Ajuste tamanho do brush: levemente maior que a mancha
5. Clique sobre manchas pequenas (espinhas, poeira, arranhões)

**DICA PRO:** Para cada mancha, use pincelada única. Não esfregue repetidamente.

---

#### PASSO 3: Pincel de Recuperacao (Controle de Origem)

Para manchas onde Spot Healing não funciona bem:

1. Pressione **J** e selecione **Pincel de Recuperacao** (segundo na lista)
2. Na barra de opções:
   - **Source**: Sampled
   - **Sample**: All Layers (se usando layer vazia)
3. Segure **Alt** e clique em área de textura boa (define origem)
4. Solte Alt e pinte sobre a mancha
5. O Photoshop mistura a textura da origem com a luz/cor do destino

**Exemplo prático - Olheiras:**
1. Alt+clique na bochecha (textura de pele boa)
2. Pinte suavemente sob os olhos
3. A textura é copiada mas a iluminação do local é preservada

---

#### PASSO 4: Carimbo (Cópia Exata)

Para edges nítidos ou padrões:

1. Pressione **S** para Carimbo
2. Configure:
   - **Opacity**: 100% para cópia exata, menos para blending
   - **Sample**: All Layers
3. **Alt+clique** para definir origem
4. Pinte sobre a área de destino

**Quando usar Clone em vez de Healing:**
- Próximo a bordas (healing pode borrar)
- Repetir padrões (tijolos, tecidos)
- Reconstruir partes que faltam
- Logos e texto

**DICA PRO:** Mude a origem frequentemente para evitar padrões repetitivos óbvios.

---

#### PASSO 5: Ferramenta Correcao (Áreas Grandes)

Para remover objetos grandes ou arrumar fundos:

1. Pressione **J** e selecione **Ferramenta Correcao**
2. Na barra de opções:
   - **Patch**: Sensivel ao Conteudo
   - **Structure**: 4-5 (quanto preservar da estrutura)
   - **Color**: 5-7 (quanto blend de cor)
3. Desenhe uma seleção ao redor do que quer remover
4. Arraste a seleção para uma área limpa similar
5. Solte: o Photoshop substitui com blending automático

**Exemplo:** Remover pessoa de fundo de praia
1. Patch ao redor da pessoa
2. Arraste para área vazia da areia
3. A pessoa some, areia preenche naturalmente

---

#### PASSO 6: Mover Sensivel ao Conteudo

Para mover objetos mantendo a cena:

1. Vá em **Editar > Mover Sensivel ao Conteudo Tool** (ou J e selecione)
2. Desenhe seleção ao redor do objeto
3. Arraste para nova posição
4. O Photoshop:
   - Move o objeto
   - Preenche o buraco de origem automaticamente
   - Blenda nas duas áreas

**Modo "Extend":** Duplica e blenda (ex: alongar grama, multiplicar flores)

---

#### PASSO 7: Retoque de Pele Profissional

Para resultados naturais em rostos:

1. Use **Spot Healing** para: espinhas, manchas, pelos soltos
2. Use **Pincel de Recuperacao** para: olheiras (suavizar, não remover 100%)
3. Use **Carimbo 20% opacity** para: suavizar rugas sem remover
4. NUNCA: remova poros, linhas de expressão totalmente, ou mude características

**Regra de ouro:** Retoque deve ser INVISÍVEL. Se parece editado, você foi longe demais.

---

### PROJETO PRÁTICO

**Desafio:** Retocar produto + retrato

**Briefing:**
- Baixe 1 foto de produto com imperfeições (arranhões, poeira)
- Baixe 1 retrato com skin imperfections
- Limpe ambos usando as ferramentas corretas
- Mantenha resultado natural

**Passo a passo - Produto:**
1. Layer de retoque separada
2. Spot Healing para poeira e partículas
3. Carimbo para arranhões em bordas
4. Ferramenta Correcao para manchas grandes

**Passo a passo - Retrato:**
1. Layer de retoque separada  
2. Spot Healing para espinhas
3. Pincel de Recuperacao para manchas maiores
4. Carimbo 20% para suavizar olheiras (não remover)
5. Manter poros e textura de pele

**Critérios de sucesso:**
- Produto: sem defeitos visíveis
- Retrato: natural, não "plastificado"
- Textura de pele preservada
- Edição invisível

---

### ERROS A EVITAR

**Erro 1:** Remover todos os poros e textura de pele
**Solução:** Preserve textura, remova apenas defeitos temporários

**Erro 2:** Usar Carimbo em área uniforme (deixa repetição)
**Solução:** Use Healing para áreas uniformes, Clone só para padrões

**Erro 3:** Brush muito grande
**Solução:** Brush levemente maior que a mancha, não 5x maior

**Erro 4:** Não criar layer de retoque separada
**Solução:** SEMPRE duplique ou use layer vazia com Sample All Layers

**Erro 5:** Olheiras removidas 100%
**Solução:** Suavize 30-50%, não elimine (parece alienígena)

---

### ATALHOS DESTA AULA

- \`J\` - Healing Tools (cicla entre elas)
- \`S\` - Carimbo
- \`Alt+clique\` - Definir origem
- \`[\` e \`]\` - Diminuir/Aumentar brush
- \`Shift+[\` e \`]\` - Hardness do brush
- \`Ctrl+Z\` - Desfazer última pincelada
- \`Ctrl+Alt+Z\` - Múltiplos undos

**Próxima aula:** "Liquify e Transformações" - Você vai aprender manipulação de forma com Liquify, Warp e Puppet Warp.

---

### FAQ

**P: Spot Healing está criando manchas estranhas, o que fazer?**
R: Use Pincel de Recuperacao com origem definida manualmente, ou tente Ferramenta Correcao.

**P: Como retocar sem perder textura de pele?**
R: Use sempre zoom 100%, brush pequeno, e preserve os poros naturais.

**P: Carimbo está deixando padrões repetitivos, como resolver?**
R: Mude a origem frequentemente (Alt+clique em áreas diferentes).

**P: Qual diferença entre Preenchimento Sensivel ao Conteudo e Ferramenta Correcao?**
R: Preenchimento Sensivel ao Conteudo (Editar > Fill) é automático para seleções. Ferramenta Correcao dá controle sobre de onde copiar.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 11 ====================
const PHOTOSHOP_LESSON_11 = `
### OBJETIVO DA AULA

Dominar Objetos Inteligentes e Filtros Inteligentes para edição totalmente não-destrutiva. Você vai aprender a aplicar efeitos editáveis, entender a diferença entre Objeto Inteligente e layer rasterizada, e usar Linked Objetos Inteligentes para updates automáticos.

**Por que isso importa?** Objetos Inteligentes são a diferença entre amador e profissional. Permitem mudar QUALQUER efeito depois, sem perda de qualidade. Clientes mudam de ideia - com Objetos Inteligentes, você adapta em segundos.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Objetos Inteligentes (conceito)
- Convert to Objeto Inteligente
- Filtros Inteligentes
- Linked Objetos Inteligentes
- Edit Contents

---

### TEORIA (30%)

#### Objeto Inteligente: A Cápsula Protetora

**Analogia:** Imagine colocar sua imagem dentro de uma cápsula transparente. Você pode fazer QUALQUER coisa com a cápsula (redimensionar, aplicar filtros, distorcer), mas a imagem original dentro permanece intacta e perfeita.

Quando você precisa mudar algo, abre a cápsula, edita, fecha, e todas as mudanças se propagam automaticamente.

#### Objeto Inteligente vs Layer Rasterizada

**Layer Rasterizada (Normal)**
- Pixels são modificados diretamente
- Redimensionar para menor e depois maior = perda de qualidade
- Aplicar filtro = permanente, não pode ajustar valores
- Mais "leve" em termos de arquivo

**Objeto Inteligente**
- Pixels originais protegidos
- Redimensionar infinitamente sem perda
- Filtros editáveis (Filtros Inteligentes)
- Arquivo maior, mas flexível

#### Quando Usar Objetos Inteligentes

**SEMPRE use para:**
- Elementos que podem ser redimensionados
- Qualquer filtro que você queira ajustar depois
- Logos e vetores importados
- Elementos repetidos (edita um, atualiza todos)

**Pode evitar para:**
- Pintura direta com brush
- Retoque com healing tools
- Quando arquivo MUITO pesado é problema

#### Linked vs Embedded Objetos Inteligentes

**Embedded (Incorporado)**
- Conteúdo salvo DENTRO do arquivo PSD
- Arquivo maior
- Independente de arquivos externos

**Linked (Vinculado)**
- Referencia arquivo externo
- Arquivo PSD menor
- Atualiza automaticamente se o arquivo externo mudar
- Ótimo para: logos, elementos usados em múltiplos projetos

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Converter Layer em Objeto Inteligente

1. Abra uma foto qualquer
2. Clique direito na layer no painel Layers
3. Selecione **Convert to Objeto Inteligente**
4. Observe: um ícone pequeno aparece no thumbnail (indica Objeto Inteligente)

**Alternativa via menu:** Layer > Objetos Inteligentes > Convert to Objeto Inteligente

---

#### PASSO 2: Aplicar Filtro Inteligente (Blur Editável)

1. Com o Objeto Inteligente selecionado
2. Vá em **Filtro > Blur > Gaussian Blur**
3. Configure: Radius 5px
4. Clique OK

**Observe no painel Layers:**
- Abaixo do Objeto Inteligente, aparece "Filtros Inteligentes"
- Abaixo dele, "Gaussian Blur" com ícone de máscara

5. Para EDITAR o blur depois: **dê duplo clique em "Gaussian Blur"**
6. A janela reabre, mude para Radius 15px
7. Clique OK - o efeito atualiza!

---

#### PASSO 3: Adicionar Sharpen Editável

1. No mesmo Objeto Inteligente, vá em **Filtro > Sharpen > Smart Sharpen**
2. Configure:
   - **Amount**: 100%
   - **Radius**: 1px
   - **Remove**: Gaussian Blur
3. Clique OK

**Agora você tem:**
- Objeto Inteligente
  - Filtros Inteligentes (máscara)
    - Smart Sharpen
    - Gaussian Blur

Ambos os filtros são 100% editáveis!

---

#### PASSO 4: Usar Máscara de Filtro Inteligente

A máscara branca ao lado de "Filtros Inteligentes" controla onde os efeitos aparecem:

1. Clique na máscara de Filtros Inteligentes
2. Pressione **B** para Brush
3. Cor preta selecionada
4. Pinte sobre uma área (ex: rosto)
5. O blur/sharpen NÃO afeta onde você pintou de preto

**Isso permite:** Blur no fundo, mas rosto nítido.

---

#### PASSO 5: Redimensionar sem Perda

1. Pressione **Ctrl+T** para Transformacao Livre
2. Segure **Shift** e redimensione para 20% do tamanho
3. Pressione **Enter** para confirmar
4. Agora **Ctrl+T** novamente
5. Redimensione de volta para 100%

**Resultado:** Imagem perfeita, sem perda de qualidade!

Se fosse layer rasterizada: estaria pixelada e destruída.

---

#### PASSO 6: Criar Linked Objeto Inteligente

1. Vá em **Arquivo > Place Linked**
2. Escolha um arquivo (ex: logo.png de outro projeto)
3. Posicione e confirme com Enter
4. A layer mostra ícone de link

**Teste a magia:**
1. Abra o arquivo logo.png original em outro programa
2. Faça uma edição e salve
3. Volte ao Photoshop
4. O logo ATUALIZA automaticamente!

Ideal para: logos usados em múltiplas peças, elementos de marca.

---

#### PASSO 7: Editar Conteúdo de Objeto Inteligente

Para editar a imagem DENTRO do Objeto Inteligente:

1. Dê duplo clique no thumbnail do Objeto Inteligente
2. Abre um arquivo .psb temporário
3. Faça suas edições (ex: ajuste de cor)
4. **Ctrl+S** para salvar
5. Feche o .psb
6. Volte ao documento principal: as mudanças estão lá!

**Isso serve para:** Editar ilustrações complexas, ajustar elementos, etc.

---

### PROJETO PRÁTICO

**Desafio:** Criar composição com efeitos 100% editáveis

**Briefing:**
- Abra uma foto de paisagem
- Converta para Objeto Inteligente
- Aplique Gaussian Blur para efeito "tilt-shift"
- Aplique Smart Sharpen nas áreas focadas
- Use máscara para controlar onde cada efeito aparece
- Redimensione para testar não-destrutivo

**Passo a passo:**
1. Convert to Objeto Inteligente
2. Filtro > Blur > Gaussian Blur (10px)
3. Pintar máscara: preto no centro (foco), branco nas bordas (blur)
4. Filtro > Sharpen > Smart Sharpen (100%, 1px)
5. Ctrl+T, diminuir para 50%, confirmar
6. Ctrl+T, voltar para 100%
7. Duplo clique em Gaussian Blur, mudar para 5px
8. Verificar qualidade perfeita

**Critérios de sucesso:**
- Efeito tilt-shift visível
- Centro da imagem nítido
- Bordas com blur suave
- Qualidade 100% após redimensionamentos
- Filtros editáveis (pode mudar valores)

---

### ERROS A EVITAR

**Erro 1:** Esquecer de converter antes de aplicar filtro
**Solução:** SEMPRE converta para Objeto Inteligente primeiro

**Erro 2:** Rasterizar Objeto Inteligente sem necessidade
**Solução:** Mantenha como Objeto Inteligente o máximo possível

**Erro 3:** Linked Objeto Inteligente com arquivo movido/deletado
**Solução:** Mantenha arquivos vinculados em pasta organizada

**Erro 4:** Tentar pintar/retocar diretamente em Objeto Inteligente
**Solução:** Crie layer separada acima para retoque

**Erro 5:** Arquivo muito pesado por muitos Objetos Inteligentes
**Solução:** Para projetos grandes, use mais Linked e menos Embedded

---

### ATALHOS DESTA AULA

- \`Ctrl+T\` - Transformacao Livre
- \`Ctrl+S\` - Salvar (dentro de Objeto Inteligente)
- \`Duplo clique no SO\` - Editar conteúdo
- \`Duplo clique no filtro\` - Editar configurações
- \`Clique direito > Rasterize\` - Converter para pixels (perde edição)

**Próxima aula:** "Liquify e Transformações" - Você vai dominar Liquify, Warp, e Puppet Warp para manipulação de forma.

---

### FAQ

**P: Posso converter Objeto Inteligente de volta para layer normal?**
R: Sim, clique direito > Rasterize Layer. Mas você PERDE todos os benefícios.

**P: Filtros Inteligentes ficam pesados no arquivo?**
R: Sim, especialmente com múltiplos filtros. Para arquivos finais, considere Flatten.

**P: Linked Objeto Inteligente mostra "?" vermelho, o que fazer?**
R: O arquivo original foi movido. Clique direito > Relink to File e localize.

**P: Posso aninhar Objetos Inteligentes dentro de Objetos Inteligentes?**
R: Sim! É útil para organização complexa, mas pode ficar confuso. Use com moderação.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 12 ====================
const PHOTOSHOP_LESSON_12 = `
### OBJETIVO DA AULA

Dominar Estilos de Camada modernos e sutis: Sombra Projetada profissional, Stroke elegante e Sobreposicao de Degrade refinado. Você vai criar um botão CTA que parece moderno (não anos 2000!) seguindo regras de design contemporâneo.

**Por que isso importa?** Estilos de Camada mal usados = design datado instantaneamente. Bevel & Emboss exagerado, sombras duras, gradientes chamativos gritam "amador". Estilos sutis = percepção premium.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Estilos de Camada (fx)
- Sombra Projetada
- Sombra Interna
- Stroke
- Sobreposicao de Degrade
- Copy/Paste Estilos de Camada

---

### TEORIA (30%)

#### Estilos de Camada: O que Evitar (Anos 2000)

**Erros clássicos que datam seu design:**
- Bevel & Emboss em tudo (parece WordArt)
- Sombra Projetada com Distance 20px+ (muito afastada)
- Sombras com Opacity 50%+ (muito escuras)
- Brilho Externo neon (a menos que seja proposital)
- Gradientes de 3+ cores

#### Estilos de Camada: O que Usar (2024)

**Regras modernas:**
- Sombra Projetada: 2-4px distance, 20-30% opacity
- Sombras difusas (Size alto, Distance baixo)
- Cores de sombra: use a cor do objeto escurecida, não preto puro
- Strokes finos: 1-2px
- Gradientes sutis: 2 cores próximas

#### A Regra de Ouro das Sombras Modernas

**Sombra sutil = elegância**
- Distance: 2-4px (objeto parece levemente elevado)
- Size: 8-16px (sombra difusa, não dura)
- Opacity: 20-30% (sutil, não pesada)
- Angle: 120-135° (luz vindo de cima-esquerda, natural)
- Color: Não preto! Use azul escuro ou a cor do fundo escurecida

#### Sobreposicao de Degrade Moderno

**O que funciona:**
- Duas cores próximas (ex: azul gradiente para azul levemente diferente)
- Direção que simula luz (mais claro em cima)
- Opacity 50-80% sobre cor sólida

**O que datava em 2005:**
- Rainbow gradients
- Transições bruscas
- Cores complementares extremas

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Criar Base do Botão CTA

1. Novo documento: 500x200px, fundo #F5F5F5 (cinza claro)
2. Selecione **Rounded Ferramenta Retangulo** (U)
3. Configure:
   - Fill: #2563EB (azul)
   - Radius: 8px
4. Desenhe um retângulo: ~200x50px
5. Renomeie a layer para: **"btn-cta"**

---

#### PASSO 2: Adicionar Texto ao Botão

1. Pressione **T** (Ferramenta Texto)
2. Digite: "COMEÇAR AGORA"
3. Configure:
   - Fonte: Inter Bold (ou Arial Bold)
   - Tamanho: 16px
   - Cor: Branco (#FFFFFF)
   - Tracking: 50 (espaçamento entre letras)
4. Centralize sobre o botão
5. Renomeie para: **"txt-btn"**

---

#### PASSO 3: Aplicar Sombra Projetada MODERNO

1. Selecione a layer "btn-cta"
2. Clique no ícone **fx** no painel Layers
3. Escolha **Sombra Projetada**
4. Configure (valores modernos!):
   - **Blend Mode**: Multiply
   - **Color**: #1E3A5F (azul escuro, NÃO preto)
   - **Opacity**: 25%
   - **Angle**: 120°
   - **Distance**: 4px
   - **Spread**: 0%
   - **Size**: 12px
5. Clique OK

**Compare:** Isso é MUITO mais sutil que o padrão (que seria Distance 5, Opacity 75%).

---

#### PASSO 4: Adicionar Sobreposicao de Degrade Sutil

1. Dê duplo clique na layer "btn-cta" para abrir Estilos de Camada
2. Marque **Sobreposicao de Degrade**
3. Configure:
   - **Blend Mode**: Normal
   - **Opacity**: 100%
   - Clique no gradiente para editar:
     - Cor esquerda: #3B82F6 (azul claro)
     - Cor direita: #2563EB (azul original)
   - **Style**: Linear
   - **Angle**: 90° (claro em cima, escuro embaixo)
4. Clique OK

**Resultado:** Botão com sutilíssima variação de cor simulando luz.

---

#### PASSO 5: Adicionar Stroke Fino (Opcional)

Para definição extra nas bordas:

1. Ainda em Estilos de Camada, marque **Stroke**
2. Configure:
   - **Size**: 1px
   - **Position**: Inside
   - **Blend Mode**: Normal
   - **Opacity**: 30%
   - **Color**: #1E40AF (azul mais escuro)
3. Clique OK

**Efeito:** Borda quase invisível que dá definição.

---

#### PASSO 6: Criar Versão Hover (Estado de Mouse Over)

1. Duplique a layer "btn-cta" (**Ctrl+J**)
2. Renomeie para: **"btn-cta-hover"**
3. Dê duplo clique para abrir Estilos de Camada
4. Em Sombra Projetada:
   - Aumente **Distance** para 6px
   - Aumente **Size** para 16px
5. Em Sobreposicao de Degrade:
   - Mude cor esquerda para #60A5FA (mais claro)
6. Clique OK

**Efeito:** Botão parece "subir" no hover, feedback visual.

---

#### PASSO 7: Copiar Estilos para Outros Elementos

Para aplicar o mesmo estilo em outros elementos:

1. Clique direito na layer "btn-cta"
2. Selecione **Copy Estilo de Camada**
3. Selecione outra shape layer
4. Clique direito > **Paste Estilo de Camada**

Todos os efeitos são aplicados instantaneamente!

**Para salvar como preset:**
1. Janela > Styles
2. Com a layer estilizada selecionada
3. Clique no ícone "+" no painel Styles
4. Nomeie: "CTA Button Modern"

---

### PROJETO PRÁTICO

**Desafio:** Criar set de 3 botões CTA modernos

**Briefing:**
- Botão Primário: Azul, sombra sutil
- Botão Secundário: Outline (só stroke), sem preenchimento
- Botão Terciário: Cinza, mais discreto

**Regras obrigatórias:**
- Sombra Projetada: Distance 2-4px, Opacity 20-30%
- Sem Bevel & Emboss
- Gradientes máximo 2 cores
- Strokes máximo 2px

**Passo a passo:**
1. Criar botão primário (azul) com estilos aprendidos
2. Duplicar, mudar para outline (fill transparent, stroke visível)
3. Duplicar, mudar para cinza (#6B7280) com sombra mais clara
4. Alinhar os 3 horizontalmente
5. Exportar como showcase

**Critérios de sucesso:**
- Visual moderno e limpo
- Hierarquia clara (primário se destaca mais)
- Sem efeitos exagerados
- Consistência nos estilos

---

### ERROS A EVITAR

**Erro 1:** Sombra Projetada com Distance 10px+
**Solução:** Máximo 4px para look moderno

**Erro 2:** Sombra preta pura (#000000)
**Solução:** Use cor escurecida do objeto ou azul escuro

**Erro 3:** Opacity de sombra 50%+
**Solução:** Mantenha entre 15-30%

**Erro 4:** Usar Bevel & Emboss
**Solução:** Praticamente nunca use (exceto casos muito específicos)

**Erro 5:** Gradientes com 3+ cores
**Solução:** Máximo 2 cores próximas no espectro

---

### ATALHOS DESTA AULA

- \`Duplo clique na layer\` - Abrir Estilos de Camada
- \`Alt+arrastar fx\` - Copiar estilos para outra layer
- \`Clique direito > Copy/Paste Estilo de Camada\` - Copiar estilos
- \`Clique direito > Clear Estilo de Camada\` - Remover todos os estilos
- \`Shift+clique em fx\` - Ocultar/Mostrar todos os estilos

**Próxima aula:** "Mockups e Apresentação" - Você vai aprender a criar mockups profissionais para apresentar seu trabalho.

---

### FAQ

**P: Quando posso usar Brilho Externo?**
R: Para efeitos de luz neon intencionais, botões de games, ou UI futurista. Não para design corporativo.

**P: Como fazer sombra direcional (como iluminação de janela)?**
R: Aumente muito o Distance (20-40px) mas mantenha Opacity baixa (10-15%). Funciona para mockups.

**P: Posso aplicar Estilo de Camada em grupo?**
R: Sim! Clique direito no grupo > Blending Options. Afeta todo o conteúdo do grupo.

**P: Como fazer botão glass/vidro moderno?**
R: Sombra Interna branco 50% opacity em cima, gradiente sutil, background blur é feito com backdrop-filter (CSS) ou blur layer abaixo.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 13 ====================
const PHOTOSHOP_LESSON_13 = `
### OBJETIVO DA AULA

Dominar Preenchimento Generativo, a ferramenta de IA revolucionária do Photoshop 2024. Você vai aprender a adicionar objetos em fotos, remover elementos, expandir imagens, e usar prompts eficazes para resultados profissionais usando o modelo Adobe Firefly 3.

**Por que isso importa?** Preenchimento Generativo mudou o jogo. O que levava horas agora leva segundos. Adicionar objetos, remover fundo, expandir canvas - tudo com IA. Designers que dominam essa ferramenta são 10x mais produtivos.

---

### DURAÇÃO ESTIMADA: 40 minutos

### FERRAMENTAS ABORDADAS
- Preenchimento Generativo (menu Editar / Contextual bar)
- Adobe Firefly Model 3
- Prompts em inglês
- Gerar Semelhante
- Expansao Generativa

---

### TEORIA (30%)

#### O que é Preenchimento Generativo?

Preenchimento Generativo usa o modelo Adobe Firefly (treinado em conteúdo licenciado) para:

- **Adicionar objetos**: "coffee cup on wooden table"
- **Remover objetos**: Selecionar e gerar vazio
- **Substituir fundos**: Selecionar fundo e descrever novo
- **Expandir imagens**: Aumentar canvas e preencher

Tudo acontece diretamente no Photoshop, integrado ao seu workflow.

#### Como Funciona o Modelo Firefly 3

**Firefly 3 (2024)** é a última versão:
- Melhor compreensão de prompts
- Resultados mais realistas
- Melhor matching de iluminação
- Menos artefatos

**IMPORTANTE:** Prompts funcionam MELHOR em inglês. O Firefly foi treinado majoritariamente em inglês.

#### Anatomia de um Bom Prompt

**Estrutura eficaz:**
\`[objeto] + [descrição] + [contexto]\`

**Exemplos:**
- "coffee cup, ceramic, white, on wooden table"
- "green plant, tropical leaves, soft shadows"
- "person walking, casual clothes, sunny day"

**Palavras que ajudam:**
- Materiais: "ceramic", "metal", "wood", "glass"
- Iluminação: "soft light", "dramatic shadows", "natural lighting"
- Estilo: "realistic", "professional photo", "product shot"

#### Gerar Semelhante vs Novo Prompt

- **Generate (com prompt)**: Cria baseado na sua descrição
- **Generate (vazio)**: Preenche continuando o contexto
- **Gerar Semelhante**: Variações da última geração

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Preparar Imagem

1. Abra uma foto de cena (ex: mesa vazia, paisagem, quarto)
2. Certifique que está logado na Adobe (necessário para Firefly)
3. Verifique conexão com internet (Firefly é baseado em nuvem)

---

#### PASSO 2: Adicionar Objeto com Preenchimento Generativo

1. Selecione área onde quer adicionar o objeto:
   - Use **Ferramenta Laco (L)** para seleção livre
   - Ou **Letreiro Retangular (M)** para área retangular
2. Uma barra contextual aparece com "Preenchimento Generativo"
3. Clique em **Preenchimento Generativo**
4. Digite o prompt em inglês: "coffee cup, white ceramic, steam rising"
5. Clique **Generate**
6. Aguarde 5-15 segundos (processamento na nuvem)
7. Três variações aparecem no painel Properties
8. Clique em cada para visualizar
9. Escolha a melhor

**DICA PRO:** Se nenhuma agradou, clique em "Generate" novamente para mais 3 variações.

---

#### PASSO 3: Refinar com Gerar Semelhante

Se uma variação está quase perfeita:

1. Selecione a variação mais próxima do que você quer
2. Clique em **Gerar Semelhante** (ou Generate novamente)
3. O Firefly gera variações baseadas na selecionada
4. Continue até encontrar o resultado ideal

---

#### PASSO 4: Remover Objeto

1. Use **Ferramenta Selecao de Objeto (W)** para selecionar o objeto indesejado
2. Ou desenhe seleção com Lasso ao redor
3. Clique em **Preenchimento Generativo**
4. DEIXE O PROMPT VAZIO
5. Clique **Generate**
6. O Firefly preenche com o contexto ao redor (remove o objeto)

**Exemplo:** Remover pessoa de foto de praia
1. Selecao de Objeto na pessoa
2. Preenchimento Generativo vazio
3. A praia/mar preenche naturalmente

---

#### PASSO 5: Expandir Imagem (Expansao Generativa)

Para aumentar a imagem além das bordas originais:

1. **Imagem > Tamanho da Tela de Pintura** (ou Ctrl+Alt+C)
2. Aumente Width e/ou Height (ex: +200px cada lado)
3. As áreas novas aparecem transparentes (xadrez)
4. Selecione as áreas transparentes (Varinha Magica em transparent)
5. **Preenchimento Generativo** com prompt vazio
6. O Firefly continua a imagem naturalmente

**Método alternativo:**
1. Use a **Ferramenta Corte Demarcado (C)**
2. Arraste para FORA da imagem
3. Marque "Fill" como "Expansao Generativa" na barra de opções
4. Confirme o crop
5. Automático!

---

#### PASSO 6: Trocar Fundo Completo

1. Use **Selecionar > Subject** para selecionar a pessoa/objeto
2. **Selecionar > Inverse** (Ctrl+Shift+I) para selecionar o FUNDO
3. **Preenchimento Generativo**
4. Prompt: "tropical beach, sunny day, palm trees"
5. Generate
6. Pessoa permanece, fundo muda completamente!

---

#### PASSO 7: Toques Finais e Blend

Às vezes o Preenchimento Generativo precisa de ajustes:

1. Observe se a iluminação está consistente
2. Se não:
   - Use **Curves Camada de Ajuste** sobre a área gerada
   - Ajuste para match com o resto da imagem
3. Se bordas estão visíveis:
   - Use **Pincel de Recuperacao** para suavizar transições
4. A layer gerada é editável e independente

---

### PROJETO PRÁTICO

**Desafio:** Transformar cena simples em composição elaborada

**Briefing:**
- Baixe foto de mesa de madeira vazia
- Adicione: xícara de café, livro, planta pequena
- Use 3 operações de Preenchimento Generativo diferentes
- Expanda a imagem 20% para cada lado

**Passo a passo:**
1. Abrir foto da mesa
2. Lasso na área 1 > "coffee cup, ceramic, latte art"
3. Lasso na área 2 > "open book, vintage, reading glasses on top"
4. Lasso na área 3 > "small succulent plant, terracotta pot"
5. Tamanho da Tela de Pintura +20% > Preenchimento Generativo vazio nas bordas
6. Ajustar iluminação se necessário

**Critérios de sucesso:**
- 3 objetos adicionados naturalmente
- Iluminação consistente
- Bordas expandidas sem cortes óbvios
- Composição visualmente harmoniosa

---

### ERROS A EVITAR

**Erro 1:** Prompt em português
**Solução:** Use inglês para melhores resultados

**Erro 2:** Prompt muito vago ("add something nice")
**Solução:** Seja específico: objeto + material + contexto

**Erro 3:** Seleção muito pequena para o objeto
**Solução:** Faça seleção maior que o objeto desejado

**Erro 4:** Não verificar iluminação
**Solução:** Compare luz do objeto gerado com o resto da cena

**Erro 5:** Aceitar primeira geração sem explorar
**Solução:** Sempre gere múltiplas variações antes de decidir

---

### ATALHOS DESTA AULA

- \`M\` - Letreiro Retangular
- \`L\` - Ferramenta Laco
- \`W\` - Selecao de Objeto
- \`Ctrl+Shift+I\` - Inverse Selection
- \`Ctrl+D\` - Deselect
- \`Ctrl+Alt+C\` - Tamanho da Tela de Pintura

**Próxima aula:** "Ferramenta Remover e Filtros Neurais" - Você vai explorar mais ferramentas de IA para remoção e transformação.

---

### FAQ

**P: Preenchimento Generativo não aparece, o que fazer?**
R: Certifique que está no Photoshop 2024+, logado na Adobe, com internet. Algumas regiões requerem atualização.

**P: Posso usar resultados de Preenchimento Generativo comercialmente?**
R: Sim! Firefly foi treinado em conteúdo licenciado, é seguro para uso comercial.

**P: Por que minhas gerações estão ruins?**
R: Use prompts mais específicos em inglês. Adicione detalhes: material, iluminação, estilo.

**P: Quanto custa usar Preenchimento Generativo?**
R: Incluído na assinatura Creative Cloud. Há limite de gerações mensais dependendo do plano.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 14 ====================
const PHOTOSHOP_LESSON_14 = `
### OBJETIVO DA AULA

Dominar técnicas de expansão de imagem com IA: Expansao Generativa via Ferramenta Corte Demarcado, Tamanho da Tela de Pintura + Preenchimento Generativo, e Generate Background. Você vai aprender a converter proporções de imagem (1:1 para 4:5) quando o cliente envia arquivo na proporção errada.

**Por que isso importa?** Clientes frequentemente enviam fotos com proporção errada. Em vez de recortar e perder conteúdo, agora você EXPANDE com IA. Isso salva projetos e impressiona clientes.

---

### DURAÇÃO ESTIMADA: 30 minutos

### FERRAMENTAS ABORDADAS
- Expansao Generativa (Ferramenta Corte Demarcado)
- Tamanho da Tela de Pintura + Preenchimento Generativo
- Generate Background
- Preenchimento Sensivel ao Conteudo (legado)

---

### TEORIA (30%)

#### O Problema: Proporções Incompatíveis

**Cenário comum:**
- Cliente envia foto 1:1 (quadrada)
- Você precisa de 4:5 (Instagram portrait)
- Recortar = perder conteúdo importante
- Solução antiga: esticar (ruim) ou aceitar (limitante)
- **Solução 2024: Expansao Generativa**

#### Proporções Comuns que Você Precisa Conhecer

| Uso | Proporção | Pixels Típicos |
|-----|-----------|----------------|
| Instagram Feed | 1:1 | 1080x1080 |
| Instagram Portrait | 4:5 | 1080x1350 |
| Instagram Story/Reels | 9:16 | 1080x1920 |
| YouTube Thumbnail | 16:9 | 1280x720 |
| Facebook Cover | 16:9 | 1640x856 |
| LinkedIn Post | 1.91:1 | 1200x627 |

#### Métodos de Expansão

**1. Expansao Generativa (Ferramenta Corte Demarcado)**
- Mais rápido
- Automático
- Ótimo para expansões simples

**2. Tamanho da Tela de Pintura + Preenchimento Generativo**
- Mais controle
- Pode usar prompt
- Ótimo para expansões complexas

**3. Generate Background**
- Específico para fundos
- Mantém o subject intacto
- Novo em 2024

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Converter 1:1 para 4:5 (Método Rápido)

1. Abra uma foto quadrada (1:1)
2. Pressione **C** para Ferramenta Corte Demarcado
3. Na barra de opções, clique no dropdown de proporção
4. Selecione **4:5** (ou digite 4:5 no campo)
5. Agora arraste as BORDAS do crop para FORA da imagem
6. As áreas novas ficam escurecidas
7. Na barra de opções, certifique que **Fill: Expansao Generativa** está selecionado
8. Pressione **Enter** para confirmar
9. Aguarde a IA preencher as novas áreas

---

#### PASSO 2: Expansão com Tamanho da Tela de Pintura (Mais Controle)

1. Abra uma foto qualquer
2. Vá em **Imagem > Tamanho da Tela de Pintura** (Ctrl+Alt+C)
3. Configure:
   - **Width**: +200 pixels (ou % desejado)
   - **Height**: +400 pixels
   - **Anchor**: Centro (todas as direções expandem)
4. Clique OK
5. Áreas transparentes aparecem
6. Use **Varinha Magica (W)** com Tolerance 0 para selecionar o transparente
7. **Preenchimento Generativo** com prompt vazio
8. A IA preenche continuando a imagem

---

#### PASSO 3: Expansão Unilateral (Só Uma Direção)

Para expandir apenas para baixo (ex: 1:1 para 4:5):

1. **Imagem > Tamanho da Tela de Pintura**
2. Configure Height: 1350 pixels (se era 1080)
3. Clique no **Anchor** no TOPO (seta aponta para cima)
4. Isso expande apenas para BAIXO
5. Selecione área nova > Preenchimento Generativo vazio

**Útil para:** Expandir céu para cima, chão para baixo, etc.

---

#### PASSO 4: Usar Prompt para Direcionar a Expansão

Quando a expansão automática não fica ideal:

1. Selecione a área transparente/nova
2. **Preenchimento Generativo**
3. Digite prompt descritivo em inglês:
   - "continuation of wooden floor"
   - "blue sky with clouds"
   - "beach sand, waves approaching"
4. Generate
5. A IA segue sua direção

---

#### PASSO 5: Generate Background (Trocar Fundo)

Para substituir o fundo enquanto mantém o subject:

1. **Selecionar > Subject** (seleciona pessoa/objeto)
2. **Selecionar > Inverse** (Ctrl+Shift+I) para selecionar fundo
3. **Preenchimento Generativo**
4. Prompt: "modern office, blurred background, natural lighting"
5. Generate
6. O fundo muda, subject permanece intacto

**Diferente de Expand:** Aqui você SUBSTITUI, não continua o que existe.

---

#### PASSO 6: Situação Real - Cliente Envia 1:1, Precisa 4:5

**Workflow completo:**

1. Recebe foto 1080x1080 do cliente
2. **Imagem > Tamanho da Tela de Pintura**
3. Height: 1350px, Anchor: Center
4. Novas áreas: 135px em cima, 135px embaixo
5. **Select All** (Ctrl+A), depois **Contract Selection** pelo tamanho original
6. Ou: Varinha Magica no transparente
7. Preenchimento Generativo vazio
8. Verificar resultado
9. **Exportar Como** > 1080x1350 JPEG

**Resultado:** Foto expandida naturalmente, cliente impressionado.

---

### PROJETO PRÁTICO

**Desafio:** Converter foto quadrada para 3 proporções diferentes

**Briefing:**
- Baixe uma foto de produto ou retrato (quadrada)
- Converta para: 4:5, 16:9, e 9:16
- Use Expansao Generativa para cada uma
- Exporte as 3 versões

**Passo a passo:**
1. Abrir foto 1:1
2. Ferramenta Corte Demarcado > 4:5 > Expansao Generativa > Export
3. Reabrir original > 16:9 > Expansao Generativa > Export
4. Reabrir original > 9:16 > Expansao Generativa > Export
5. Comparar as 3 versões

**Critérios de sucesso:**
- Nenhuma expansão óbvia/artificial
- Subject principal mantido intacto
- Transições suaves e naturais
- Todas as proporções corretas

---

### ERROS A EVITAR

**Erro 1:** Expandir muito de uma vez (ex: 500% maior)
**Solução:** Expanda em etapas menores para melhor qualidade

**Erro 2:** Não verificar a direção da luz
**Solução:** A expansão deve manter consistência de iluminação

**Erro 3:** Esquecer de selecionar "Expansao Generativa" no Crop
**Solução:** Verifique o dropdown "Fill" na barra de opções

**Erro 4:** Expandir área com elementos complexos
**Solução:** Para rostos ou objetos complexos, use prompt mais específico

**Erro 5:** Não regenerar quando resultado é ruim
**Solução:** Sempre gere 2-3 variações antes de aceitar

---

### ATALHOS DESTA AULA

- \`C\` - Ferramenta Corte Demarcado
- \`Ctrl+Alt+C\` - Tamanho da Tela de Pintura
- \`W\` - Varinha Magica (para selecionar transparente)
- \`Enter\` - Confirmar crop
- \`Escape\` - Cancelar crop
- \`Ctrl+Shift+I\` - Inverter seleção

**Próxima aula:** "Ferramenta Remover" - Você vai dominar a ferramenta específica de remoção com IA do Photoshop 2024.

---

### FAQ

**P: Qual o limite de quanto posso expandir?**
R: Não há limite técnico, mas qualidade cai em expansões muito grandes. Recomendo máximo 50-100% por direção.

**P: Expansao Generativa funciona em todas as fotos?**
R: Funciona melhor em fundos simples/repetitivos. Fundos complexos podem precisar de ajustes.

**P: Posso usar prompt no Expansao Generativa do Ferramenta Corte Demarcado?**
R: No Ferramenta Corte Demarcado não. Para usar prompt, faça via Tamanho da Tela de Pintura + Preenchimento Generativo.

**P: A expansão fica no histórico?**
R: Sim, é uma layer editável. Você pode deletar e refazer se necessário.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 15 ====================
const PHOTOSHOP_LESSON_15 = `
### OBJETIVO DA AULA

Dominar o Ferramenta Remover do Photoshop 2024: a ferramenta mais rápida para remoção de objetos indesejados. Você vai aprender Remocao de Distracoes com 1 clique, comparar com o Sensivel ao Conteudo antigo, e criar resultados dramáticos removendo fios, postes e pessoas de fundos.

**Por que isso importa?** Quase toda foto tem algo indesejado: fios elétricos, postes, pessoas ao fundo, lixo. O Ferramenta Remover 2024 faz em segundos o que levava minutos. É a ferramenta que mais impressiona clientes.

---

### DURAÇÃO ESTIMADA: 30 minutos

### FERRAMENTAS ABORDADAS
- Ferramenta Remover (J) - ferramenta 2024
- Remocao de Distracoes (automático)
- Preenchimento Sensivel ao Conteudo (legado)
- Comparação antes/depois

---

### TEORIA (30%)

#### Ferramenta Remover vs Preenchimento Sensivel ao Conteudo: A Evolução

**Preenchimento Sensivel ao Conteudo (Antigo)**
- Requer seleção precisa primeiro
- Editar > Fill > Sensivel ao Conteudo
- Bom, mas trabalhoso
- Às vezes deixa artefatos

**Ferramenta Remover (2024)**
- Só pinte sobre o objeto
- IA faz o resto automaticamente
- Entende contexto melhor
- Resultados mais naturais

#### O que o Ferramenta Remover Faz Excepcionalmente Bem

**Objetos lineares:**
- Fios elétricos
- Postes
- Galhos finos
- Cercas

**Objetos em fundo simples:**
- Pessoas ao fundo
- Carros estacionados
- Placas
- Lixo/detritos

**Distrações pequenas:**
- Manchas no chão
- Objetos indesejados
- Logos em roupas

#### Remocao de Distracoes: 1 Clique

Novo em 2024: O Photoshop pode DETECTAR e REMOVER distrações automaticamente:

1. Selecionar > Subject
2. Clique no botão "Remover Distracoes" na barra contextual
3. O Photoshop identifica e remove fios, postes, etc do fundo

Isso é quase mágico para paisagens e fotos de produtos.

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Conhecer o Ferramenta Remover

1. Abra uma foto com elementos indesejados (fios elétricos, pessoas ao fundo)
2. Pressione **J** para acessar as ferramentas de retoque
3. Selecione **Ferramenta Remover** (ícone de band-aid com seta)
4. Observe a barra de opções:
   - **Size**: Tamanho do brush
   - **Remove after each stroke**: Remove automaticamente ao soltar

---

#### PASSO 2: Remover Fios Elétricos

1. Ajuste o Size para ser apenas maior que o fio (~10-20px)
2. Pinte sobre o fio de ponta a ponta com uma pincelada contínua
3. Ao soltar o mouse, a IA processa
4. O fio desaparece, céu preenche

**DICA PRO:** Para fios longos, faça em seções para melhor qualidade.

**Resultado antes/depois:** Céu limpo, sem distrações.

---

#### PASSO 3: Remover Pessoa do Fundo

1. Aumente o Size do brush (50-100px dependendo do tamanho)
2. Pinte sobre a pessoa inteira com pinceladas contínuas
3. Cubra completamente a silhueta
4. Solte o mouse
5. A pessoa desaparece, fundo preenche

**Quando funciona melhor:**
- Fundo relativamente simples
- Pessoa não sobrepondo o subject principal
- Boa iluminação

---

#### PASSO 4: Usar Remocao de Distracoes Automático

1. **Selecionar > Subject** para selecionar a pessoa/objeto principal
2. Na barra contextual que aparece, clique em **Remover Distracoes**
3. Aguarde processamento
4. O Photoshop remove automaticamente:
   - Fios elétricos
   - Postes
   - Objetos pequenos ao fundo
5. Revise o resultado

**Não funcionou perfeitamente?** Use o Ferramenta Remover manual para finalizar.

---

#### PASSO 5: Comparar com Preenchimento Sensivel ao Conteudo (Legado)

Para entender a diferença:

**Método antigo (Preenchimento Sensivel ao Conteudo):**
1. Use Ferramenta Laco para selecionar o objeto
2. **Editar > Fill** (Shift+F5)
3. Contents: Sensivel ao Conteudo
4. Clique OK

**Problemas:** Requer seleção precisa, às vezes preenche com algo errado.

**Método novo (Ferramenta Remover):**
1. Pinte sobre o objeto
2. Pronto

**Vantagem:** Muito mais rápido e geralmente mais preciso.

---

#### PASSO 6: Workflow Completo - Limpeza de Paisagem

**Cenário:** Foto de paisagem com fios, postes e pessoas indesejadas

1. Abra a foto
2. **Ctrl+J** para duplicar (backup)
3. Com Ferramenta Remover selecionado:
   - Remova fios: pinceladas longas e finas
   - Remova postes: pinceladas verticais grossas
   - Remova pessoas: cubra completamente
4. Verifique zoom 100% para artefatos
5. Se houver problemas, use Pincel de Recuperacao para refinamentos
6. Compare antes/depois

**Para comparação dramática:**
1. Desligue layer original (olho)
2. Screenshot do depois
3. Ligue layer original
4. Screenshot do antes
5. Mostre ao cliente: impacto visual imenso

---

### PROJETO PRÁTICO

**Desafio:** Limpar foto de paisagem/cidade de todas as distrações

**Briefing:**
- Baixe foto de paisagem urbana ou rural com:
  - Fios elétricos visíveis
  - Postes ou semáforos
  - Pelo menos 1 pessoa ao fundo
- Remova TODAS as distrações
- Crie comparativo antes/depois

**Passo a passo:**
1. Duplicar layer original
2. Ferramenta Remover: todos os fios
3. Ferramenta Remover: postes/semáforos
4. Ferramenta Remover: pessoas ao fundo
5. Pincel de Recuperacao: ajustes finais
6. Comparar antes/depois lado a lado

**Critérios de sucesso:**
- Nenhum fio visível no céu
- Nenhuma distração ao fundo
- Sem artefatos de remoção
- Resultado natural e limpo

---

### ERROS A EVITAR

**Erro 1:** Brush muito pequeno para o objeto
**Solução:** Use brush 20-30% maior que o objeto

**Erro 2:** Pinceladas fragmentadas
**Solução:** Use pinceladas contínuas cobrindo todo o objeto

**Erro 3:** Remover objeto que toca o subject principal
**Solução:** Faça com cuidado extremo ou use máscara

**Erro 4:** Não verificar em zoom 100%
**Solução:** Sempre revise em zoom real para identificar artefatos

**Erro 5:** Tentar remover objetos muito grandes/complexos
**Solução:** Para remoções grandes, use Preenchimento Generativo com prompt

---

### ATALHOS DESTA AULA

- \`J\` - Ferramenta Remover (cicla com outras healing tools)
- \`[\` e \`]\` - Diminuir/Aumentar brush
- \`Ctrl+Z\` - Desfazer última remoção
- \`Ctrl+Alt+Z\` - Múltiplos undos
- \`Shift+F5\` - Preenchimento Sensivel ao Conteudo (legado)
- \`\\\` - Visualizar antes/depois temporário

**Próxima aula:** "Filtros Neurais" - Você vai explorar os filtros de IA para transformação facial, colorização e efeitos artísticos.

---

### FAQ

**P: Ferramenta Remover ou Preenchimento Generativo para remoção?**
R: Ferramenta Remover para objetos pequenos/médios. Preenchimento Generativo para áreas grandes ou quando precisa de prompt.

**P: O Ferramenta Remover funciona em vídeo?**
R: Não diretamente. Para vídeo, use After Effects ou Premiere com Remove Object.

**P: Posso desfazer uma remoção específica?**
R: Cada remoção é uma pincelada. Use Ctrl+Z para desfazer a última.

**P: Ferramenta Remover deixou artefato, como corrigir?**
R: Use Pincel de Recuperacao ou Carimbo para finalizar manualmente.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 16 ====================
const PHOTOSHOP_LESSON_16 = `
### OBJETIVO DA AULA

Dominar exportação para redes sociais: entender Exportar Como, diferenças entre JPEG Q10-12, PNG-24 e WebP, conhecer as dimensões corretas para cada plataforma, e aplicar as regras de exportação para máxima qualidade com mínimo tamanho.

**Por que isso importa?** Exportar errado = perda de qualidade visível, arquivos pesados demais, ou rejeição pela plataforma. Cada rede tem especificações diferentes. Profissionais sabem exatamente qual formato usar e quando.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Exportar Como (menu Arquivo)
- Salvar para Web (legado)
- Formatos: JPEG, PNG-24, PNG-8, WebP
- Quality settings

---

### TEORIA (30%)

#### JPEG vs PNG vs WebP: Quando Usar Cada

**JPEG (Joint Photographic Experts Group)**
- Ideal para: FOTOS
- Compressão com perda
- Não suporta transparência
- Tamanho menor
- Quality 10-12 (de 12) = alta qualidade
- Quality 8-9 = bom equilíbrio
- Quality 1-7 = evite, degradação visível

**PNG-24 (Portable Network Graphics)**
- Ideal para: TEXTO, LOGOS, GRÁFICOS com bordas nítidas
- Compressão sem perda
- Suporta transparência
- Tamanho maior
- Use para: artes com texto, logos, ícones

**PNG-8**
- Versão reduzida do PNG
- Limitado a 256 cores
- Menor tamanho
- Use para: gráficos simples, ícones pequenos

**WebP**
- Formato moderno do Google
- Melhor compressão que JPEG e PNG
- Suporta transparência
- Não tem suporte universal (navegadores antigos)
- Use para: web quando compatibilidade não é problema

#### A Regra de Ouro da Exportação

**Foto real → JPEG Quality 11**
**Texto/Logo/Gráfico → PNG-24**
**Web moderna → WebP**
**Animação simples → GIF**

#### Dimensões por Plataforma (2024)

| Plataforma | Formato | Dimensões (px) |
|------------|---------|----------------|
| Instagram Feed | 1:1 | 1080x1080 |
| Instagram Portrait | 4:5 | 1080x1350 |
| Instagram Story/Reels | 9:16 | 1080x1920 |
| Instagram Profile | Circular | 320x320 |
| Facebook Post | 1.91:1 | 1200x630 |
| Facebook Cover | 2.7:1 | 820x312 |
| LinkedIn Post | 1.91:1 | 1200x627 |
| LinkedIn Banner | 4:1 | 1584x396 |
| Twitter/X Post | 16:9 | 1600x900 |
| YouTube Thumbnail | 16:9 | 1280x720 |
| TikTok | 9:16 | 1080x1920 |

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Conhecer o Exportar Como

1. Abra um documento finalizado
2. Vá em **Arquivo > Export > Exportar Como** (Ctrl+Alt+Shift+W)
3. Observe a interface:
   - **Preview**: Visualização em tempo real
   - **Format**: Seleção de formato
   - **Quality**: Controle de qualidade (para JPEG/WebP)
   - **Tamanho da Imagem**: Redimensionar na exportação
   - **Tamanho da Tela de Pintura**: Ajustar canvas se necessário

---

#### PASSO 2: Exportar FOTO como JPEG Q11

1. Com uma foto aberta, **Arquivo > Export > Exportar Como**
2. Configure:
   - **Format**: JPEG
   - **Quality**: Arraste para 85-90% (equivale a Q11)
   - **Tamanho da Imagem**: Mantenha 100% ou ajuste conforme necessário
3. Observe o tamanho do arquivo (mostra em KB/MB)
4. Clique **Export**
5. Escolha local e nome

**DICA PRO:** Para Instagram, sempre exporte em 1080px de largura mínima.

---

#### PASSO 3: Exportar GRÁFICO com TEXTO como PNG-24

1. Abra arte com texto ou logo
2. **Arquivo > Export > Exportar Como**
3. Configure:
   - **Format**: PNG
   - **Smaller File (8-bit)**: DESMARCADO (queremos PNG-24)
   - **Transparency**: Marque se precisa de transparência
4. Observe: bordas do texto ficam nítidas
5. Clique **Export**

**Por que não JPEG para texto?** JPEG cria artefatos ao redor de bordas nítidas, especialmente texto.

---

#### PASSO 4: Comparar Tamanhos e Qualidade

1. Exporte a MESMA arte como:
   - JPEG Q11 (85%)
   - JPEG Q8 (60%)
   - PNG-24
   - WebP Q11 (85%)
   - PNG-8 (se tiver poucas cores)
2. Compare os tamanhos:
   - PNG-24 será o maior
   - JPEG Q8 será o menor (mas com perda)
   - WebP terá melhor relação qualidade/tamanho
3. Abra cada um e compare em zoom 100%

---

#### PASSO 5: Exportar para Múltiplas Plataformas

Cenário: Mesma arte para Instagram, Facebook e LinkedIn

1. Crie documento 1080x1350 (Instagram Portrait)
2. Finalize sua arte
3. Exporte:
   - **Instagram**: 1080x1350 JPEG Q11
4. Redimensione (**Imagem > Tamanho da Imagem**):
   - **Facebook**: 1200x630 (recrop se necessário)
   - Exporte como JPEG Q11
5. Redimensione:
   - **LinkedIn**: 1200x627
   - Exporte como JPEG Q11

**Workflow eficiente:** Salve o Prancheta maior, derive os menores.

---

#### PASSO 6: Usar Exportar Como para Múltiplos Formatos

Para exportar várias versões de uma vez:

1. **Arquivo > Export > Exportar Como**
2. Configure o primeiro formato
3. Clique **Exportar Tudo** se disponível

Ou use Actions:
1. Crie Action que exporta em um formato
2. Arquivo > Automate > Batch para aplicar em múltiplos arquivos

---

### PROJETO PRÁTICO

**Desafio:** Exportar mesma arte em 5 formatos, comparar tamanho e qualidade

**Briefing:**
- Crie uma arte simples com: foto de fundo + texto overlay
- Exporte em:
  1. JPEG Q11 (85%)
  2. JPEG Q8 (60%)
  3. PNG-24
  4. PNG-8 (se possível)
  5. WebP Q11
- Compare tamanhos e qualidade visual
- Documente qual é melhor para qual uso

**Passo a passo:**
1. Criar arte 1080x1080 com foto + texto
2. Exportar Como > JPEG 85% > Anotar tamanho
3. Exportar Como > JPEG 60% > Anotar tamanho
4. Exportar Como > PNG-24 > Anotar tamanho
5. Exportar Como > PNG-8 > Anotar tamanho
6. Exportar Como > WebP 85% > Anotar tamanho
7. Criar tabela comparativa

**Resultado esperado:**
| Formato | Qualidade | Tamanho | Uso Ideal |
|---------|-----------|---------|-----------|
| JPEG 85% | Ótima | ~150KB | Redes sociais |
| JPEG 60% | Boa | ~80KB | Web (se necessário menor) |
| PNG-24 | Perfeita | ~400KB | Logos, texto |
| PNG-8 | Variável | ~100KB | Gráficos simples |
| WebP 85% | Ótima | ~100KB | Web moderna |

---

### ERROS A EVITAR

**Erro 1:** Exportar texto/logo como JPEG
**Solução:** Use PNG-24 para bordas nítidas

**Erro 2:** JPEG Quality muito baixo (<60%)
**Solução:** Mínimo 75% para qualidade aceitável, 85%+ para profissional

**Erro 3:** Não redimensionar antes de exportar
**Solução:** Ajuste para dimensões corretas da plataforma

**Erro 4:** Exportar em resolução muito alta para web
**Solução:** 1080-1200px de largura é suficiente para maioria das redes

**Erro 5:** Usar PNG para fotos grandes
**Solução:** PNG é para gráficos, fotos sempre JPEG ou WebP

---

### ATALHOS DESTA AULA

- \`Ctrl+Alt+Shift+W\` - Exportar Como
- \`Ctrl+Alt+Shift+S\` - Salvar para Web (legado)
- \`Ctrl+Shift+S\` - Save As
- \`Ctrl+Alt+I\` - Tamanho da Imagem

**Próxima aula:** "Automatizando com Actions" - Você vai criar Actions para automatizar tarefas repetitivas e processar múltiplos arquivos.

---

### FAQ

**P: Qual Quality usar para Instagram?**
R: JPEG 80-85% (Quality 10-11). Instagram recomprime, então não adianta mais que isso.

**P: WebP é melhor que JPEG?**
R: Tecnicamente sim, mas nem todos os softwares abrem WebP. Para redes sociais, JPEG ainda é mais universal.

**P: Por que minha imagem perde qualidade no Instagram?**
R: Instagram recomprime. Exporte em exatamente 1080px de largura para minimizar.

**P: Preciso exportar em sRGB?**
R: Sim! Para web/redes sociais, sempre sRGB. Outros perfis de cor podem parecer diferentes.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 17 ====================
const PHOTOSHOP_LESSON_17 = `
### OBJETIVO DA AULA

Dominar entrega profissional de assets para clientes: Export Pranchetas, naming conventions corretas, organização de pastas, e preparação de PSD editável. Você vai criar uma entrega completa com todas as versões que o cliente precisa.

**Por que isso importa?** Uma entrega desorganizada = cliente confuso e você respondendo perguntas. Uma entrega profissional = cliente impressionado, menos retrabalho, e indicações. A diferença entre amador e profissional está na organização.

---

### DURAÇÃO ESTIMADA: 35 minutos

### FERRAMENTAS ABORDADAS
- Export Pranchetas
- Naming conventions
- Estrutura de pastas
- Preparação de PSD editável
- Compactação para envio

---

### TEORIA (30%)

#### A Entrega Profissional Padrão

**O que o cliente espera receber:**
1. Arquivos finais (JPEG/PNG para uso imediato)
2. Versões em diferentes resoluções
3. Arquivo editável (PSD) para futuras alterações
4. Mockup de apresentação (opcional, mas impressiona)

#### Estrutura de Pastas Recomendada

\`\`\`
nome-do-projeto/
├── originais/
│   ├── projeto.psd
│   └── fontes-usadas.txt (ou link)
├── exportados/
│   ├── instagram/
│   │   ├── feed-1080x1080.jpg
│   │   └── story-1080x1920.jpg
│   ├── web/
│   │   ├── banner-1200x630.jpg
│   │   └── logo-transparente.png
│   └── print/
│       └── alta-resolucao-300dpi.jpg
└── mockups/
    └── apresentacao.jpg
\`\`\`

#### Naming Conventions (Convenções de Nomes)

**Regras fundamentais:**
- Tudo minúsculo
- Sem espaços (use hífen ou underscore)
- Sem acentos ou caracteres especiais
- Descritivo e específico

**Exemplos bons:**
- logo-principal-transparente.png
- banner-instagram-1080x1080.jpg
- flyer-frente-cmyk-300dpi.pdf

**Exemplos ruins:**
- Logo Final (2).png
- banner pro insta.jpg
- Versão Final CORRIGIDA.psd

#### O que Incluir no "fontes-usadas.txt"

\`\`\`
Fontes utilizadas neste projeto:
- Inter (Google Fonts: https://fonts.google.com/specimen/Inter)
- Playfair Display (Google Fonts)

Para editar o PSD, instale as fontes acima.
Se não instalar, o Photoshop substituirá por fontes padrão.
\`\`\`

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Preparar Pranchetas para Múltiplas Versões

1. Abra seu projeto finalizado
2. Se não tem Pranchetas, crie:
   - **Ferramenta Prancheta** (ou Janela > Pranchetas)
   - Clique em "New Prancheta"
   - Configure para cada tamanho necessário:
     - Prancheta 1: 1080x1080 (Instagram Feed)
     - Prancheta 2: 1080x1350 (Instagram Portrait)
     - Prancheta 3: 1080x1920 (Stories)

3. Duplique seu conteúdo para cada Prancheta
4. Ajuste o layout para cada proporção

---

#### PASSO 2: Naming dos Pranchetas

1. No painel Layers, dê duplo clique no nome de cada Prancheta
2. Renomeie com convenção clara:
   - "instagram-feed-1080x1080"
   - "instagram-portrait-1080x1350"
   - "instagram-story-1080x1920"

**Por que isso importa:** O Photoshop usa o nome do Prancheta como nome do arquivo exportado!

---

#### PASSO 3: Exportar Todos os Pranchetas de Uma Vez

1. **Arquivo > Export > Exportar Como**
2. Na lateral esquerda, você verá todos os Pranchetas listados
3. Marque todos que deseja exportar
4. Configure formato individualmente:
   - JPEG 85% para fotos
   - PNG-24 para logos/texto
5. Clique **Exportar Tudo**
6. Escolha a pasta "exportados"
7. Todos são salvos com os nomes corretos automaticamente

---

#### PASSO 4: Preparar PSD Editável para o Cliente

Antes de enviar o PSD, limpe-o:

1. Delete layers escondidas não utilizadas
2. Organice layers em grupos lógicos:
   - "textos"
   - "imagens"
   - "fundo"
   - "elementos"
3. Renomeie layers com nomes claros (não "Layer 1 copy copy")
4. Verifique se fontes estão disponíveis ou inclua lista
5. Delete Objetos Inteligentes desnecessários (pesam o arquivo)
6. **Arquivo > Save As** para pasta "originais"

---

#### PASSO 5: Criar Arquivo de Fontes Usadas

1. Crie um arquivo .txt chamado "fontes-usadas.txt"
2. Liste todas as fontes:
   \`\`\`
   Fontes utilizadas:
   
   1. Inter Bold
      - Download: https://fonts.google.com/specimen/Inter
      - Licença: Open Font License (gratuita)
   
   2. Playfair Display Regular
      - Download: https://fonts.google.com/specimen/Playfair+Display
      - Licença: Open Font License (gratuita)
   
   INSTRUÇÕES:
   - Baixe e instale as fontes antes de abrir o PSD
   - Sem as fontes, o texto aparecerá diferente
   \`\`\`
3. Salve na pasta "originais"

---

#### PASSO 6: Criar Mockup de Apresentação

Para impressionar o cliente:

1. Baixe um mockup gratuito (freepik, mockupworld)
2. Abra o mockup PSD
3. Encontre a Objeto Inteligente com "Insert Here" ou "Your Design"
4. Dê duplo clique no Objeto Inteligente
5. Cole sua arte
6. Salve e feche
7. O mockup atualiza automaticamente
8. Exporte como JPEG para pasta "mockups"

---

#### PASSO 7: Compactar e Entregar

1. Selecione a pasta "nome-do-projeto" inteira
2. Clique direito > Compactar (ou Send to > Compressed folder)
3. O arquivo .zip é criado
4. Envie via:
   - Google Drive (link compartilhável)
   - WeTransfer (para arquivos grandes)
   - Email (se menor que limite)

**Mensagem de entrega sugerida:**
\`\`\`
Olá [Nome]!

Segue a entrega do projeto [Nome do Projeto]:

📁 CONTEÚDO:
- /exportados: arquivos prontos para uso (JPEG/PNG)
- /originais: arquivo editável (PSD) + lista de fontes
- /mockups: apresentação visual

Os arquivos em /exportados estão otimizados para redes sociais.
Para edições futuras, use o PSD em /originais (instale as fontes primeiro).

Qualquer dúvida, estou à disposição!
\`\`\`

---

### PROJETO PRÁTICO

**Desafio:** Criar entrega completa para cliente fictício

**Briefing:**
- Crie uma arte simples (post de Instagram)
- Exporte em 3 versões (feed, portrait, story)
- Prepare PSD editável limpo
- Crie arquivo de fontes
- Organize tudo em estrutura de pastas
- Compacte para entrega

**Passo a passo:**
1. Criar arte com Pranchetas (3 tamanhos)
2. Nomear Pranchetas corretamente
3. Exportar Como > todos os formatos
4. Limpar PSD e salvar em /originais
5. Criar fontes-usadas.txt
6. (Opcional) Adicionar mockup
7. Compactar pasta completa

**Critérios de sucesso:**
- Estrutura de pastas correta
- Nomes de arquivos profissionais
- PSD organizado e editável
- Fontes documentadas
- Arquivo compactado pronto para envio

---

### ERROS A EVITAR

**Erro 1:** Nomes com espaços e acentos
**Solução:** Use hífen, minúsculas, sem acentos

**Erro 2:** Enviar só o arquivo final sem editável
**Solução:** Sempre inclua PSD para edições futuras

**Erro 3:** PSD desorganizado com "Layer 1 copy copy"
**Solução:** Limpe e organize antes de enviar

**Erro 4:** Não documentar fontes
**Solução:** Sempre inclua lista com links de download

**Erro 5:** Enviar arquivo gigante sem compactar
**Solução:** Compacte e use serviços de nuvem

---

### ATALHOS DESTA AULA

- \`Ctrl+Alt+Shift+W\` - Exportar Como
- \`Ctrl+G\` - Agrupar layers
- \`F2 (no Layer)\` - Renomear layer
- \`Ctrl+Shift+S\` - Save As

**Próxima aula:** "Automatizando com Actions" - Você vai criar Actions para automatizar exportações e tarefas repetitivas.

---

### FAQ

**P: Devo sempre enviar o PSD?**
R: Depende do contrato. Se vendeu "direitos totais" ou foi acordado, sim. Se não, verifique antes.

**P: Como reduzir o tamanho do PSD?**
R: Delete layers ocultas, flatten Objetos Inteligentes desnecessários, salve em PSB para arquivos muito grandes.

**P: Cliente não tem Photoshop, como ele edita?**
R: Ofereça Canva template, ou faça ajustes inclusos no preço. Ou use formats universais (PDF editável).

**P: Qual serviço usar para arquivos grandes?**
R: Google Drive (15GB grátis), WeTransfer (2GB grátis), Dropbox, ou seu próprio site.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: PHOTOSHOP AULA 18 ====================
const PHOTOSHOP_LESSON_18 = `
### OBJETIVO DA AULA

Dominar preparação de arquivos para impressão: entender CMYK vs RGB, configurar 300 DPI, adicionar bleed e crop marks, exportar em PDF/X-1a, e usar profiles corretos (FOGRA39). Você vai criar um flyer A5 pronto para enviar à gráfica.

**Por que isso importa?** Arquivo errado para impressão = dinheiro jogado fora. RGB não imprime certo, 72 DPI fica pixelado, sem bleed aparece borda branca. Gráficas rejeitam ou imprimem errado. Profissionais entregam certo de primeira.

---

### DURAÇÃO ESTIMADA: 45 minutos

### FERRAMENTAS ABORDADAS
- Color Mode (CMYK)
- Resolution (300 DPI)
- Canvas extension (bleed)
- Save as PDF (PDF/X-1a)
- Color profiles (FOGRA39)

---

### TEORIA (30%)

#### RGB vs CMYK: A Diferença Crucial

**RGB (Red, Green, Blue)**
- Cores de LUZ (tela)
- Monitores, celulares, web
- Cores vibrantes, ampla gama
- NÃO use para impressão!

**CMYK (Cyan, Magenta, Yellow, Key/Black)**
- Cores de TINTA (impressão)
- Papel, cartões, banners
- Cores mais "apagadas" que RGB
- OBRIGATÓRIO para gráfica

**ALERTA:** O que você vê na tela (RGB) NUNCA será idêntico ao impresso (CMYK). Cores muito vibrantes ficam mais opacas.

#### Resolução: DPI e PPI

**PPI (Pixels Per Inch)** - Digital
**DPI (Dots Per Inch)** - Impressão

**Regras:**
- Web: 72 PPI (suficiente para telas)
- Impressão: 300 DPI (padrão profissional)
- Banner grande (visto de longe): 150 DPI OK

**Se usar 72 DPI para impressão:** Imagem pixelada e borrada.

#### O que é Bleed (Sangria)?

Bleed é a área EXTRA além do tamanho final que será cortada.

**Por que precisa?**
- A guilhotina da gráfica não é 100% precisa
- Sem bleed: pequeno desvio = borda branca indesejada
- Com bleed: imagem vai até a borda mesmo com desvio

**Padrão:** 3mm de bleed (cada lado)

**Exemplo:** 
- Flyer A5 final: 148x210mm
- Com bleed: 154x216mm (3mm em cada lado)

#### Crop Marks (Marcas de Corte)

Linhas finas nos cantos que indicam onde a gráfica deve cortar.
Adicionadas automaticamente ao exportar PDF para impressão.

#### Color Profiles para Impressão

**FOGRA39** - Padrão europeu mais comum
**US Web Coated (SWOP) v2** - Padrão americano
**Coated vs Uncoated:**
- Coated: Papel brilhante/acetinado
- Uncoated: Papel fosco/offset

Pergunte à sua gráfica qual profile usar!

---

### PRÁTICA PASSO A PASSO

#### PASSO 1: Criar Documento para Impressão

1. **Arquivo > New** (Ctrl+N)
2. Na janela New Document:
   - **Preset Details**: Print
   - **Width**: 154 mm (A5 + bleed)
   - **Height**: 216 mm (A5 + bleed)
   - **Resolution**: 300 (Pixels/Inch)
   - **Color Mode**: CMYK Color, 8 bit
   - **Color Profile**: FOGRA39 (ou pergunte à gráfica)
3. Clique **Create**

**Alternativa sem bleed no documento:**
- Crie 148x210mm (A5 exato)
- Adicione bleed na exportação

---

#### PASSO 2: Configurar Guias para Margem de Segurança

1. **Exibir > New Guide Layout**
2. Configure:
   - **Margin**: 5mm (todos os lados)
3. Clique OK
4. Agora você tem:
   - Área externa 3mm: BLEED (será cortada)
   - Área interna 5mm da borda: MARGEM DE SEGURANÇA
   - Nunca coloque texto/elementos importantes fora da margem

---

#### PASSO 3: Desenvolver o Flyer

1. Adicione imagem de fundo que VAI ATÉ A BORDA (bleed)
2. Adicione textos DENTRO da margem de segurança
3. Adicione logo DENTRO da margem
4. Trabalhe normalmente

**DICA PRO:** Verifique cores em Exibir > Cores de Prova (Ctrl+Y) para simular CMYK.

---

#### PASSO 4: Verificar se Está em CMYK

1. Olhe na barra de título do documento
2. Deve mostrar "(CMYK/8)"
3. Se mostrar RGB, converta:
   - **Imagem > Mode > CMYK Color**
   - Photoshop avisa que cores podem mudar
   - Clique OK

**Atenção:** Alguns efeitos não funcionam em CMYK. Converta ao final.

---

#### PASSO 5: Exportar PDF para Impressão

1. **Arquivo > Save As** (Ctrl+Shift+S)
2. Formato: **Photoshop PDF**
3. Nome: flyer-a5-impressao.pdf
4. Clique **Save**
5. Na janela PDF Options:
   - **Adobe PDF Preset**: [PDF/X-1a:2001]
   - **Compatibility**: Acrobat 4 (PDF 1.3)
   - Em **Output**:
     - **Color Conversion**: No Conversion
     - **Profile Inclusion Policy**: Include All Profiles

---

#### PASSO 6: Adicionar Bleed e Crop Marks (via Illustrator/InDesign)

O Photoshop não adiciona crop marks nativamente. Opções:

**Opção 1: Marcar bleed manualmente**
1. Adicione guias em 3mm das bordas
2. Na exportação, informe a gráfica: "Bleed de 3mm incluído"

**Opção 2: Usar Illustrator/InDesign**
1. Exporte do Photoshop como TIFF (sem compressão)
2. Importe no Illustrator/InDesign
3. Adicione bleed e marcas na exportação PDF

**Opção 3: Confiar na gráfica**
1. Envie com área extra de 3mm
2. Informe: "Documento com 3mm de bleed em cada lado"
3. A gráfica profissional sabe o que fazer

---

#### PASSO 7: Checklist Final para Gráfica

Antes de enviar, verifique:

- [ ] **Color Mode**: CMYK (não RGB!)
- [ ] **Resolution**: 300 DPI
- [ ] **Bleed**: 3mm além do tamanho final
- [ ] **Margem de segurança**: textos 5mm para dentro
- [ ] **Fontes**: Rasterizadas ou incluídas
- [ ] **Imagens**: Não esticadas, alta resolução
- [ ] **Formato**: PDF/X-1a ou TIFF sem compressão
- [ ] **Profile**: FOGRA39 ou pedido pela gráfica

---

### PROJETO PRÁTICO

**Desafio:** Criar flyer A5 frente e verso pronto para gráfica

**Briefing:**
- Tamanho: A5 (148x210mm) + 3mm bleed
- Resolução: 300 DPI
- Modo: CMYK
- Criar frente e verso
- Exportar PDF pronto para impressão

**Passo a passo:**
1. Novo documento 154x216mm, 300 DPI, CMYK
2. Adicionar guias de margem (5mm)
3. Criar design da frente (imagem, texto, logo)
4. Duplicar documento para verso
5. Exportar ambos como PDF/X-1a
6. Verificar checklist

**Critérios de sucesso:**
- Documento em CMYK, 300 DPI
- Bleed de 3mm correto
- Textos dentro da margem de segurança
- PDF compatível com gráfica
- Cores simuladas em Cores de Prova

---

### ERROS A EVITAR

**Erro 1:** Enviar arquivo RGB
**Solução:** Sempre converta para CMYK antes de exportar

**Erro 2:** Resolução 72 DPI
**Solução:** Sempre 300 DPI para impressão

**Erro 3:** Sem bleed (texto/imagem até a borda)
**Solução:** Adicione 3mm extra e estenda elementos até lá

**Erro 4:** Texto muito perto da borda
**Solução:** Margem de segurança mínima de 5mm

**Erro 5:** Esperar que cores RGB apareçam iguais no impresso
**Solução:** Use Cores de Prova para simular e ajuste expectativas

---

### ATALHOS DESTA AULA

- \`Ctrl+Y\` - Cores de Prova (simular CMYK)
- \`Ctrl+Shift+S\` - Save As
- \`Ctrl+R\` - Mostrar réguas
- \`Exibir > New Guide Layout\` - Criar guias

**Parabéns!** Você completou o curso de Photoshop Essencial. Agora você domina desde o básico até exportação profissional!

---

### FAQ

**P: Minha gráfica pediu "arquivo aberto", o que envio?**
R: Envie o PSD ou TIFF. "Arquivo aberto" significa editável, não PDF.

**P: Posso converter de RGB para CMYK depois de pronto?**
R: Sim, mas cores podem mudar. Melhor começar em CMYK, ou converter no início.

**P: Qual a diferença entre coated e uncoated?**
R: Coated = papel brilhante/acetinado (cores mais vivas). Uncoated = fosco (cores absorvem mais).

**P: A gráfica pediu "curvas", o que é isso?**
R: Converter textos em formas (shapes). Texto > Convert to Shape. Evita problemas de fonte.

---

**Criado por:** Cauã - FreelanceFlow
**Última atualização:** Dezembro 2025
`;

// ==================== CONTEÚDO: MENTORIA (migrado do CareerModule) ====================
const MENTORIA_LESSONS: Lesson[] = [
    // Módulo 1: Prospecção
    {
        id: "mentoria_01",
        title: "Como Prospectar Clientes",
        isFree: true,
        module: "Prospecção",
        content: `
### O que é Prospecção de Clientes?

A prospecção é o processo estratégico de **identificar, atrair e iniciar contato com potenciais clientes** que demonstram interesse ou possível demanda pelos seus serviços de design. Não é um processo aleatório, mas sim uma atividade estruturada que aumenta suas chances de fechar projetos rentáveis.

### Técnicas Validadas de Prospecção para Designers

#### 1. Prospecção via Redes Sociais (Instagram)

O Instagram é a plataforma mais poderosa para designers prospectarem clientes, devido ao forte apelo visual.

**Passo a Passo:**
- Identifique o nicho de cliente ideal (ex: restaurantes, consultórios, agências de marketing)
- Use hashtags e palavras-chave específicas para encontrar potenciais clientes
- Analise perfis que se encaixam no seu ICP (Ideal Customer Profile)
- Envie mensagens diretas personalizadas referenciando trabalhos recentes ou conteúdos deles
- Mencione um projeto específico seu que possa resolver um problema que identifica no perfil

**Dica Importante:** A abordagem deve ser genuína e contextualizada. Referenciar um trabalho recente do prospect ou mencionar algo específico sobre o negócio dele aumenta significativamente as chances de resposta.

#### 2. Prospecção via Grupos de Interesse (Facebook e WhatsApp)

Grupos específicos reúnem seu cliente ideal em um único lugar.

**Como Funciona:**
- Participe ativamente de grupos onde seu cliente ideal está presente
- Não apenas divulgue seus serviços; **produza conteúdo de valor** para a comunidade
- Compartilhe seu portfólio naturalmente quando relevante
- Responda perguntas e dúvidas dos membros com generosidade

#### 3. Networking Presencial e Online

Construir relacionamentos reais gera as melhores conversões.

**Atividades Recomendadas:**
- Participar de eventos, palestras, workshops e meetups da área
- Apresentar seus trabalhos e ouvir necessidades do público-alvo direto
- Oferecer workshops ou talks sobre design

### Erros Comuns na Prospecção

❌ Abordagem genérica ("Olá, faço design gráfico")
❌ Não pesquisar sobre o cliente antes de abordar
❌ Focar apenas em vender, sem oferecer valor
❌ Não ter exemplos de portfólio para mostrar
❌ Desistir após poucas tentativas

✅ O correto é ser específico, pesquisar, oferecer valor, ter portfolio pronto e persistir.
    `
    },
    {
        id: "mentoria_02",
        title: "Como se Comunicar com Clientes",
        isFree: true,
        module: "Prospecção",
        content: `
### A Importância da Comunicação Eficaz

A capacidade de **comunicar ideias de forma objetiva** é tão importante quanto suas habilidades técnicas de design. Designers que se comunicam bem:
- Ganham confiança dos clientes
- Reduzem conflitos e mal-entendidos
- Conseguem mais indicações
- Cobram mais pelos seus serviços

### Princípios Fundamentais da Comunicação com Clientes

#### 1. Escuta Ativa

Antes de falar, você precisa ouvir profundamente.

**Como Implementar:**
- Faça perguntas abertas para entender o negócio do cliente
- Não interrompa — deixe o cliente falar completamente
- Tome notas sobre dores, objetivos e expectativas
- Demonstre interesse genuíno no que ele está contando

#### 2. Clareza e Simplicidade

Nunca use jargão de design sem explicar.

**Boas Práticas:**
- Explique conceitos técnicos em linguagem simples
- Evite termos como "kerning", "paleta de cores", sem contexto
- Prepare apresentações visuais de suas ideias, não apenas verbais

#### 3. Justificativa de Decisões de Design

Nunca diga "é bonito" — diga "é estratégico".

**Exemplo:**
❌ "Usei essa cor porque combina bem"
✅ "Usei essa cor porque ela transmite confiabilidade — pesquisas mostram que 78% de consumidores associam azul com profissionalismo. Isso é importante porque seu público-alvo é executivos B2B"
    `
    },
    {
        id: "mentoria_03",
        title: "Compreensão e Expressão do Seu Estilo",
        isFree: true,
        module: "Prospecção",
        content: `
### O que é Estilo de Arte em Design?

Seu estilo é a **forma singular como você se expressa visualmente**. É o que faz seus trabalhos serem reconhecidos e diferenciados no mercado.

### Os 20+ Estilos Principais em Design Gráfico (2025)

#### Estilos Minimalistas
- **Minimalismo Puro**: Menos é mais. Poucos elementos, muito espaço em branco.
- **Flat Design**: Sem profundidade, cores sólidas, formas geométricas simples.

#### Estilos Nostálgicos e Retrô
- **Vintage/Retrô**: Evoca décadas passadas (70s, 80s, 90s).
- **Vaporwave**: Estética Y2K, cores pastel, referências futuristas.

### Como Descobrir Seu Estilo Pessoal?

#### Passo 1: Análise de Preferências
- Observe os trabalhos que você mais gosta.
- Identifique padrões: cores que você usa frequentemente.

#### Passo 2: Experimente Conscientemente
- Escolha um estilo e faça 5-10 projetos (mesmo fictícios) naquele estilo.
- Crie um "projeto de assinatura" que seja totalmente você.

**Diferencial Competitivo:**
Um designer com estilo claro é **imediatamente reconhecível**. Clientes procuram por essa singularidade.
    `
    },
    // Módulo 2: Qualificação
    {
        id: "mentoria_04",
        title: "Descobrindo Seu Cliente Ideal",
        isFree: false,
        module: "Qualificação",
        content: `
### Por Que Conhecer o Cliente Ideal é Crucial?

Tentar vender para "todo mundo" é a forma mais cara e ineficiente de conseguir clientes. Designers bem-sucedidos **focam em clientes específicos**.

### O Que É ICP (Ideal Customer Profile)?

O **ICP é uma descrição detalhada do cliente perfeito** para seus serviços. Ele inclui:
- Características da empresa/negócio (tamanho, setor)
- Desafios e dores específicas
- Orçamento disponível

### Os 5 Passos para Definir Seu Cliente Ideal

#### Passo 1: Analise Seus Melhores Clientes Atuais
Se você tem clientes satisfeitos, eles são seu mapa do tesouro. Liste os 5 melhores e procure padrões.

#### Passo 2: Mapeie as Dores e Necessidades
Clientes não compram design — **compram solução para um problema**.
- Identifique dores comuns: Falta de identidade visual, presença fraca em redes sociais.

#### Passo 3: Crie Sua Persona
Dê um nome ao seu cliente ideal e "humanize-o".
Exemplo: **Marina Andrade**, dona de Clínica Odontológica, busca modernidade, tem budget de 8k.
    `
    },
    {
        id: "mentoria_05",
        title: "Qualificação de Leads (BANT)",
        isFree: false,
        module: "Qualificação",
        content: `
### O que É Qualificação de Leads?

É o processo de **avaliar cada contato para determinar se ele é realmente um bom prospecto**.

### Metodologia BANT

#### 1. BUDGET (Orçamento)
"Qual é seu orçamento disponível para este projeto?"
O cliente tem recursos financeiros? O orçamento é realista?

#### 2. AUTHORITY (Autoridade)
"Quem toma a decisão final para contratação?"
Você está falando com a pessoa certa?

#### 3. NEED (Necessidade)
"Qual é o principal problema que você quer resolver com design?"
O cliente realmente precisa do seu serviço? A dor é urgente?

#### 4. TIMELINE (Cronograma)
"Qual é o prazo para executar este projeto?"
É urgente ou indefinido?

**Matriz de Qualificação:**
Um lead é **bem qualificado** quando atende a pelo menos 3 dos 4 critérios fortemente.
    `
    },
    {
        id: "mentoria_06",
        title: "Qualificação de Leads (CHAMP)",
        isFree: false,
        module: "Qualificação",
        content: `
### O que É CHAMP?

Metodologia **focada nos desafios do cliente**. Muito usada em design.

#### C - CHALLENGES (Desafios)
Qual é o desafio/problema que o cliente enfrenta?
"Meu site não converte visitantes em clientes".

#### H - AUTHORITY (Autoridade)
Quem aprova a decisão?

#### A - ABILITY/APPROVAL (Capacidade)
Tem recursos para resolver? Podem investir agora?

#### M - MOTIVATION/METRICS (Motivação)
Qual é a urgência? Como medem sucesso?
"Se não resolver esse desafio, qual o impacto?"

**BANT vs CHAMP:**
Para designers, **CHAMP geralmente é mais efetivo** porque demonstra profundidade no entendimento do problema.
    `
    },
    // Módulo 3: Conversão
    {
        id: "mentoria_07",
        title: "Portfólio e Apresentação",
        isFree: false,
        module: "Conversão",
        content: `
### Por Que Portfólio É Sua Ferramenta de Venda Mais Poderosa

Seu portfólio é sua **credibilidade visual** e seu **argumento de venda mais forte**.

### Estrutura de Portfólio Eficaz

#### Elemento 1: Introdução Pessoal
Quem você é, seu nicho e o que faz diferente.

#### Elemento 2: Seleção de 10-15 Projetos Principais
Qualidade > Quantidade.

#### Elemento 3: Case Study Detalhado
Estrutura para cada projeto:
1. **Título Descritivo**
2. **Desafio** (O que precisava mudar)
3. **Solução** (Sua abordagem de design)
4. **Resultado** (Impacto no cliente)
5. **Imagens** (Mockups profissionais)

**Otimização Visual:**
✅ Use cores que refletem seu estilo
✅ Tipografia profissional
✅ Muito espaço em branco (breath)
    `
    },
    {
        id: "mentoria_08",
        title: "Nicho de Mercado",
        isFree: false,
        module: "Conversão",
        content: `
### Por Que Ter um Nicho É Crítico?

Designers generalistas competem por preço. Designers nichos competem por valor.

**Benefícios:**
- 💰 Cobra 30-50% mais.
- 🎯 Mais fácil de prospectar.
- 📚 Constrói expertise real.

### Os 3 Tipos de Nicho

#### Tipo 1: Nicho por Cliente
"Trabalho apenas com clínicas odontológicas". Conhece profundamente os problemas dessa indústria.

#### Tipo 2: Nicho por Tipo de Serviço
"Especialista em Rebranding". Expertise profunda em um tipo de projeto.

#### Tipo 3: Nicho por Estilo Visual
"Designer minimalista moderno". Identidade clara e reconhecível.

### Como Escolher Seu Nicho?
1. Analise seus projetos passados (quais gostou mais?).
2. Pesquise demanda no mercado.
3. Teste sem se comprometer (faça 5 projetos fictícios).
    `
    },
    {
        id: "mentoria_09",
        title: "Métricas e Validação",
        isFree: false,
        module: "Conversão",
        content: `
### Por Que Medir Seus Resultados?

O que não é medido não pode ser melhorado. Designers profissionais **rastreiam suas métricas** para escalar com consistência.

### Métricas Essenciais para Freelancers

#### 1. Taxa de Conversão
Quantos leads viram clientes? Fórmula: (Clientes / Leads) x 100

**Benchmarks:**
- Abaixo de 5%: Problema na qualificação ou na proposta
- 5-15%: Média de mercado
- Acima de 15%: Excelente, escale a operação

#### 2. Ticket Médio
Quanto você fatura por cliente em média?

**Como aumentar:**
- Venda pacotes em vez de serviços avulsos
- Adicione upsells (ex: manual da marca)
- Nicho em clientes maiores

#### 3. Tempo até Fechamento
Quantos dias do primeiro contato até o pagamento?

### Validação Mensal

Todo mês, responda:
- Quantos leads prospectei?
- Quantos clientes fechei?
- Qual foi meu faturamento?
- O que funcionou e o que preciso melhorar?

**Dica:** Use uma planilha simples ou o CRM da FreelanceFlow para rastrear.
    `
    }
];


// ==================== CURSOS DISPONÍVEIS ====================
const COURSES: Course[] = [
    {
        id: 'photoshop',
        name: 'Photoshop Essencial',
        icon: <img src="/photoshop.png" alt="Photoshop" className="w-5 h-5" />,
        description: '18 aulas • 6 módulos',
        color: 'from-blue-500 to-cyan-500',
        lessons: [
            // Módulo 1: Fundamentos
            { id: 'ps_01', title: 'Sua Primeira Arte no Photoshop', isFree: true, content: PHOTOSHOP_LESSON_1, module: 'Fundamentos' },
            { id: 'ps_02', title: 'Dominando Camadas', isFree: true, content: PHOTOSHOP_LESSON_2, module: 'Fundamentos' },
            { id: 'ps_03', title: 'Texto que Vende', isFree: true, content: PHOTOSHOP_LESSON_3, module: 'Fundamentos' },
            // Módulo 2: Seleções
            { id: 'ps_04', title: 'Seleções Inteligentes com IA', isFree: true, content: PHOTOSHOP_LESSON_4, module: 'Seleções' },
            { id: 'ps_05', title: 'Removendo Fundos', isFree: true, content: PHOTOSHOP_LESSON_5, module: 'Seleções' },
            { id: 'ps_06', title: 'Composição Profissional', isFree: true, content: PHOTOSHOP_LESSON_6, module: 'Seleções' },
            // Módulo 3: Cor
            { id: 'ps_07', title: 'Cores que Impactam', isFree: true, content: PHOTOSHOP_LESSON_7, module: 'Cor' },
            { id: 'ps_08', title: 'Iluminação Profissional', isFree: true, content: PHOTOSHOP_LESSON_8, module: 'Cor' },
            { id: 'ps_09', title: 'Correção de Cor Avançada', isFree: true, content: PHOTOSHOP_LESSON_9, module: 'Cor' },
            // Módulo 4: Avançado
            { id: 'ps_10', title: 'Retoque com Ferramentas de Recuperação', isFree: true, content: PHOTOSHOP_LESSON_10, module: 'Avançado' },
            { id: 'ps_11', title: 'Efeitos Não-Destrutivos', isFree: true, content: PHOTOSHOP_LESSON_11, module: 'Avançado' },
            { id: 'ps_12', title: 'Estilos de Camada Modernos', isFree: true, content: PHOTOSHOP_LESSON_12, module: 'Avançado' },
            // Módulo 5: IA
            { id: 'ps_13', title: 'Preenchimento Generativo', isFree: true, content: PHOTOSHOP_LESSON_13, module: 'IA' },
            { id: 'ps_14', title: 'Expandindo Imagens com IA', isFree: true, content: PHOTOSHOP_LESSON_14, module: 'IA' },
            { id: 'ps_15', title: 'Ferramenta Remover Avançada', isFree: true, content: PHOTOSHOP_LESSON_15, module: 'IA' },
            // Módulo 6: Exportação
            { id: 'ps_16', title: 'Exportando para Redes Sociais', isFree: true, content: PHOTOSHOP_LESSON_16, module: 'Exportação' },
            { id: 'ps_17', title: 'Assets para Clientes', isFree: true, content: PHOTOSHOP_LESSON_17, module: 'Exportação' },
            { id: 'ps_18', title: 'Arquivos para Impressão', isFree: true, content: PHOTOSHOP_LESSON_18, module: 'Exportação' },
        ]
    },
    {
        id: 'mentoria',
        name: 'Mentoria & Carreira',
        icon: <Briefcase size={20} />,
        description: '9 aulas • 3 módulos',
        color: 'from-purple-500 to-pink-500',
        lessons: MENTORIA_LESSONS
    }
];

// ==================== COMPONENTE PRINCIPAL ====================
const LearningHub: React.FC<LearningHubProps> = ({ user, onBack, onRequestUpgrade }) => {
    const [activeCourseId, setActiveCourseId] = useState<string>('photoshop');
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const activeCourse = COURSES.find(c => c.id === activeCourseId)!;
    const activeLesson = activeCourse?.lessons.find(l => l.id === activeLessonId);

    // Carregar progresso do Supabase
    useEffect(() => {
        const loadProgress = async () => {
            try {
                const { data } = await supabase
                    .from('learning_progress')
                    .select('completed_lessons')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (data?.completed_lessons) {
                    setCompletedLessons(data.completed_lessons);
                }
            } catch (e) {
                console.error('Erro ao carregar progresso:', e);
            }
        };
        loadProgress();
    }, [user.id]);

    // Scroll ao mudar lição - volta para o topo
    useEffect(() => {
        if (activeLessonId) {
            // Scroll do container principal
            if (contentRef.current) {
                contentRef.current.scrollTop = 0;
                contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // Scroll da janela também (mobile)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeLessonId]);

    // Salvar progresso no Supabase
    const saveProgress = async (newCompleted: string[]) => {
        try {
            await supabase.from('learning_progress').upsert({
                user_id: user.id,
                completed_lessons: newCompleted,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
        } catch (e) {
            console.error('Erro ao salvar progresso:', e);
        }
    };

    const handleMarkComplete = async () => {
        if (!activeLessonId || completedLessons.includes(activeLessonId)) return;

        const newCompleted = [...completedLessons, activeLessonId];
        setCompletedLessons(newCompleted);
        await saveProgress(newCompleted);

        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#06b6d4', '#d946ef']
        });

        // Avançar para próxima lição
        const currentIndex = activeCourse.lessons.findIndex(l => l.id === activeLessonId);
        const nextLesson = activeCourse.lessons[currentIndex + 1];
        if (nextLesson) {
            setTimeout(() => setActiveLessonId(nextLesson.id), 1000);
        }
    };

    // Parser de markdown com suporte a bold inline
    const parseContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            // Processar negrito inline **texto**
            const renderWithBold = (str: string) => {
                const parts = str.split(/(\*\*.*?\*\*)/g);
                return parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{part}</span>;
                });
            };

            // Função para limpar asteriscos de headers
            const cleanHeader = (str: string) => str.replace(/\*\*/g, '');

            if (line.trim().startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-cyber-secondary mt-6 mb-3">{cleanHeader(line.replace('### ', ''))}</h3>;
            if (line.trim().startsWith('#### ')) return <h4 key={i} className="text-lg font-bold text-cyber-primary mt-4 mb-2">{cleanHeader(line.replace('#### ', ''))}</h4>;
            if (line.trim().startsWith('- ')) return <li key={i} className="text-slate-300 ml-4 my-1">{renderWithBold(line.replace('- ', ''))}</li>;
            if (line.trim().startsWith('❌')) return <p key={i} className="text-red-400 my-2 bg-red-500/10 p-2 rounded text-sm">{renderWithBold(line)}</p>;
            if (line.trim().startsWith('✅')) return <p key={i} className="text-emerald-400 my-2 bg-emerald-500/10 p-2 rounded text-sm">{renderWithBold(line)}</p>;
            if (line.trim().startsWith('---')) return <hr key={i} className="border-slate-700 my-6" />;
            if (!line.trim()) return <br key={i} />;
            return <p key={i} className="text-slate-300 leading-relaxed mb-2">{renderWithBold(line)}</p>;
        });
    };

    const totalLessons = COURSES.reduce((acc, c) => acc + c.lessons.length, 0);
    const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);

    return (
        <div className="min-h-screen bg-cyber-dark flex flex-col">
            {/* Header */}
            <header className="border-b border-cyber-border bg-cyber-panel/80 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-secondary rounded-xl flex items-center justify-center">
                                <GraduationCap size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-black text-white text-lg uppercase tracking-wide">Academia</h1>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">FreelanceFlow Learning</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] text-cyber-primary font-bold uppercase tracking-widest">Progresso Geral</p>
                            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                                <div className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all" style={{ width: `${progressPercentage}%` }} />
                            </div>
                        </div>
                        {!user.isPremium && (
                            <button onClick={onRequestUpgrade} className="text-xs bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white px-4 py-2 rounded-lg font-bold hover:shadow-neon-pink transition-all">
                                <Crown size={14} className="inline mr-1" /> PRO
                            </button>
                        )}
                        {/* Mobile menu toggle */}
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-72 bg-cyber-panel border-r border-cyber-border
          transition-transform duration-300 pt-16 md:pt-0 overflow-y-auto
        `}>
                    <div className="p-4 space-y-6">
                        {/* Course Selector */}
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold px-2">Cursos Disponíveis</p>
                            {COURSES.map(course => (
                                <button
                                    key={course.id}
                                    onClick={() => { setActiveCourseId(course.id); setActiveLessonId(null); setSidebarOpen(false); }}
                                    className={`w-full p-3 rounded-xl border text-left transition-all ${activeCourseId === course.id
                                        ? 'bg-slate-800 border-cyber-primary'
                                        : 'bg-transparent border-transparent hover:bg-slate-800/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${course.color} text-white`}>
                                            {course.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{course.name}</p>
                                            <p className="text-[10px] text-slate-500">{course.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Lessons List - Grouped by Module */}
                        <div className="space-y-4">
                            {(() => {
                                // Get unique modules in order
                                const modules = activeCourse.lessons.reduce((acc: string[], lesson) => {
                                    if (lesson.module && !acc.includes(lesson.module)) {
                                        acc.push(lesson.module);
                                    }
                                    return acc;
                                }, []);

                                // If no modules, render flat list
                                if (modules.length === 0) {
                                    return (
                                        <>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold px-2 mb-2">Aulas</p>
                                            {activeCourse.lessons.map((lesson, idx) => {
                                                const isCompleted = completedLessons.includes(lesson.id);
                                                const isActive = activeLessonId === lesson.id;
                                                const isLocked = !user.isPremium && !lesson.isFree;
                                                const prevLesson = activeCourse.lessons[idx - 1];
                                                const isPrevCompleted = idx === 0 || completedLessons.includes(prevLesson?.id);
                                                const isSequenceLocked = idx > 0 && !isPrevCompleted;

                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        disabled={isLocked || isSequenceLocked}
                                                        onClick={() => { setActiveLessonId(lesson.id); setSidebarOpen(false); }}
                                                        className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${isActive ? 'bg-cyber-primary/20 border border-cyber-primary' :
                                                            isLocked || isSequenceLocked ? 'opacity-50 cursor-not-allowed' :
                                                                'hover:bg-slate-800'
                                                            }`}
                                                    >
                                                        {isLocked ? (
                                                            <Lock size={16} className="text-cyber-secondary shrink-0" />
                                                        ) : isSequenceLocked ? (
                                                            <Lock size={16} className="text-slate-600 shrink-0" />
                                                        ) : isCompleted ? (
                                                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                                        ) : (
                                                            <Circle size={16} className="text-slate-600 shrink-0" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-sm truncate ${isActive ? 'text-white font-bold' : 'text-slate-300'}`}>
                                                                {lesson.title}
                                                            </p>
                                                            {isLocked && (
                                                                <span className="text-[10px] text-cyber-secondary flex items-center gap-1">
                                                                    <Star size={8} fill="currentColor" /> PRO
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ChevronRight size={14} className="text-slate-600 shrink-0" />
                                                    </button>
                                                );
                                            })}
                                        </>
                                    );
                                }

                                // Group lessons by module
                                return modules.map((moduleName, moduleIdx) => {
                                    const moduleLessons = activeCourse.lessons.filter(l => l.module === moduleName);
                                    const moduleCompletedCount = moduleLessons.filter(l => completedLessons.includes(l.id)).length;

                                    return (
                                        <div key={moduleName} className="space-y-1">
                                            <div className="flex items-center justify-between px-2 py-2">
                                                <p className="text-[10px] text-cyber-primary uppercase tracking-widest font-bold">
                                                    Módulo {moduleIdx + 1}: {moduleName}
                                                </p>
                                                <span className="text-[9px] text-slate-500">
                                                    {moduleCompletedCount}/{moduleLessons.length}
                                                </span>
                                            </div>
                                            {moduleLessons.map((lesson) => {
                                                const globalIdx = activeCourse.lessons.findIndex(l => l.id === lesson.id);
                                                const isCompleted = completedLessons.includes(lesson.id);
                                                const isActive = activeLessonId === lesson.id;
                                                const isLocked = !user.isPremium && !lesson.isFree;
                                                const prevLesson = activeCourse.lessons[globalIdx - 1];
                                                const isPrevCompleted = globalIdx === 0 || completedLessons.includes(prevLesson?.id);
                                                const isSequenceLocked = globalIdx > 0 && !isPrevCompleted;

                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        disabled={isLocked || isSequenceLocked}
                                                        onClick={() => { setActiveLessonId(lesson.id); setSidebarOpen(false); }}
                                                        className={`w-full p-2.5 rounded-lg text-left transition-all flex items-center gap-3 ${isActive ? 'bg-cyber-primary/20 border border-cyber-primary' :
                                                            isLocked || isSequenceLocked ? 'opacity-50 cursor-not-allowed' :
                                                                'hover:bg-slate-800'
                                                            }`}
                                                    >
                                                        {isLocked ? (
                                                            <Lock size={14} className="text-cyber-secondary shrink-0" />
                                                        ) : isSequenceLocked ? (
                                                            <Lock size={14} className="text-slate-600 shrink-0" />
                                                        ) : isCompleted ? (
                                                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                                        ) : (
                                                            <Circle size={14} className="text-slate-600 shrink-0" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-xs truncate ${isActive ? 'text-white font-bold' : 'text-slate-300'}`}>
                                                                {lesson.title}
                                                            </p>
                                                            {isLocked && (
                                                                <span className="text-[9px] text-cyber-secondary flex items-center gap-1">
                                                                    <Star size={7} fill="currentColor" /> PRO
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ChevronRight size={12} className="text-slate-600 shrink-0" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main ref={contentRef} className="flex-1 overflow-y-auto p-4 md:p-8">
                    {activeLesson ? (
                        <div className="max-w-3xl mx-auto animate-fade-in">
                            {/* Lesson Header */}
                            <div className="mb-8 pb-6 border-b border-slate-700">
                                <div className="flex items-center gap-2 text-[10px] text-cyber-primary uppercase tracking-widest font-bold mb-2">
                                    <BookOpen size={12} /> {activeCourse.name}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black text-white">{activeLesson.title}</h1>
                            </div>

                            {/* Check if locked for free users */}
                            {!user.isPremium && !activeLesson.isFree ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 bg-cyber-secondary/10 rounded-full flex items-center justify-center mb-6 border border-cyber-secondary">
                                        <Lock size={40} className="text-cyber-secondary" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white mb-2">Conteúdo PRO</h2>
                                    <p className="text-slate-400 max-w-md mb-6">
                                        Esta aula faz parte do conteúdo exclusivo. Faça upgrade para desbloquear todas as aulas.
                                    </p>
                                    <button onClick={onRequestUpgrade} className="bg-gradient-to-r from-cyber-secondary to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-neon-pink transition-all">
                                        DESBLOQUEAR AGORA
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Lesson Content */}
                                    <div className="prose prose-invert max-w-none">
                                        {parseContent(activeLesson.content)}
                                    </div>

                                    {/* Mark Complete Button */}
                                    <div className="mt-12 pt-8 border-t border-slate-700">
                                        <button
                                            onClick={handleMarkComplete}
                                            disabled={completedLessons.includes(activeLesson.id)}
                                            className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${completedLessons.includes(activeLesson.id)
                                                ? 'bg-slate-800 text-slate-500 cursor-default'
                                                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                                                }`}
                                        >
                                            {completedLessons.includes(activeLesson.id) ? (
                                                <><CheckCircle2 size={24} /> AULA CONCLUÍDA</>
                                            ) : (
                                                <><CheckCircle2 size={24} /> MARCAR COMO CONCLUÍDA</>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        // Welcome Screen
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className={`w-24 h-24 bg-gradient-to-br ${activeCourse.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                {activeCourse.id === 'photoshop' ? (
                                    <img src="/photoshop.png" alt="Photoshop" className="w-16 h-16 object-contain" />
                                ) : (
                                    activeCourse.icon && React.cloneElement(activeCourse.icon as React.ReactElement, { size: 48, className: 'text-white' })
                                )}
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2">{activeCourse.name}</h2>
                            <p className="text-slate-400 max-w-md mb-8">{activeCourse.description}</p>
                            <button
                                onClick={() => setActiveLessonId(activeCourse.lessons[0].id)}
                                className="bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold py-3 px-8 rounded-xl hover:shadow-neon-cyan transition-all flex items-center gap-2"
                            >
                                COMEÇAR AGORA <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default LearningHub;
