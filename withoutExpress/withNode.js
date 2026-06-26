require('dotenv').config({ quiet: true });
const PORT = process.env.PORT;
const http = require('http');
const parser = require('./utils/parseURL');
// Импортируем нашу единую функцию роутинга
const { handleRouting } = require('./router/booksRouter');

const server = http.createServer((req, res) => {
  // this may help to get a body of request..
  let body = '';
  req.on('data', (chunk) => body += chunk.toString());

  req.on('end', () => {
    const path = parser(req.url);

    const result = handleRouting(
      req.method,
      path.pathName,
      path.resourceID,
      body,
    );

    res.writeHead(result.status, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(result.data || result.message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}\n`);
});
