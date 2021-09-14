var response = function (result, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(result) + "\n");
};

var Router = require("../frontend/js/lib/Router")();

Router.add("api/version", function (req, res) {
  response(
    {
      version: "0.4",
    },
    res
  );
}).add(function (req, res) {
  response(
    {
      success: true,
    },
    res
  );
});

module.exports = function (req, res) {
  Router.check(req.url, [res, res]);
};
