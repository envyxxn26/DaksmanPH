# DaksmanPH
A small website for Daksman intimate wellness wipes.

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file:
   ```bash
   copy .env.example .env
   ```
3. Open `.env` and fill in your SMTP credentials.

## Run locally
- Development (auto-restart):
  ```bash
  npm run dev
  ```
- Production:
  ```bash
  npm start
  ```

Open **http://localhost:3000**

## Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Configure Vercel deployment"
git push
```

### 2. Import on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project** and import this repository.
3. Framework Preset: **Other**
4. Build Command: leave empty
5. Output Directory: leave empty
6. Add these **Environment Variables** (Production, Preview, and Development):

| Name | Example |
|------|---------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | your Gmail app password |
| `EMAIL_FROM` | `Daksman Contact <your-email@gmail.com>` |

7. Click **Deploy**.

### 3. Connect your GoDaddy domain
1. In Vercel: Project → **Settings** → **Domains**
2. Add `yourdomain.com` and `www.yourdomain.com`
3. In GoDaddy: **My Products** → your domain → **DNS**

Add these records:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Or switch GoDaddy nameservers to Vercel's (shown in the Vercel domain settings).

DNS can take up to 48 hours. Vercel enables HTTPS automatically.

## Contact form email
The contact page sends form submissions to `daksmanph@gmail.com` using SMTP credentials from environment variables.

Required values:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
