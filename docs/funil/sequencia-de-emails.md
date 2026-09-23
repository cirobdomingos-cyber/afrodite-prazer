# Sequência de e-mails: "As 7 etapas"

Este é o funil completo. A leitora deixa o e-mail em `/guia` e, a partir daí:

1. recebe na hora o e-mail de **boas-vindas** com o link pessoal do guia (o próprio site envia);
2. recebe **7 e-mails**, um por etapa, que devolvem a leitora ao guia e sugerem um produto da curadoria;
3. recebe um **e-mail final** com a curadoria completa.

Os e-mails 1 a 8 são enviados por uma **automação do Brevo** (veja "Como ativar" no fim).

**Variáveis do Brevo usadas nos textos:**
- `{{ contact.FIRSTNAME }}`: primeiro nome da leitora.
- `{{ contact.EBOOK_URL }}`: link pessoal de leitura, que o site grava no cadastro.

**Links de produto:** todos usam o código de afiliada, no formato
`https://asosloja.com.br/products/<produto>?utm_source=Affiliates&utm_campaign=AffWLD_6Y`.

**Tom:** educativo, com humor leve. Nunca vulgar, nunca clínico. Não descrevemos efeitos nem ingredientes que a marca não confirmou: o produto aparece como sugestão, e os detalhes ficam na loja.

---

## 0. Boas-vindas (imediato, enviado pelo site)

- **Assunto:** Seu guia chegou — As 7 etapas do autoconhecimento íntimo
- **Texto:** já está no código (`src/lib/brevo.ts`). Traz o link pessoal e o botão "Começar a ler".

---

## 1. Etapa 01 · Silêncio (1 dia depois)

- **Assunto:** Vinte minutos. Sem celular. (Sim, é possível.)
- **Pré-cabeçalho:** A primeira etapa é a mais simples — e a que mais gente pula.

> Oi, {{ contact.FIRSTNAME }}.
>
> A primeira etapa do guia não pede nada além de 20 minutos e um papel. Sem celular — e a gente sabe que essa é a parte difícil.
>
> A pergunta é só uma: **o que você gosta que ninguém ao seu redor sabe?**
>
> Não precisa fazer nada com a resposta ainda. Só perceber.
>
> **[Ler a Etapa 01 →]({{ contact.EBOOK_URL }})**
>
> Com cuidado,
> Afrodite

*Sem produto. A primeira conversa é só sobre ela.*

---

## 2. Etapa 02 · Corpo (3 dias depois)

- **Assunto:** Um espelho, luz boa e nenhuma pressa
- **Pré-cabeçalho:** Conhecer o próprio corpo não é vaidade. É alfabetização.

> {{ contact.FIRSTNAME }}, a etapa 2 é sobre olhar o próprio corpo como ele é — não como deveria ser.
>
> Tem três exercícios: o espelho, o mapa e a vulva. Nenhum tem nota. Todos têm efeito.
>
> Algumas mulheres transformam esse reencontro num pequeno ritual: luz baixa, um óleo, tempo sem pressa. Se quiser companhia pra isso, a gente escolheu uma:
>
> **Óleo para Massagem Sensual Olove**: [ver na loja](https://asosloja.com.br/products/oleo-para-massagem-sensual-olove-massage-120ml?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Ler a Etapa 02 →]({{ contact.EBOOK_URL }})**

---

## 3. Etapa 03 · Desejo (5 dias depois)

- **Assunto:** 20 coisas que te dão prazer (e não vale "dormir 8 horas")
- **Pré-cabeçalho:** Tá, vale. Mas tenta achar as outras 19.

> {{ contact.FIRSTNAME }}, aqui começa o movimento do **desejo**: reconhecer uma vontade como legítima, sem culpa.
>
> O exercício é uma lista de 20 coisas que te dão prazer — não as que deveriam dar. Banho quente, música alta no carro, café no domingo. Depois, circule as que você não faz há mais de um mês.
>
> Esse é o tamanho da sua saudade de você.
>
> Pra entrar na lista essa semana: **Vela Hidratante Beijável Candle, da Olove**. [Ver na loja](https://asosloja.com.br/products/vela-hidratante-beijavel-olove-candle-morango-70-g?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Ler a Etapa 03 →]({{ contact.EBOOK_URL }})**

---

## 4. Etapa 04 · Sentir (7 dias depois)

- **Assunto:** Sem expectativa de orgasmo. É sério.
- **Pré-cabeçalho:** Se vier, ótimo. Se não vier, melhor ainda.

> {{ contact.FIRSTNAME }}, a etapa 4 é onde a maioria dos guias começa — e por isso ela está no meio deste.
>
> A proposta: 30 a 40 minutos só seus, sem meta. Você não está buscando um resultado, está conhecendo a sua resposta. O que esquenta rápido, o que pede tempo, que toque funciona.
>
> Pra essa etapa, duas companhias escolhidas com cuidado:
> - **Cápsula Vibratória Vibrito, da Olove**: [ver na loja](https://asosloja.com.br/products/capsula-vibratoria-recarregavel-olove-vibrito-rosa?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
> - **Gel Lubrificante e Hidratante Pélvico, da Dermosex**: [ver na loja](https://asosloja.com.br/products/gel-lubrificante-e-hidratante-pelvico-dermosex-220-ml?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Ler a Etapa 04 →]({{ contact.EBOOK_URL }})**

---

## 5. Etapa 05 · Falar (9 dias depois)

- **Assunto:** "Mais devagar." Duas palavras. Treina comigo?
- **Pré-cabeçalho:** A gente aprende a fingir antes de aprender a pedir.

> {{ contact.FIRSTNAME }}, começa aqui o movimento da **independência**.
>
> Tem mulher que apresenta um projeto inteiro pra diretoria e trava na hora de dizer "ali não". Não é falta de coragem. É falta de prática — e ninguém ensina.
>
> O exercício da etapa 5: escrever 10 frases curtas e ler em voz alta até pararem de soar estranhas. Depois, usar uma. Só uma.
>
> **[Ler a Etapa 05 →]({{ contact.EBOOK_URL }})**

*Sem produto. Etapa de conversa.*

---

## 6. Etapa 06 · Mudar (11 dias depois)

- **Assunto:** O que você já sabe e vem adiando?
- **Pré-cabeçalho:** Informação cobra preço: você não consegue mais fingir que não sabe.

> {{ contact.FIRSTNAME }}, a essa altura você já sabe bastante sobre você. A etapa 6 pede o passo seguinte: nomear o que não funciona.
>
> Não precisa agir ainda. Precisa ver.
>
> Se uma das conversas adiadas for com a sua médica, o bônus "Corpo em transição" do guia pode ajudar a começar.
>
> **[Ler a Etapa 06 →]({{ contact.EBOOK_URL }})**

---

## 7. Etapa 07 · Viver (13 dias depois)

- **Assunto:** Uma pergunta pra toda semana
- **Pré-cabeçalho:** Autoconhecimento não é destino. É forma de andar.

> {{ contact.FIRSTNAME }}, a última etapa não termina nunca — e essa é a boa notícia.
>
> Toda semana, uma pergunta: **"o que eu aprendi sobre mim essa semana?"** E uma pequena decisão baseada na resposta.
>
> No fim do guia tem um checklist e 21 perguntas pra revisitar quando precisar de direção. Vale salvar.
>
> **[Ler a Etapa 07 →]({{ contact.EBOOK_URL }})**

---

## 8. Curadoria (15 dias depois)

- **Assunto:** Pra cada movimento, um cuidado
- **Pré-cabeçalho:** A curadoria que acompanha o guia, organizada do jeito que você chegou até aqui.

> {{ contact.FIRSTNAME }}, você passou pelas 7 etapas — no seu ritmo, do seu jeito.
>
> A curadoria da Afrodite segue o mesmo caminho do guia:
> - **Cuidar de mim**: a rotina de cuidado diário.
> - **Conforto e sentidos**: texturas, aromas e sensações.
> - **Explorar**: pra experimentar o que desperta vontade.
> - **Premium**: pra quem já sabe o que quer.
>
> **[Ver a curadoria →](https://afroditeprazer.com.br/)**
>
> Cada produto foi escolhido com critério, e a compra acontece direto na loja parceira. Se quiser contar qual etapa mexeu com você, responde este e-mail — a gente lê todos.

---

## Como ativar no Brevo

1. **Conta e remetente:** crie a conta no brevo.com e valide o remetente `contato@afroditeprazer.com.br`. Para isso o domínio precisa estar no ar (DNS configurado) e autenticado no Brevo (SPF/DKIM).
2. **Lista:** em Contatos → Listas, crie "Guia 7 etapas" e anote o número da lista.
3. **Atributos:** em Contatos → Configurações → Atributos, crie `SOURCE` e `EBOOK_URL`, os dois do tipo **Texto**.
4. **Chave de API:** em SMTP & API → Chaves de API, gere uma chave.
5. **Railway:** no serviço `afrodite-prazer`, em Variables, preencha:
   - `BREVO_API_KEY`: a chave do passo 4
   - `BREVO_LIST_ID`: o número da lista do passo 2
   - `SITE_URL`: `https://afroditeprazer.com.br`, depois que o domínio estiver no ar
6. **Automação:** em Automações → "Contato adicionado à lista" (Guia 7 etapas), monte os e-mails 1 a 8 acima com os intervalos indicados.
7. **Aviso no ebook:** só depois que a automação estiver ativa, crie no Railway a variável `EMAIL_SEQUENCE_ACTIVE=1`. Ela faz o final do ebook anunciar os e-mails ("Fica de olho no seu e-mail").

**Enquanto o Brevo não estiver configurado:** o site continua funcionando. A leitora recebe o link na tela, e cada cadastro fica registrado nos logs do Railway. Para achar, busque por `[lead]` em Deployments → View logs.
