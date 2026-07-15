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

## Run
- Start development server:
  ```bash
  npm run dev
  ```
- Start production server:
  ```bash
  npm start
  ```

## Contact form email
The contact page sends form submissions to `daksmanph@gmail.com` using SMTP credentials from `.env`.

Required `.env` values:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
