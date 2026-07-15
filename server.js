require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/js', express.static(path.join(ROOT, 'js')));
app.use('/assets', express.static(path.join(ROOT, 'assets')));
app.use(express.static(path.join(ROOT, 'html'), { extensions: ['html'] }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'contact.html'));
});

app.post('/contact', async (req, res) => {
  const { email, subject, message, hide_identity } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || `Daksman Contact <${process.env.SMTP_USER || 'no-reply@daksmanph.com'}>`,
    to: 'daksmanph@gmail.com',
    subject: `Contact form submission: ${subject}`,
    text: [
      `Email: ${email}`,
      `Hide identity: ${hide_identity ? 'Yes' : 'No'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).json({ success: false, error: 'Unable to send email at this time.' });
  }
});

app.listen(PORT, () => {
  console.log(`DaksmanPH running at http://localhost:${PORT}`);
});
