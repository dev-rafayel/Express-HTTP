const { booksController } = require('../controller/booksController.js');

// creating the route map
const routesMap = new Map([
  ['GET', new Map()],
  ['POST', new Map()],
  ['PUT', new Map()],
  ['PATCH', new Map()],
  ['DELETE', new Map()],
]);

routesMap.get('GET').set('books', booksController.get);
routesMap.get('POST').set('books', booksController.post);
routesMap.get('PUT').set('books', booksController.put);
routesMap.get('PATCH').set('books', booksController.patch);
routesMap.get('DELETE').set('books', booksController.delete);

const handleRouting = (method, pathName, resourceID) => {
  // gets method
  const methodMap = routesMap.get(method);
  if (!methodMap) {
    return notFoundResponse.method(method);
  }

  // checks url
  const handler = methodMap.get(pathName);
  if (!handler) {
    return notFoundResponse.url(pathName);
  }

  // call needed method 
  const data = handler(resourceID);
  return { status: 200, data };
};

module.exports = { handleRouting, routesMap };