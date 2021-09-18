var Router = require("./lib/Router");
var Home = require("./controllers/Home");
var Register = require("./controllers/Register");

var Login = require("./controllers/Login");
var UserModel = require("./models/User");
var Profile = require("./controllers/Profile");
var FindFriends = require("./controllers/FindFriends");
//const User = require("./models/User");
var currentPage;
var body;

var showPage = function (newPage) {
  if (currentPage) {
    currentPage.teardown();
  }
  currentPage = newPage;
  console.log("changing to the next website");
  body.innerHTML = "trying to render another page";
  currentPage.render(body);
  currentPage.on("navigation.goto", function (e, route) {
    Router.navigate(route);
  });
  window.currentPage = currentPage;
};

var renderProfile = function (userModel) {
  if (userModel.isLogged()) {
    var p = new Profile();
    showPage(p);
  } else {
    Router.navigate("login");
  }
};

var findFriends = function (userModel) {
  if (userModel.isLogged()) {
    var page = new FindFriends();
    showPage(page);
  } else {
    Router.navigate("login");
  }
};

var logoutUser = function (userModel) {
  userModel.logout(function (error, result) {
    console.log(error);
    window.location.href = "/";
  });
};
//ensure our Javascript isn't run until
//resources of the page are fully loaded

// const Window = require("window");
// const { window } = new Window();

// const { readyState } = require("ready-state");
// readyState.window.then((state) => {

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM(``, { runScripts: "outside-only" });

// const { readyState } = require("ready-state");

window.onload = function () {
  // readyState.load.then((state) => {
  console.log("window just loaded");

  body = document.querySelector("body .container");
  var userModel = new UserModel();
  userModel.fetch(function (error, result) {
    //..router setting

    if (error) {
      console.error(error);
    }
    Router.add("home", function () {
      var page = new Home();
      showPage(page);
    })
      .add("register", function () {
        var page = new Register();
        //var page = Register.onrender();
        showPage(page);
      })
      .add("login", function () {
        var page = new Login();
        showPage(page);
      })
      .add("find-friends", function () {
        findFriends(userModel);
      })
      .add("logout", function () {
        logoutUser.call(this, userModel);
      })
      .add("profile", function () {
        renderProfile(userModel);
      })
      .add(function () {
        Router.navigate("home");
      })
      .listen()
      .check();
  });
};
// });

// var userModel = new UserModel();
// userModel.fetch(function (error, result) {
//   //..router setting
//   console.log("fetching some data");
//   Router.add("home", function () {
//     var page = new Home();
//     showPage(page);
//   })
//     .add("register", function () {
//       await sleep(1000);
//       var page = new Register();
//       showPage(page);
//     })
//     .add("login", function () {
//       await sleep(1000);
//       var page = new Login();
//       showPage(page);
//     })
//     .add("find-friends", function () {
//       findFriends(userModel);
//     })
//     .add("logout", function () {
//       logoutUser.call(this, userModel);
//     })
//     .add("profile", function () {
//       renderProfile(userModel);
//     })
//     .add(function () {
//       Router.navigate("home");
//     })
//     .listen()
//     .check();
// });

// window.onload() = function() {

//     // the global userModel instance that is used all over
//     //the application
//     //userModel function extends the base model where fetch method
//     //puts the response from the server in the value property of the model
//     var userModel = new UserModel();
//     userModel.fetch(function(error, result) {
//         //..router setting
//         Router
//         .add('home', function() {
//             var page = new Home();
//             showPage(p);
//         })
//         .add('register', function() {
//             var page = new Register();
//             showPage(p);
//           })
//           .add('login', function() {
//             var page = new Login();
//             showPage(page);
//           })
//           .add('find-friends', function() {
//             findFriends(userModel);
//           })
//           .add('logout', function() {
//             logoutUser.call(this, userModel);
//           })
//         .add('profile', function() {
//             renderProfile(userModel);
//           })
//         .add(function() {
//             Router.navigate('home');
//         })
//         .listen()
//         .check();
//     })
// };
