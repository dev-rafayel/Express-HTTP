const parser = (url) => {
    const [, pathName, resourceID] = url.split('/');
    return { pathName, resourceID };
}

module.exports = parser;