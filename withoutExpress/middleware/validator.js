function validateRequest(fields) {
  return (req, res, next, bodyNotRequired) => {
    if (bodyNotRequired) return next();
    const missing = fields.filter((field) => !req.body[field]);

    if (missing.length) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`
      }));
    }
    next();
  };
}

module.exports = validateRequest;