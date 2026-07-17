// const app = require("../server/server");

// module.exports = app;

export default function handler(req, res) {
  return res.status(200).json({
    works: true,
  });
}
