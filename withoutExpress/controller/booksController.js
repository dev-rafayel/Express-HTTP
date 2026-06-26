const path = require('path');
const fs = require('fs');
const { json } = require('stream/consumers');
const { pathToFileURL } = require('url');

const pathToData = path.resolve(__dirname, '../../booksData.json');

const { notFoundResponse, badRequestResponses, successResponses } = require('./statusCodes.js');

const booksController = {
  get(resourceID) {
    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    if (!resourceID) return rawArray;

    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary)
      return notFoundResponse.bookNotFound;
    return JSON.stringify(necessary);
  },

  post(resourceID, body) {
    // parsed body to string and read data file
    const bodyData = JSON.parse(body);
    const jsonData = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(jsonData); // parsed to js array

    const newBook = {
      id: booksArray.length + 1,
      author: bodyData.author,
      title: bodyData.title,
    };
    booksArray.push(newBook);

    // converted to json and updated data file
    const updatedJson = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedJson, 'utf-8');
    return successResponses.bookCreated;
  },

  put(resourceID, body) {
    if (!resourceID)
      return badRequestResponses.resourceIDRequired;

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    const bodyData = JSON.parse(body);
    if (!bodyData.title || !bodyData.author)
      return badRequestResponses.titleAndAuthorRequired;

    necessary.author = bodyData.author;
    necessary.title = bodyData.title;
    const updatedData = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedData, 'utf-8');
    return successResponses.bookUpdated;
  },

  patch(resourceID, body) {
    if (!resourceID)
      return badRequestResponses.resourceIDRequired;

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find((bk) => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    const bodyData = JSON.parse(body);
    if (!bodyData.title || !bodyData.author)
      return badRequestResponses.titleAndAuthorRequired;

    Object.assign(necessary, bodyData);
    const updatedData = JSON.stringify(booksArray, null, 2);
    fs.writeFileSync(pathToData, updatedData, 'utf-8');
    return successResponses.bookUpdated;
  },

  delete(resourceID, body) {
    if (!resourceID) { 
      return badRequestResponses.resourceIDRequired;
    }

    const rawArray = fs.readFileSync(pathToData, 'utf-8');
    const booksArray = JSON.parse(rawArray);
    const bookId = Number(resourceID);

    const necessary = booksArray.find(bk => bk.id === bookId);
    if (!necessary) {
      return notFoundResponse.bookNotFound;
    }

    const newArray = booksArray.filter(bk => bk.id !== bookId);
    const updatedJSONData = JSON.stringify(newArray, null, 2);
    fs.writeFileSync(pathToData, updatedJSONData, 'utf-8');
    return successResponses.bookDeleted;
  },
};

module.exports = { booksController, notFoundResponse };
