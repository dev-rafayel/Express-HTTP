const { booksController, notFoundResponse } = require('../controller/booksController.js');

// Создаем и наполняем карту маршрутов прямо здесь, избегая циклических импортов
const routesMap = new Map([
  ['GET', new Map()],
  ['POST', new Map()],
  ['PUT', new Map()],
  ['PATCH', new Map()],
  ['DELETE', new Map()],
]);

// Регистрируем функции контроллера на путь 'books'
routesMap.get('GET').set('books', booksController.get);
routesMap.get('POST').set('books', booksController.post);
routesMap.get('PUT').set('books', booksController.put);
routesMap.get('PATCH').set('books', booksController.patch);
routesMap.get('DELETE').set('books', booksController.delete);

const handleRouting = (method, pathName, resourceID) => {
  // 1. Проверяем HTTP-метод
  const methodMap = routesMap.get(method);
  if (!methodMap) {
    return notFoundResponse.method(method);
  }

  // 2. Проверяем URL-путь
  const handler = methodMap.get(pathName);
  if (!handler) {
    return notFoundResponse.url(pathName);
  }

  // 3. Если всё ок — вызываем нужный метод контроллера
  const data = handler(resourceID);
  return { status: 200, data };
};

// Экспортируем только одну главную функцию роутера
module.exports = { handleRouting, routesMap };