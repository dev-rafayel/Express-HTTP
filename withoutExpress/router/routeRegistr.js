const { routesMap } = require('./booksRouter.js');
const getMethodMap = routesMap.get('GET');
getMethodMap.set('/books', '../../booksData.json');