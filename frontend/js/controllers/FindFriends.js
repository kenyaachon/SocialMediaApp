//var Ractive = require("ractive");

var Friends = require("../models/Friends");
var renderFindFriends = function (model) {
  var self = this;

  this.on("find", function (e) {
    self.set("loading", true);
    self.set("message", "");
    var searchFor = this.get("friendName");
    model.find(searchFor, function (err, res) {
      if (res.friends && res.friends.length > 0) {
        self.set("foundFriends", res.friends);
      } else {
        self.set("foundfriends", null);
        self.set(
          "message",
          "Sorry, there is no friends matching <strong>" +
            searchFor +
            "<strong>"
        );
      }
      self.set("loading", false);
    });
  });
};

var renderAddFriennds = function (model) {
  this.on("add", function (e, id) {
    this.set("loading", true);
    model.add(id, function (err, res) {
      self.set("foundFriends", null);
      if (err) {
        self.set("message", "Operation failed");
      } else if (res.success === "OK") {
        self.set("message", "Operation successful");
      }
      self.set("loading", false);
    });
  });
};

module.exports = Ractive.extend({
  template: require("../../tpl/find-friends"),
  components: {
    navigatioon: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  data: {
    loading: false,
    message: "",
    searchFor: "",
    foundFriends: null,
  },
  onrender: function () {
    //rendering
    var model = new Friends();
    renderFindFriends.call(this, model);
    renderAddFriennds.call(this, model);
  },
});
