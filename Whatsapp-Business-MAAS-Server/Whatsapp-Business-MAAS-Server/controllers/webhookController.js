import fs from 'fs';
import path from 'path';

const logFilePath = path.resolve('logs', 'webhook.log');

const VERIFY_TOKEN = "YOUR_VERIFY_TOKEN"; // Replace with your real token or use env

export const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
};

export const handleWebhook = (req, res) => {
  const payload = JSON.stringify(req.body, null, 2);

  // Append the payload with a separator and newline for readability
  const logEntry = `${new Date().toISOString()} - Incoming webhook:\n${payload}\n\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('❌ Failed to append webhook log:', err);
    } else {
      console.log('✅ Webhook payload appended to logs/webhook.log');
    }
  });

  res.sendStatus(200);
};
