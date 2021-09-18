//var Ractive = require("ractive");
var UserModel = require("../models/User");

console.log("Just rendering the navigation");
var checkIfLogged = function () {
  var userModel = new UserModel();
  this.data.isLogged = userModel.isLogged();
};
module.exports = Ractive.extend({
  template: require("../../tpl/navigation"),
  onconstruct: function () {
    checkIfLogged.call(this);
  },
});
