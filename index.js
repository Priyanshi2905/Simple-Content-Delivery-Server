import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
app.use((req, res, next) => {
  const ip = req.ip;
  const time = new Date().toISOString();
  const log = `IP: ${ip} - Time: ${time}\n`;
  fs.appendFile('visits.log', log, (err) => {
    if (err) throw err;
  });
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/logs', (req, res) => {
  fs.readFile('visits.log', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading logs' });
      return;
    }
    const logs = data.split('\n').filter(log => log.length > 0);
    res.json({ logs });
  });
});
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});
app.post('/submit', (req, res) => {
  res.json({ message: 'Data submitted' });
});
app.put('/update', (req, res) => {
  res.json({ message: 'Data updated' });
});
app.delete('/delete', (req, res) => {
  res.json({ message: 'Data deleted' });
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});