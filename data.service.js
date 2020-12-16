const fs = require("fs");

const getInput = url => fs.readFileSync(url, {
  encoding: "utf-8",
  flag: "r",
});

module.exports = getInput;