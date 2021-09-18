const sha1 = require("sha1");
var response = function (result, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(result) + "\n");
};

var error = function (message, res) {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message } + "\n"));
};

//var Router = require("../frontend/js/lib/Router")();

const { MongoClient } = require("mongodb");

//Connection URL
const url = "mongodb://localhost:37017";
const client = new MongoClient(url);

//Database Name
const dbName = "socialmediapp";
var database;

async function main() {
  //use connect method to connect to the server

  await client.connect();
  console.log("Connected succesfully to server");
  database = client.db(dbName);
  //const collection = database.collection("user");

  console.log("done with database connnection");
  return "done.";
}

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

var getDatabaseConnection = function (callback) {
  if (database) {
    callback(database);
    return;
  } else {
    main()
      .then(console.log, callback(database))
      .catch(console.error)
      .finally(() => client.close());
  }
};

//function for validating emails
var validEmail = function (value) {
  var regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};

//Database Name
//we use the request object as a stream
// and subscribe to its data event
var processPOSTRequest = function (req, callback) {
  console.log("just got started with handling user lOGINN");
  var body = "";
  console.log("body, ", console.log(req.body));
  req
    .on("error", function (err) {
      console.error(err);
    })
    .on("data", function (data) {
      body += data;
    })
    .on("end", function () {
      console.log("end");
      const newSearchParams = new URLSearchParams(body);
      callback(newSearchParams.toString());
    });
};

var postRequestWithCallback = function (req, res) {
  processPOSTRequest(req, function (data) {
    if (!data.firstName || data.firstName === "") {
      error("Please fill your first name.", res);
    } else if (!data.lastName || data.lastName === "") {
      error("Please fill your last name.", res);
    } else if (!data.email || data.email === "" || !validEmail(data.email)) {
      error("Invalid or missinng email", res);
    } else if (!data.password || data.password === "") {
      error("Please fill your password.", res);
    } else {
      getDatabaseConnection(function (database) {
        var collection = database.collection("users");
        data.password = sha1(data.password);
        collection.insert(data, function (err, docs) {
          if (err) {
            response(
              {
                failure: "failure",
              },
              res
            );
          } else {
            response(
              {
                success: "OK",
              },
              res
            );
          }
        });
      });
    }
  });
};

//used for fetching data from front-end for a specific user
var handleUserSessions = function (req, res) {
  if (req.session && req.session.user) {
    response(req.session.user, res);
  } else {
    response({}, res);
  }
};

var handleDeleteProfile = function (req, res) {
  getDatabaseConnection(function (database) {
    var collection = database.collection("users");
    collection.remove({ email: req.session.user.email }, function (err, docs) {
      delete req.session.user;
      response(
        {
          success: "OK",
        },
        res
      );
    });
  });
};

var handleProfileUpdate = function (req, res) {
  processPOSTRequest(req, function (data) {
    if (!data.firstName || data.firstName === "") {
      error("Please fill your first.name.", res);
    } else if (!data.lastName || data.lastName === "") {
      error("Please fill your last name.", res);
    } else {
      getDatabaseConnection(function (database) {
        var collection = database.collection("users");
        if (data.password) {
          data.password = sha1(data.password);
        }
        collection.update(
          { email: req.session.user.email },
          { $set: data },
          function (err, result) {
            if (err) {
              err("Error update the data");
            } else {
              if (data.password) {
                delete data.password;
              }
              for (var key in data) {
                req.session.user[key] = data[key];
              }
              response(
                {
                  success: "OK",
                },
                res
              );
            }
          }
        );
      });
    }
  });
};

var handleUserLogin = function (req, res) {
  processPOSTRequest(req, function (data) {
    console.log("help, we just started the user login");
    console.log("data", data);
    if (!data.email || data.email === "" || !validEmail(data.email)) {
      //error("Invalid or missing email.", res);
      console.error("Invalid or missing email.");
    } else if (!data.password || data.password === "") {
      //error("Please enter your password.", res);
      console.error("Please enter your password.");
    } else {
      getDatabaseConnection(function (database) {
        var collection = database.collection("users");
        collection
          .find({
            email: data.email,
            password: sha1(data.password),
          })
          .toArray(function (err, result) {
            if (result.length === 0) {
              error("wrong email or password", res);
            } else {
              var user = result[0];
              delete user._id;
              delete user.password;
              //how we store a session
              req.session.user = user;
              response(
                {
                  success: "OK",
                  user: user,
                },
                res
              );
            }
          });
      });
    }
  });
};

var appVersion = function (res) {
  return response(
    {
      version: "0.4",
    },
    res
  );
};

var handleUserLogout = function (req, res) {
  delete req.session.user;
  return response(
    {
      success: "OK",
    },
    res
  );
};

var handleRESTMethods = function (req, res) {
  switch (req.method) {
    case "GET":
      handleUserSessions(req, res);
      break;
    case "PUT":
      handleProfileUpdate(req, res);
      break;
    case "POST":
      postRequestWithCallback(req, res);
      break;
    case "DELETE":
      handleDeleteProfile(req, res);
      break;
  }
};

var Router = require("../frontend/js/lib/Router");
//const cookieSession = require("cookie-session");

Router.add("api/version", function (req, res) {
  appVersion(res);
})
  .add("api/user/login", function (req, res) {
    handleUserLogin.call(this, req, res);
  })
  .add("api/user/logout", function (req, res) {
    handleUserLogout.call(this, req, res);
  })
  .add("api/user", function (req, res) {
    handleRESTMethods(req, res);
  })
  .add("api/pages", require("./api/pages"))
  .add(function (req, res) {
    response(
      {
        success: true,
      },
      res
    );
  });

module.exports = function (req, res) {
  Router.check(req.url, [req, res]);
};
