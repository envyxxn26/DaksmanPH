# DaksmanPH

Official website for **Daksman** — a Philippine intimate wellness brand offering discreet, single-use wipes designed to help temporarily reduce sensitivity and support confidence.

**Live site:** [daksman.com](https://daksman.com)

## Features

- **Home** — Hero, product overview, how-to-use, client feedback, and FAQ
- **About** — Brand story and product information
- **Contact** — Form with optional identity hiding; submissions emailed to the team
- **Order Now** — Modal linking to Shopee, TikTok Shop, and Lazada storefronts
- **Responsive layout** — Optimized for desktop, tablet, and mobile

## Tech stack

| Layer | Technology |
|-------|------------|
| Server | Node.js, Express 5 |
| Email | Nodemailer (SMTP) |
| Frontend | HTML, CSS, vanilla JavaScript |
| Fonts | Montserrat, Playfair Display (Google Fonts) |

## Project structure

```
DaksmanPH/
├── server.js          # Express app, routes, contact form handler
├── html/              # Page templates (index, about, contact)
├── css/style.css      # Global styles
├── js/script.js       # Navigation, FAQ, contact form, order modal
├── assets/            # Images and logos
├── .env.example       # Environment variable template
└── package.json
```

## Local setup

**Requirements:** Node.js 18 or later

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   # Windows
   copy .env.example .env

   # macOS / Linux
   cp .env.example .env
   ```

3. Edit `.env` and add your SMTP credentials (see [Environment variables](#environment-variables)).

## Run locally

| Command | Description |
|---------|-------------|
| `npm run dev` | Development with auto-restart (nodemon) |
| `npm start` | Production mode |

Open [http://localhost:3000](http://localhost:3000)

## Environment variables

The contact form sends email via SMTP. Copy these from `.env.example`:

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `465` |
| `SMTP_SECURE` | Use SSL/TLS | `true` |
| `SMTP_USER` | Sender Gmail address | `your-email@gmail.com` |
| `SMTP_PASS` | Gmail App Password | 16-character app password |
| `EMAIL_FROM` | Display name in emails | `Daksman Contact <your-email@gmail.com>` |

For Gmail, enable 2-Step Verification and create an [App Password](https://myaccount.google.com/apppasswords). Do not use your regular Gmail password.

Form submissions are delivered to **daksmanph@gmail.com**.

`PORT` is set automatically on Render — you do not need to configure it locally unless you want a custom port.

## Deploy to Render

This project is configured as a **Web Service** on [Render](https://render.com).

### 1. Push to GitHub

```bash
git add .
git commit -m "Your commit message"
git push
```

### 2. Create the Web Service

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect this repository
3. Use these settings:

| Setting | Value |
|---------|-------|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

4. Add all [environment variables](#environment-variables) under **Environment**
5. Click **Create Web Service**

### 3. Connect a custom domain (GoDaddy)

1. In Render: **Settings** → **Custom Domains** → add `yourdomain.com` and `www.yourdomain.com`
2. In GoDaddy: **My Products** → your domain → **DNS** → remove old records pointing elsewhere
3. Add:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `216.24.57.1` |
| CNAME | `www` | `your-app-name.onrender.com` |

Replace `your-app-name.onrender.com` with your actual Render hostname. DNS can take up to 48 hours; Render provisions HTTPS automatically once verified.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/contact` | Contact page |
| POST | `/contact` | Contact form submission (JSON response) |

## License

See [LICENSE](LICENSE).
