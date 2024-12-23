const { decode, encode } = require("entities");

const asyncHandler =
  (fn) =>
  (req, res, next, ...args) => {
    Promise.resolve(fn(req, res, next, ...args)).catch(next);
  };

const isEncoded = (str) => str !== decode(str);
const decodeDescription = (company) => {
  if (company.description && isEncoded(company.description)) {
    company.description = decode(company.description);
  }
  return company;
};

module.exports = { asyncHandler, decodeDescription };
