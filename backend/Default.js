var fs = require("fs");
var path = require("path");
//var html = fs.readFileSync(path.dirname + "/tpl/page.html").toString("utf8");
//var html = fs.readFileSync(path.dirname("/tpl/page.html")).toString("utf8");
var html = fs
  // eslint-disable-next-line no-undef
  .readFileSync(path.join(__dirname, "/tpl/page.html"))
  .toString("utf8");

module.exports = function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html + "\n");
};
