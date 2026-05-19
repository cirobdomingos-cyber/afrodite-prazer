# DNS setup — afroditeprazer.com.br

The site is hosted on **Railway** (project hostname: `tyxpexw5.up.railway.app`).
The domain `afroditeprazer.com.br` is registered at **Registro.br** but uses
**Cloudflare** as its DNS host, because Registro.br does not support CNAME at
the apex (`@`) and Railway requires it.

> ⚠️ This file should match what's currently configured in Railway. If you
> remove/re-add the custom domain in Railway, the **TXT verification value**
> changes — update this doc.

---

## Architecture

```
Registro.br (registrar)
    │
    │  nameservers point to →
    ▼
Cloudflare (DNS host, free plan)
    │
    │  CNAME flattening at apex →
    ▼
Railway (tyxpexw5.up.railway.app)
    │
    ▼
Next.js app
```

Cloudflare's CNAME flattening is what makes apex (`@`) work. The orange-cloud
proxy is **off** — Railway terminates TLS itself.

---

## Cloudflare records

In Cloudflare → `afroditeprazer.com.br` → **DNS** → **Records**:

| Type    | Name              | Content                                   | Proxy status     | TTL  |
|---------|-------------------|-------------------------------------------|------------------|------|
| CNAME   | `@`               | `tyxpexw5.up.railway.app`                 | **DNS only** (grey cloud) | Auto |
| CNAME   | `www`             | `tyxpexw5.up.railway.app`                 | **DNS only** (grey cloud) | Auto |
| TXT     | `_railway-verify` | _(value Railway gives you — different per domain registration)_ | n/a              | Auto |

> The **DNS only / grey cloud** part matters. If you leave the orange cloud on
> (Cloudflare proxying), Railway can't issue its TLS cert and you'll get
> SSL warnings.

### Redirect www → apex (optional but nice)

In Cloudflare → **Rules** → **Redirect Rules** → create rule:

- Name: `www → apex`
- When incoming requests match: `Hostname` `equals` `www.afroditeprazer.com.br`
- Then: **Dynamic redirect** → expression `concat("https://afroditeprazer.com.br", http.request.uri.path)` → Status **301**.

Alternative: add `www.afroditeprazer.com.br` as a second custom domain in
Railway and let it 301 there.

---

## Registro.br side

In Registro.br → painel → seu domínio → **Servidores DNS**:

- Replace the default Registro.br nameservers with the two Cloudflare gives
  you (something like `ana.ns.cloudflare.com` and `walt.ns.cloudflare.com`).
- Save and wait. Propagation is usually 15 min – 2 h. Cloudflare emails you
  when active.

After nameserver propagation:
- DNS edits go through Cloudflare (fast, instant).
- Registro.br just owns the registration record; it's no longer the DNS host.

---

## Verifying

```powershell
# CNAME flattening should resolve to a Railway IP, not the CNAME target
nslookup afroditeprazer.com.br
nslookup www.afroditeprazer.com.br

# TXT record should be visible
nslookup -type=TXT _railway-verify.afroditeprazer.com.br
```

Then click **Verify** in Railway. Railway issues the TLS cert automatically
(Let's Encrypt). First request to `https://afroditeprazer.com.br` should
return the home page within a couple of minutes of verify.

---

## When something breaks

- **Railway says "verification failed"** → the TXT record didn't propagate yet,
  or you copy-pasted the wrong value. Re-check the value in Railway's UI; it
  changes per domain registration.
- **Browser shows Cloudflare error 522 / 525** → orange cloud is on. Switch
  the CNAME row to **DNS only** (grey).
- **`nslookup` returns Registro.br's nameservers** → nameserver change hasn't
  propagated yet. Wait. `dig +trace afroditeprazer.com.br` shows where it's
  stuck.
- **TLS warning on first load** → Railway hasn't issued the cert yet; takes
  ~60 s after verify. Reload.
