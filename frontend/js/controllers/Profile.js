var Friends = require("../models/Friends");
//var Ractive = require("ractive");
var friendsRender = function (userModel) {
  var self = this;
  this.set(userModel.get("value"));
  this.on("updateProfile", function () {
    userModel.set("value.firstName", this.get("firstName"));
    userModel.set("value.lastName", this.get("lastName"));
    if (this.get("password") != "") {
      userModel.set("value.password", this.get("password"));
    }
    userModel.save(function (error, result) {
      if (error) {
        self.set("error", error.error);
      } else {
        self.set("error", false);
        self.set("success", "Profile updated successfully.");
      }
    });
  });
  this.on("deleteProfile", function () {
    if (confirm("Are you sure! Your account will be deleted permantely")) {
      userModel.del(function () {
        window.location.href = "/";
      });
    }
  });

  var friends = new Friends();
  friends.fetch(function (err, result) {
    self.set("friends", result.friends);
  });
};
module.exports = Ractive.extend({
  template: require("../../tpl/profile"),
  components: {
    navigation: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  //   data: {
  //     friends: [],
  //   },
  data: function () {
    return {
      friends: [],
    };
  },
  onrender: function () {
    var UserModel = require("../models/User");
    var userModel = new UserModel();
    friendsRender.call(this, userModel);
  },
});
