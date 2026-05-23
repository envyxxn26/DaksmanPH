const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

app.use('/css', express.static(path.join(ROOT, 'css')));
app.use('/js', express.static(path.join(ROOT, 'js')));
app.use('/assets', express.static(path.join(ROOT, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(ROOT, 'html', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`DaksmanPH running at http://localhost:${PORT}`);
});
