# Sequência de e-mails: "Pompoar, prazer."

Este é o funil completo. A leitora deixa o e-mail em `/guia` e, a partir daí:

1. recebe na hora o e-mail de **boas-vindas** com o link pessoal do guia (o próprio site envia);
2. recebe **7 e-mails**, um por etapa, que devolvem a leitora ao guia e mantêm o ritmo do treino;
3. recebe um **e-mail final** com a curadoria.

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

## 1. Etapa 01 · Conhecer (1 dia depois)

- **Assunto:** Prazer, seu assoalho pélvico
- **Pré-cabeçalho:** Tem um músculo em você que quase ninguém apresentou.

> Oi, {{ contact.FIRSTNAME }}.
>
> Ele trabalha o dia inteiro — quando você ri, tosse, carrega peso — e quase ninguém foi apresentada a ele.
>
> A primeira etapa é só isso: saber onde fica o assoalho pélvico e o que ele faz por você. Um espelho pequeno, luz boa, nenhuma pressa.
>
> **[Ler a Etapa 01 →]({{ contact.EBOOK_URL }})**
>
> Com cuidado,
> Afrodite

*Sem produto. A primeira conversa é só sobre ela.*

---

## 2. Etapa 02 · Encontrar (3 dias depois)

- **Assunto:** O elevador que ninguém vê
- **Pré-cabeçalho:** Fechar, subir, soltar. O movimento é pequeno; a diferença, não.

> {{ contact.FIRSTNAME }}, a etapa 2 é encontrar o músculo — e o desafio não é força, é percepção.
>
> Deitada, joelhos dobrados: imagine a entrada da vagina e do ânus subindo juntas, como um elevador. Barriga, glúteos e coxas relaxados. E nada de prender a respiração.
>
> Pra explorar com mais conforto, um lubrificante de qualidade ajuda:
> **Gel Lubrificante e Hidratante Pélvico, da Dermosex**: [ver na loja](https://asosloja.com.br/products/gel-lubrificante-e-hidratante-pelvico-dermosex-220-ml?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Ler a Etapa 02 →]({{ contact.EBOOK_URL }})**

---

## 3. Etapa 03 · Pra você (5 dias depois)

- **Assunto:** Três motivos. Todos seus.
- **Pré-cabeçalho:** Pompoar não é pra agradar ninguém.

> {{ contact.FIRSTNAME }}, antes de treinar, vale decidir por quê.
>
> O pompoarismo passou anos como piada de novela e promessa de "enlouquecer o parceiro". Aqui, o centro é você: a sua percepção, o seu conforto, o seu corpo.
>
> O exercício da semana é escrever três motivos em primeira pessoa. "Eu quero sentir…", "eu quero entender…", "eu quero parar de…".
>
> **[Ler a Etapa 03 →]({{ contact.EBOOK_URL }})**

*Sem produto. Etapa de intenção.*

---

## 4. Etapa 04 · Exercícios (7 dias depois)

- **Assunto:** Cinco minutos. Ninguém percebe.
- **Pré-cabeçalho:** Contrair é metade. Soltar é a outra.

> {{ contact.FIRSTNAME }}, chegou a hora dos primeiros exercícios — sem acessório, sem academia.
>
> Contração lenta, contração rápida e o elevador em andares. Sempre soltando o ar ao contrair e relaxando por completo no fim.
>
> E uma regra que vale pra sempre: se doer, pare. Dor é sinal pra procurar uma fisioterapeuta pélvica.
>
> **[Ler a Etapa 04 →]({{ contact.EBOOK_URL }})**

---

## 5. Etapa 05 · Acessórios (9 dias depois)

- **Assunto:** Quando o básico ficar fácil
- **Pré-cabeçalho:** Acessório é companhia, não obrigação.

> {{ contact.FIRSTNAME }}, os acessórios são opcionais. Mas, quando os exercícios ficam fáceis, eles ajudam a sentir o músculo trabalhando e a progredir aos poucos.
>
> A regra de ouro: comece pelo mais leve, siga o manual e só avance quando estiver confortável.
>
> Duas opções de entrada:
> - **Cone para Pompoarismo 20 g, da Feminist**: [ver na loja](https://asosloja.com.br/products/cone-para-pompoarismo-feminist-rosa-20-g-outlet?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
> - **Kit Pompoar, da Feminist**: [ver na loja](https://asosloja.com.br/products/kit-pompoar-para-exercicios-de-pompoarismo-feminist?utm_source=Affiliates&utm_campaign=AffWLD_6Y)
>
> **[Ler a Etapa 05 →]({{ contact.EBOOK_URL }})**

---

## 6. Etapa 06 · Rotina (11 dias depois)

- **Assunto:** Constância vence intensidade
- **Pré-cabeçalho:** Um plano de quatro semanas, escovando os dentes.

> {{ contact.FIRSTNAME }}, músculo responde a regularidade. Cinco minutos por dia valem mais que uma hora no domingo.
>
> O guia traz um plano de quatro semanas: deitada, sentada, em pé e no movimento. O truque é amarrar o treino a um hábito que você já tem — o café, o banho, a escova de dentes.
>
> Pulou um dia? Recomeça no seguinte. Sem culpa.
>
> **[Ler a Etapa 06 →]({{ contact.EBOOK_URL }})**

---

## 7. Etapa 07 · Companhia (13 dias depois)

- **Assunto:** Pedir ajuda também é autonomia
- **Pré-cabeçalho:** Os sinais que pedem uma fisioterapeuta pélvica.

> {{ contact.FIRSTNAME }}, a última etapa é saber quando chamar quem entende.
>
> Escape de urina ao tossir ou rir, dor na relação, sensação de peso na vagina, gestação, pós-parto, mudanças na menopausa: tudo isso merece a avaliação de uma fisioterapeuta pélvica.
>
> Não é fracasso. É o mesmo raciocínio de ir à dentista: cuidar bem inclui cuidar com quem entende.
>
> **[Ler a Etapa 07 →]({{ contact.EBOOK_URL }})**

---

## 8. Curadoria (15 dias depois)

- **Assunto:** Pra cada movimento, um cuidado
- **Pré-cabeçalho:** A curadoria da Afrodite, organizada do jeito que você chegou até aqui.

> {{ contact.FIRSTNAME }}, você passou pelas 7 etapas — no seu ritmo, do seu jeito.
>
> A curadoria da Afrodite segue os mesmos quatro movimentos:
> - **Cuidar de mim**: a rotina de cuidado diário.
> - **Conforto e sentidos**: texturas, aromas e sensações.
> - **Explorar**: pra experimentar o que desperta vontade.
> - **Premium**: pra quem já sabe o que quer.
>
> **[Ver a curadoria →](https://afroditeprazer.com.br/)**
>
> Se quiser contar como estão sendo os treinos, responde este e-mail — a gente lê todos.

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
6. **Automação:** em Automações → "Contato adicionado à lista" (Guia pompoar), monte os e-mails 1 a 8 acima com os intervalos indicados.
7. **Aviso no ebook:** só depois que a automação estiver ativa, crie no Railway a variável `EMAIL_SEQUENCE_ACTIVE=1`. Ela faz o final do ebook anunciar os e-mails ("Fica de olho no seu e-mail").

**Enquanto o Brevo não estiver configurado:** o site continua funcionando. A leitora recebe o link na tela, e cada cadastro fica registrado nos logs do Railway. Para achar, busque por `[lead]` em Deployments → View logs.
