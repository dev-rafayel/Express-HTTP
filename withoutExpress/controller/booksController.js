const path = require('path');
const fs = require('fs');

const pathToData = path.resolve(__dirname, '../../booksData.json');

const {
  notFoundResponse,
  badRequestResponses,
  successResponses,
} = require('../utils/statusCodes');

const booksController = {
  get(resourceID) {
    const rawArray = fs.readFileSync(pathToData, 'utf-8');

    // if no id returns all books
    if (!resourceID) {
      return {
        status: 200,
        data: rawArray,
      };
    }

    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    // returns founded book
    return {
      status: 200,
      data: JSON.stringify(necessary),
    };
  },

  post(resourceID, bodyData) {
    const jsonData = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(jsonData);

    const newBook = {
      id: booksArray.length + 1,
      author: bodyData.author,
      title: bodyData.title,
    };
    booksArray.push(newBook);

    // parsed to json and updated data file
    const updatedJson = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedJson, 'utf-8');
    return successResponses.bookCreated;
  },

  put(resourceID, bodyData) {
    if (!resourceID) return badRequestResponses.resourceIDRequired;

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    if (!bodyData.title || !bodyData.author)
      return badRequestResponses.titleAndAuthorRequired;

    necessary.author = bodyData.author;
    necessary.title = bodyData.title;

    const updatedData = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedData, 'utf-8');
    return successResponses.bookUpdated;
  },

  patch(resourceID, bodyData) {
    if (!resourceID) return badRequestResponses.resourceIDRequired;

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    // checks that body is not empty
    if (Object.keys(bodyData).length === 0) {
      return badRequestResponses.bodyRequired;
    }

    // updates the sent data
    Object.assign(necessary, bodyData);

    const updatedData = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedData, 'utf-8');
    return successResponses.bookUpdated;
  },

  delete(resourceID) {
    if (!resourceID) {
      return badRequestResponses.resourceIDRequired;
    }

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    const newArray = booksArray.filter((bk) => bk.id !== bookId);
    const updatedJSONData = JSON.stringify(newArray, null, 2);
    fs.writeFileSync(pathToData, updatedJSONData, 'utf-8');

    return successResponses.bookDeleted;
  },
};

module.exports = { booksController };
