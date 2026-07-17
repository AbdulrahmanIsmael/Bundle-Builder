// const app = require("../server/server");

// module.exports = app;

module.exports = (req, res) => {
  res.status(200).json({
    messgae: "Hello from Vercel!",
  });
};
