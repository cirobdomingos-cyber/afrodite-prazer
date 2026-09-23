# Sequência de e-mails: "Pompoar, prazer."

Este é o funil completo. A leitora deixa o e-mail em `/guia` e, a partir daí:

1. recebe na hora o e-mail de **boas-vindas** com o link pessoal do guia (o próprio site envia);
2. recebe **7 e-mails** que acompanham o guia da iniciante e o treino de 7 dias (encontrar o músculo, respirar, dia 1, o que é normal sentir, dia 5 sentada, autoavaliação do dia 7, e depois da primeira semana);
3. recebe um **e-mail final** com a curadoria.

Os textos abaixo são os mesmos dos modelos 1 a 8 no Brevo (atualizados em 23/09/2026).

Os e-mails 1 a 8 são enviados por uma **automação do Brevo** (veja "Como ativar" no fim).

**Variáveis do Brevo usadas nos textos:**
- `{{ contact.FIRSTNAME }}`: primeiro nome da leitora.
- `{{ contact.EBOOK_URL }}`: link pessoal de leitura, que o site grava no cadastro.

**Links de produto:** todos usam o código de afiliada, no formato
`https://asosloja.com.br/products/<produto>?utm_source=Affiliates&utm_campaign=AffWLD_6Y`.

**Regras de tom e de saúde:**
- Educativo, com humor leve. Nunca vulgar, nunca clínico.
- Pompoar é sobre ela, nunca sobre "agradar alguém".
- Sem promessa de cura. Escape de urina, dor, gestação e pós-parto sempre levam à fisioterapeuta pélvica.
- Assuntos discretos: nada que constranja numa notificação do celular.
- **Os textos passam pela mesma revisão da fisioterapeuta que o ebook** (veja `docs/revisao-fisioterapeuta.md`).

---

## 0. Boas-vindas (imediato, enviado pelo site)

- **Assunto:** Seu guia da Afrodite chegou
- **Texto:** já está no código (`src/lib/brevo.ts`). Traz o link pessoal e o botão "Começar a ler".

---

## 1. Encontrar o músculo (1 dia depois)

- **Assunto:** Onde fica, afinal?
- **Pré-cabeçalho:** Quatro jeitos de encontrar o músculo, sem constrangimento.

> Oi, {{ contact.FIRSTNAME }}.
>
> Antes de qualquer exercício, o primeiro desafio do pompoar é bem simples: **saber onde está o músculo**. Não é força, é percepção.
>
> No guia, as páginas 3 a 5 mostram o assoalho pélvico e quatro jeitos de encontrá-lo: a pista do xixi (uma vez só, como teste), o espelho, o dedo como guia e uma técnica sem penetração, sentada sobre a mão.
>
> Uma dica: barriga, bumbum e coxas ficam soltos. Se sentir que está empurrando pra baixo, é o movimento contrário.
>
> **[Encontrar o músculo →]({{ contact.EBOOK_URL }})**

---

## 2. Respirar (2 dias depois)

- **Assunto:** Primeiro, respire
- **Pré-cabeçalho:** O erro mais comum de quem começa, e como evitar.

> {{ contact.FIRSTNAME }}, quase todo mundo que começa comete o mesmo erro: **prender o ar** na hora de contrair.
>
> O jeito mais fácil de acertar: inspire soltando a barriga e a pelve; expire fechando e puxando o músculo pra dentro. Um minuto disso, deitada, já é o aquecimento de todos os treinos.
>
> Aproveite pra dar uma olhada na página 9, “Eu posso treinar?”. Grávida, pós-parto, infecção ou dor pedem uma conversa antes.
>
> Amanhã começa o seu treino de 7 dias.
>
> **[Ler sobre a respiração →]({{ contact.EBOOK_URL }})**

---

## 3. Treino dia 1 (3 dias depois)

- **Assunto:** Hoje é o dia 1
- **Pré-cabeçalho:** Quatro minutos, deitada. Ninguém percebe.

> {{ contact.FIRSTNAME }}, hoje começa o seu primeiro treino. Deitada, joelhos dobrados, bexiga vazia:
>
> **Força · 3 × 5**
> Contraia com firmeza por 2 segundos e solte por completo por 4. Faça 5, descanse 45 segundos, repita mais duas vezes.
>
> **Pulsação · 3 × 5**
> Cinco contrações rápidas, como uma piscada. Descanse 10 segundos e repita mais duas vezes.
>
> Termine com três respirações longas, soltando tudo. Depois, marque o dia 1 no diário da página 14.
>
> **[Ver o treino completo →]({{ contact.EBOOK_URL }})**

---

## 4. O que é normal (5 dias depois)

- **Assunto:** Cansou? Faz parte.
- **Pré-cabeçalho:** O que é normal sentir na primeira semana.

> {{ contact.FIRSTNAME }}, você deve estar no dia 3 do treino. Então vale combinar o que é normal sentir:
>
> Um **leve desconforto muscular**, como perna na primeira semana de academia. O bumbum contraindo junto. Cansar antes do fim. Às vezes, até um pouco de excitação. Tudo isso faz parte.
>
> O que não faz parte: **dor**. Se doer, pare e procure uma fisioterapeuta pélvica. E corrimento com cheiro, coceira ou ardência não vêm do treino: vale uma visita à ginecologista.
>
> Pulou um dia? Retome no seguinte, sem compensar.
>
> **[Ler a página 10 →]({{ contact.EBOOK_URL }})**

---

## 5. Sentada (7 dias depois)

- **Assunto:** Hoje você senta
- **Pré-cabeçalho:** Dia 5: o mesmo treino, agora contra a gravidade.

> {{ contact.FIRSTNAME }}, chegou o dia 5, e com ele uma novidade: o treino passa a ser **sentada**, com a coluna apoiada e os pés no chão.
>
> Deitada, a gravidade não pesa sobre o assoalho pélvico. Sentada, ele trabalha contra ela. Por isso o treino de hoje é o mesmo do dia 4 (força 4 × 10 e pulsação 4 × 10), só que em outra posição.
>
> Ficou difícil? Termine deitada. Não é atraso, é base.
>
> **[Ver os dias 5 a 7 →]({{ contact.EBOOK_URL }})**

---

## 6. Autoavaliação (9 dias depois)

- **Assunto:** Sete dias. Como foi?
- **Pré-cabeçalho:** Quatro perguntas pra fechar a sua primeira semana.

> {{ contact.FIRSTNAME }}, se tudo correu bem, hoje é o dia 7. Antes de seguir, responda com sinceridade:
>
> 1. Encontro o músculo sem precisar pensar muito?
> 2. Consigo soltar por completo depois de contrair?
> 3. Treino respirando, sem prender o ar?
> 4. Barriga, bumbum e coxas ficam soltos?
>
> Algum “ainda não”? Repita a semana antes de avançar. Quatro “sim”? Você fez uma coisa que muita gente nunca faz: apresentou-se a uma parte do próprio corpo.
>
> A autoavaliação e o diário estão nas páginas 13 e 14.
>
> **[Abrir a autoavaliação →]({{ contact.EBOOK_URL }})**

---

## 7. Depois da primeira semana (11 dias depois)

- **Assunto:** E depois dos 7 dias?
- **Pré-cabeçalho:** Manter o hábito, ganhar resistência e, se quiser, acessórios.

> {{ contact.FIRSTNAME }}, a primeira semana é a base. Daqui pra frente, três caminhos:
>
> **Manter o hábito.** Siga com o treino do dia 7, alternando sentada e, quando ficar natural, em pé. Amarre a um hábito que você já tem: o café, o banho, a escova de dentes.
>
> **Ganhar resistência.** O próximo movimento é o “segura”: contrair e sustentar por alguns segundos.
>
> **Acessórios, se quiser.** Eles dão retorno ao músculo e ajudam a progredir. Comece pelo mais leve e siga o manual:
> · **Cone para Pompoarismo 20 g, da Feminist**: [ver na loja](https://asosloja.com.br/products/cone-para-pompoarismo-feminist-rosa-20-g-outlet?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
> · **Kit Pompoar, da Feminist**: [ver na loja](https://asosloja.com.br/products/kit-pompoar-para-exercicios-de-pompoarismo-feminist?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Rever o guia →]({{ contact.EBOOK_URL }})**

---

## 8. Curadoria (15 dias depois)

- **Assunto:** Pra cada momento, um cuidado
- **Pré-cabeçalho:** A curadoria da Afrodite, e uma última dica.

> {{ contact.FIRSTNAME }}, faz duas semanas que você começou. Seja qual for o seu ritmo, já conhece o seu corpo um pouco melhor do que antes, e isso é o começo de cuidar.
>
> Uma última dica: uma consulta com uma **fisioterapeuta pélvica** avalia a sua força e monta um treino só seu. Vale especialmente se houver escape de urina, dor ou sensação de peso.
>
> E, pra cada momento, a curadoria da Afrodite: do cuidado diário ao que desperta vontade, com produtos escolhidos com critério.
>
> Se quiser contar como foi a sua primeira semana, responda este e-mail. A gente lê todos.
>
> **[Ver a curadoria →](https://afroditeprazer.com.br/)**

---

## Como ativar no Brevo

1. **Conta e remetente:** crie a conta no brevo.com e valide o remetente `contato@afroditeprazer.com.br`. Para isso o domínio precisa estar no ar (DNS configurado) e autenticado no Brevo (SPF/DKIM).
2. **Lista:** em Contatos → Listas, crie "Guia pompoar" e anote o número da lista.
3. **Atributos:** em Contatos → Configurações → Atributos, crie `SOURCE` e `EBOOK_URL`, os dois do tipo **Texto**.
4. **Chave de API:** em SMTP & API → Chaves de API, gere uma chave. Deixe **desligado** o bloqueio de IPs não autorizados, porque o Railway não tem IP fixo.
5. **Railway:** no serviço `afrodite-prazer`, em Variables, preencha:
   - `BREVO_API_KEY`: a chave do passo 4
   - `BREVO_LIST_ID`: o número da lista do passo 2
   - `SITE_URL`: `https://afroditeprazer.com.br`, depois que o domínio estiver no ar
6. **Automação:** em Automações → "Contato adicionado à lista" (Guia pompoar), monte os e-mails 1 a 8 acima (modelos "Pompoar 1" a "Pompoar 8" no Brevo) com os intervalos indicados: 1, 2, 3, 5, 7, 9, 11 e 15 dias depois do cadastro.
7. **Aviso no ebook:** só depois que a automação estiver ativa, crie no Railway a variável `EMAIL_SEQUENCE_ACTIVE=1`. Ela faz o final do ebook anunciar os e-mails ("Fica de olho no seu e-mail").

**Enquanto o Brevo não estiver configurado:** o site continua funcionando. A leitora recebe o link na tela, e cada cadastro fica registrado nos logs do Railway. Para achar, busque por `[lead]` em Deployments → View logs.
