# Escopo de Ajustes – Área de Membros Vireon

> Contexto técnico: a área de membros (`/start/*`) é composta por módulos descompilados em `src/vireon/m/module-*.jsx`, com rotas em `src/routes/` (TanStack Router, `src/routeTree.gen.ts`). Textos são trilíngues (EN/PT/ES) no dicionário `src/vireon/m/module-3677.jsx` e nos dados de conteúdo `src/vireon/m/module-4230.jsx` / `module-5751.jsx`. Os dados do usuário ficam no navegador (localStorage), sem backend.

---

## 1. Revisão de tradução de todas as páginas

- Dicionário `module-3677.jsx`: 636 chaves em EN, PT e ES (paridade completa). Revisar qualidade/consistência de PT e ES.
- Corrigir lacunas identificadas:
  - Conteúdo dos dias dos programas (`introduction`, `article`, `activityTitle`, `activityBody`, `tasks`) existe apenas em EN — `module-5751.jsx`.
  - Textos fixos fora do dicionário (ex.: "Email", "Password", "Demo:" em `module-6603.jsx`).
- Todo conteúdo novo criado neste escopo (itens 6, 9, 11–13) deve ser entregue em EN/PT/ES.

**Arquivos:** `module-3677.jsx`, `module-5751.jsx`, `module-6603.jsx` e demais telas `/start/*`.

## 2. Inibir acesso de administrador na tela de autenticação

- Remover o link "Administrator access" da tela de login — `module-4633.jsx`.
- Remover o link "Abrir ferramentas de administrador" do perfil — `module-2714.jsx`.
- **Decisão:** apenas esconder. As rotas `/admin/*` permanecem no código, mas sem nenhum ponto de acesso pela interface.
- Remover a exibição das credenciais "Demo" na tela `/admin/login` — `module-6603.jsx`.

## 3. Remover mensagens de teste / conta de exemplo

- Banner "Sample account. The progress on this profile is demonstration data stored in the local database." (`demo.notice`), exibido em todas as telas de membro pelo componente `wc` — `module-773.jsx`.
- Mensagens equivalentes em Notificações (`notifications.welcomeText`, `notifications.sample`) — `module-1701.jsx` / `module-3677.jsx`.

## 4. Remover percentual de progresso e dias completados

- Home (`module-761.jsx`): rótulo "Current program", "Day X of Y" e indicador de progresso.
- Programs (`module-5206.jsx`): "{done} of {total} days complete · {percent}%".
- Detalhe do programa (`module-8441.jsx`): mensagem de percentual concluído (`programs.percentDone`).

## 5. Remover travas dos programas diários

- Eliminar a lógica de bloqueio sequencial e o rótulo "Locked" — `module-8441.jsx`.
- Todos os dias de ambos os programas ficam clicáveis e abertos.

## 6. Tela de orientação para cada dia de programa

- Hoje os cards apontam para `/start/programs/{slug}/days/{n}`, rota **inexistente** (resulta em página não encontrada).
- Criar a rota `src/routes/start/programs/$slug/days/$day.tsx` e o componente da tela do dia (título, introdução, orientações, atividade, tarefas).
- Redigir conteúdo completo, baseado no título de cada dia, para **37 dias**:
  - 7-Day Starter (7 dias)
  - 30-Day Wellness Journey (30 dias)
- Conteúdo em EN/PT/ES, substituindo o texto genérico atual ("Day N looks at…").

**Arquivos:** `module-5751.jsx` (dados), novo módulo de tela, `routeTree.gen.ts`.

## 7. Home – remover bloco "Today's focus"

- `module-761.jsx` (`home.focus.*`).

## 8. Home – remover bloco "Recent activity"

- `module-761.jsx` (`home.recent.*`).

## 9. Tonic – tela para cada sublink

- A tela `/start/trick/tonic` (`module-7826.jsx`) lista 5 tônicos (`Tk` em `module-4230.jsx`) sem link.
- Criar rota `src/routes/start/trick/tonic/$id.tsx` e tela de detalhe com orientações (ingredientes, preparo, momento de uso, cuidados).
- Transformar cada card em link para seu detalhe.
- Redigir conteúdo completo para os 5 tônicos em EN/PT/ES.

## 10. Trick – página intermediária e renomeação de "doctor"

- Item **Trick** do menu lateral (`module-773.jsx`) passa a abrir a página intermediária (conteúdo atual de `/start/trick/doctor`, `module-5220.jsx`).
- Renomear a rota `doctor` para `trick`: a página intermediária passa a responder em `/start/trick`.
- A página "Protocol" (hoje em `/start/trick`, `module-8800.jsx`) é movida para `/start/trick/protocol`.
- Na página intermediária, **esconder somente nela** a barra de navegação (Protocol · Kegel · Lessons · Secrets · Recipes · Tonic) — `module-7244.jsx`.
- Na barra de navegação: atualizar o link de Protocol e remover a aba "doctor".
- Atualizar todos os links internos que apontam para `/start/trick` ou `/start/trick/doctor` (incluindo os cards da página intermediária).

**Arquivos:** `module-773.jsx`, `module-5220.jsx`, `module-7244.jsx`, `module-8800.jsx`, `src/routes/start/trick/*`, `routeTree.gen.ts`.

## 11. Descobrir → Biblioteca de exercícios

- Substituir a imagem genérica (`plank.jpg`) por uma imagem adequada a cada exercício — mapa de imagens em `module-5249.jsx`, arquivos em `public/media`.
- Garantir que o clique abra a página de detalhe (`/start/discover/exercises/{slug}`, `module-4969.jsx`).
- Redigir detalhamento completo de cada exercício (execução passo a passo, frequência, cuidados) em EN/PT/ES.

## 12. Descobrir → Sono e recuperação

- Mesmo tratamento do item 11 (imagem hoje genérica: `glow.jpg`), rota `/start/discover/sleep/{slug}`.

## 13. Descobrir → Estresse e mentalidade

- Mesmo tratamento do item 11 (imagem hoje genérica: `glow.jpg`), rota `/start/discover/stress/{slug}`.

## 14. Perfil – remover subitens

Em `module-2714.jsx`, remover:

- Configurações da conta
- Artigos e receitas salvos
- Programas concluídos
- Notificações
- Excluir minha conta
- Abrir ferramentas de administrador

Permanecem: Ajuda, Aviso legal, Termos e Privacidade.

## 15. Trick → Secrets – vídeos do YouTube

- Substituir o player `<video>` (`module-6653.jsx`) por embed do YouTube (iframe) para as aulas com link informado; aulas sem link continuam com o vídeo atual (player nativo).
- Links (dados em `e$`, `module-4230.jsx`):

**Module 1 · Anatomy**

| # | Aula | Link |
|---|------|------|
| 1 | Where is the G-spot? | https://www.youtube.com/shorts/2X2NbuedjP0 |
| 2 | Zones of intense pleasure | https://www.youtube.com/watch?v=MPi8pDgFT34 |
| 3 | How to find the G-spot, the A-spot, and the cervix | https://www.youtube.com/watch?v=kQmsL1X62t4 |
| 4 | How to stimulate the G-spot with a toy | https://www.youtube.com/watch?v=n9K3haOQMGs |

**Module 2 · Squirting**

| # | Aula | Link |
|---|------|------|
| 1 | Squirting tutorial | https://www.youtube.com/watch?v=A8jrezSl9ug |
| 2 | Jet demonstration, part 2 | https://www.youtube.com/watch?v=A8jrezSl9ug |
| 3 | Explicit lesson with a partner | https://www.youtube.com/watch?v=NnLOHuEGdrg |
| 4 | Practical squirting 1 | https://www.youtube.com/watch?v=h37fJPhxaQI |
| 5 | Practical squirting 2 | https://www.youtube.com/watch?v=h37fJPhxaQI |
| 6 | How to help her ejaculate more easily | https://www.youtube.com/watch?v=qLkV0gyn7qU |
| 7 | Step-by-step female ejaculation | https://www.youtube.com/watch?v=U6LOtxdb1NU |
| 8 | Extra tips for female ejaculation | https://www.youtube.com/watch?v=OjEScnzGibk |

**Modules 3 (Penetration), 4 (Kiss touch) e 5 (Situations):** mantêm os vídeos atuais.

---

## Decisões registradas

| # | Pendência | Decisão |
|---|-----------|---------|
| 1 | Aulas sem link de YouTube (módulos 3, 4 e 5) | Manter os vídeos atuais |
| 2 | Links repetidos no módulo 2 (aulas 1/2 e 4/5) | Manter os links repetidos |
| 3 | Vídeos com restrição de idade não tocam incorporados | Ciente; validar cada link no teste final |
| 4 | Conteúdo novo (37 dias, 5 tônicos, itens do Descobrir) | Texto definido pelo desenvolvimento, completo e baseado no assunto, inserido em EN/PT/ES |
| 5 | Painel administrativo | Apenas esconder (sem remover rotas) |
| 6 | Risco de quebra por mudança de rotas | Testar a navegação ponta a ponta ao final; qualquer quebra deve ser corrigida antes da entrega |

## Critérios de aceite / validação final

- Navegação completa testada: menu lateral, Home, Trick (intermediária e todas as abas), Programs (todos os dias), Discover (todas as categorias e detalhes), Tonic (todos os detalhes), Secrets (todas as aulas), Perfil.
- Nenhum link interno levando a página não encontrada.
- Troca de idioma EN/PT/ES verificada em todas as telas alteradas.
- Nenhuma mensagem de conta de exemplo/demonstração visível ao usuário.
- Nenhum ponto de acesso ao admin visível na interface.
- `npm run build` e `npm test` executando sem erros.
