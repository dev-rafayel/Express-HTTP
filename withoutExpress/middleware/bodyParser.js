const parseURL = require('../utils/parseURL');
const validateRequest = require('./validator.js')
const { handleRouting } = require('../router/booksRouter');

function parseBody(req, res, bodyNotRequired) {
  return new Promise((resolve) => {
    // building body
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
  
    req.on('end', () => {
      const path = parseURL(req.url);
      req.body = body ? JSON.parse(body) : {};

      // checking if body exists 
      const bookValidator = validateRequest(['title', 'author']);
      bookValidator(req, res, () => {
        const result = handleRouting(req.method, path.pathName, path.resourceID, req.body);
        resolve(result);
      }, bodyNotRequired);
    });
  });
}

module.exports = parseBody;