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
    console.log("database is full and ready to use");
    callback(database);
    return;
  } else {
    console.log("database is not full and ready to use");
    main().then(console.log).catch(console.error);
    // .finally(() => client.close());

    // MongoClient.connect(
    //   "mongodb://localhost:37017/socialmediapp",
    //   function (error, db) {
    //     if (error) {
    //       throw error;
    //     }
    //     database = db;
    //     callback(database);
    //   }
    // );
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
      console.log("error");
      console.error(err);
    })
    .on("data", function (data) {
      console.log("data");
      body += data;
    })
    .on("end", function () {
      console.log("end");
      const newSearchParams = new URLSearchParams(body);
      console.log(newSearchParams);
      callback(newSearchParams);
    });
};

var postRequestWithCallback = function (req, res) {
  console.log("working on getting a datbase connection before post request");

  processPOSTRequest(req, function (data) {
    console.log("calling ProcessPostRequest from the callback");
    // if (!data.firstName || data.firstName === "") {
    // error("Please fill your first name.", res);
    if (!data.get("firstName") || data.get("firstName") === "") {
      error("Please fill your first name");
    } else if (!data.get("lastName") || data.get("lastName") === "") {
      error("Please fill your last name.", res);
    } else if (
      !data.get("email") ||
      data.get("email") === "" ||
      !validEmail(data.get("email"))
    ) {
      error("Invalid or missinng email", res);
    } else if (!data.get("password") || data.get("password") === "") {
      error("Please fill your password.", res);
    } else {
      console.log("working on getting a datbase connection");
      getDatabaseConnection(function (database) {
        var collection = database.collection("user");
        data.password = sha1(data.get("password"));
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
    var collection = database.collection("user");
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
        var collection = database.collection("user");
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
        var collection = database.collection("user");
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

var getCurrentUser = function (callback, req, res) {
  getDatabaseConnection(function (database) {
    var collection = database.collection("user");
    collection
      .find({
        email: req.session.user.email,
      })
      .toArray(function (err, result) {
        if (result.length === 0) {
          error("No such user", res);
        } else {
          callback(result[0]);
        }
      });
  });
};

var handleFindFriends = function (req, res) {
  if (req.session && req.session.user) {
    if (req.method === "POST") {
      processPOSTRequest(req, function (data) {
        getDatabaseConnection(function (database) {
          getCurrentUser(
            function (user) {
              findFriends(
                req,
                res,
                database,
                data.searchFor,
                user.friends || []
              );
            },
            req,
            res
          );
        });
      });
    } else {
      error("This method accepts only POST request", res);
    }
  } else {
    error("You must be logged in to use this method", res);
  }
};

var findFriends = function (req, res, database, searchFor, currentFriends) {
  var collection = database.collection("user");
  var regExp = new RegExp(searchFor, "gi");
  var excludeEmails = [req.session.user.email];
  currentFriends.forEach(function (value, index, arr) {
    arr[index] = ObjectId(value);
  });
  collection
    .find({
      $and: [
        {
          $or: [{ firstName: regExp }, { lastName: regExp }],
        },
        { email: { $nin: excludeEmails } },
        { _id: { $nin: currentFriends } },
      ],
    })
    .toArray(function (err, result) {
      var foundFriends = [];
      for (var i = 0; i < result.length; i++) {
        foundFriends.push({
          id: result[i]._id,
          firstName: result[i].firstName,
          lastName: result[i].lastName,
        });
      }
      response(
        {
          friends: foundFriends,
        },
        res
      );
    });
};

var handleAPIFriendsAdd = function (req, res) {
  if (req.session && req.session.user) {
    if (req.method === "POST") {
      var friendId;
      var done = function (err, result) {
        if (err) {
          error("Error updating the dat.", res);
        } else {
          response(
            {
              success: "OK",
            },
            res
          );
        }
      };
      var updateUserData = function (database, friendId) {
        var collection = database.collection("user");
        collection.update(
          { email: req.session.user.email },
          { $push: { friends: friendId } },
          done
        );
      };

      processPOSTRequest(req, function (data) {
        getDatabaseConnection(function (database) {
          updateUserData(database, data.id);
        });
      });
    } else {
      error("This method accepts only POST requests", res);
    }
  } else {
    error("You must be logged in to use this method", res);
  }
};

var handleFriends = function (req, res) {
  if (req.session && req.session.user) {
    getCurrentUser(
      function (user) {
        if (!user.friends || user.friends.length === 0) {
          return response({ friends: [] }, res);
        }
        user.friends.forEach(function (value, index, arr) {
          arr[index] = ObjectId(value);
        });
        getDatabaseConnection(function (database) {
          var collection = database.collection("user");
          collection
            .find({
              _id: { $in: user.friends },
            })
            .toArray(function (err, result) {
              result.forEach(function (value, index, arr) {
                arr[index].id = value.id;
                delete arr[index].password;
                delete arr[index].email;
                delete arr[index]._id;
              });
              response(
                {
                  friends: result,
                },
                res
              );
            });
        });
      },
      req,
      res
    );
  } else {
    error("You must be logged in to use this method", res);
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
  .add("api/friends", function (req, res) {
    handleFriends(req, res);
  })
  .add("api/friends/find", function (req, res) {
    handleFindFriends.call(this, req, res);
  })
  .add("api/friends/add", function (req, res) {
    handleAPIFriendsAdd(req, res);
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

/**
 *
 *
 * The MongoDB database provides a syntax to perform complex queries
 * We want to fetch the following:
 * The users whose first or last names match the criterie sent by the client side
 * The users who are different from the already added friends of the current user
 * The users who are different from the current user. We don't want to offer the
 * friendship of the user with their own profile
 *
 * $nin variable means value not in the provided  array
 */
