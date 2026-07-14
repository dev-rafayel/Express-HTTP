require('dotenv').config({ quiet: true });
const { path, PORT } = process.env;
const http = require('http');
const bodyParser = require('./middleware/bodyParser');

const server = http.createServer(async (req, res) => {
  const method = req.method;
  let result;
  if (method === 'GET' || method === 'DELETE') {
    result = await bodyParser(req, res, bodyNotRequired = true);
  } else {
    result = await bodyParser(req, res);
  }

  res.writeHead(result.status, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(result.data || result.message);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://${path}:${PORT}\n`);
});
