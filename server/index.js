  
const crypto = require('crypto');
const config = require('./config');
const express = require('express');
const pino = require('express-pino-logger')();

const axios = require('axios');

const app = express();
app.use(pino);

const secretKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzIrJng2dW9xPratyAE0nDm5qrnYxyw2lOVVt
BgS7C01Aufw/+RDUnneZuHvYB0rU6LExdANvMzDvqNxVQeQNwd5Frrgtx1GV5yZaKuDMqSa6TtFfW/l
oaKHiLJyIKJTiig4zqjHi0mYI2+Z2Z4wDXx1J8R+Pv+poFShK8vj7Tgx5LwgE/cK7Iq/coTXWEQJrzEbbstBJIq5o
r5oWBhK0XqB0L3THZZDp3U2b3siIWBniRTU4hquKrwu2/JTmrTYfOAFdR8FRj3oJcFVaexsbhwpiA8RFoY
043fhYKBzDz4NK8tFegYn3JIxq+7XReJJQjSKW8/LAxHAypG/aj3C8QIDAQAB
-----END PUBLIC KEY-----`;


app.get('/api/daraz', async (req, res) => {
  const timestamp = new Date().getTime();

  const stringToEncrypt = timestamp + '+' + config.adstreamToken;

  const encMsg = crypto.publicEncrypt(secretKey, Buffer.from(stringToEncrypt));

  const token = encMsg.toString('base64');

  const url = config.darazAdstreamBaseUri + 'marketing/download_feeds?token='+token;

  const response = await axios.get(url);

  console.log(response);

  const name = req.query.name || 'World';
  
  res.setHeader('Content-Type', 'application/json');

  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () =>
console.log(`Express server is running on port ${app.get('port')}`)
);