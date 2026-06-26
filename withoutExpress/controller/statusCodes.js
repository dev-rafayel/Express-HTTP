const notFoundResponse = {
  url(pathName) {
    return {
      status: 404,
      message: JSON.stringify({
        error: `${404}. The requested URL /${pathName} was not found on this server.`,
      }),
    };
  },

  method(method) {
    return {
      status: 404,
      message: JSON.stringify({
        error: `${404}. The request method ${method} is not allowed.`,
      }),
    };
  },

  bookNotFound: {
    status: 404,
    message: JSON.stringify('Book not found'),
  },
};


const badRequestResponses = {
  resourceIDRequired: {
    status: 400,
    message: JSON.stringify(`resourceID is required`),
  },

  titleAndAuthorRequired: {
    status: 400,
    message: JSON.stringify(`Title and author are required`),
  },
};

const successResponses = {
  bookCreated: {
    status: 201,
    message: JSON.stringify('The book is created successfully.'),
  },
  bookUpdated: {
    status: 204,
    message: JSON.stringify('The book is updated successfully.'),
  },
  bookDeleted: {
    status: 200,
    message: JSON.stringify('The book is deleted successfully.'),
  }
};

module.exports = {
  notFoundResponse,
  badRequestResponses,
  successResponses,
};