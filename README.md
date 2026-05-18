# Afrodite, prazer.

Site institucional — protótipo estrutural.
Onde o prazer é liberdade.

## Local

```bash
npm install
npm start
# abre em http://localhost:3000
```

## Deploy no Railway

1. Suba este repositório no GitHub.
2. No Railway: **New Project → Deploy from GitHub repo** → selecione o repositório.
3. O Railway detecta Node automaticamente:
   - Roda `npm install`
   - Roda `npm start` (servido pelo pacote [`serve`](https://www.npmjs.com/package/serve))
4. Em **Settings → Networking → Generate Domain** para obter a URL pública.
5. (Opcional) Em **Settings → Networking → Custom Domain**, aponte `afroditeprazer.com.br` (ou subdomínio) — o Railway mostra os registros DNS a configurar no seu provedor.

### Variáveis de ambiente
Nenhuma necessária. O Railway injeta `PORT` automaticamente e o `start` script já o respeita.

## Estrutura

```
index.html      → site (single page, todas as seções)
package.json    → script de start + dependência `serve`
.gitignore
README.md
```

Conteúdo, produtos e ensaios serão adicionados em fases seguintes — a estrutura e a marca já estão prontas.
