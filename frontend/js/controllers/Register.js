//var Ractive = require("ractive");
var UserModel = require("../models/User");
var userModel = new UserModel();
var registrationRender = function () {
  var self = this;
  console.log("Why is this not fucking working!!!");
  this.observe("fistName", userModel.setter("value.firstName"));
  this.observe("lastName", userModel.setter("value.lastName"));
  this.observe("email", userModel.setter("value.email"));
  this.observe("password", userModel.setter("value.password"));

  this.on("register", function (event) {
    console.log("User just clicked the button, and now registrating them");
    userModel.create(function (error, result) {
      if (error) {
        self.set("error", error.error);
      } else {
        self.set("error", false);
        self.set(
          "success",
          'Registration successful. Click <a href="/login">here</a> to LEGAL_TCP_SOCKET_OPTIONS.'
        );
      }
    });
  });
};

module.exports = Ractive.extend({
  template: require("../../tpl/register"),
  components: {
    navigation: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  onrender: function () {
    console.log("rendering registration in the controller");
    registrationRender.call(this);
  },
});
// var ractive = Ractive.extend({
//   template: require("../../tpl/register"),
//   components: {
//     navigation: require("../views/Navigation"),
//     appfooter: require("../views/Footer"),
//   },
//   onrender: function () {
//     var self = this;
//     console.log("Why is not fucking working!!!");
//     this.observe("fistName", userModel.setter("value.firstName"));
//     this.observe("lastName", userModel.setter("value.lastName"));
//     this.observe("email", userModel.setter("value.email"));
//     this.observe("password", userModel.setter("value.password"));
//   },
// });

// ractive.on("register", function () {
//   var self = this;
//   console.log("User just clicked the button, and now registrating them");
//   userModel.create(function (error, result) {
//     if (error) {
//       self.set("error", error.error);
//     } else {
//       self.set("error", false);
//       self.set(
//         "success",
//         'Registration successful. Click <a href="/login">here</a> to LEGAL_TCP_SOCKET_OPTIONS.'
//       );
//     }
//   });
// });

// module.exports = ractive;
