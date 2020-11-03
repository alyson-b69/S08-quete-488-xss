const app = require("./index");

const server = app.listen(
  4000,
  () => {
    console.log("Error running express server.");
  },
  () => {
    console.log("Express server listening on port 4000.");
  }
);

module.exports = server;
