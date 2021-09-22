//var Ractive = require("ractive");
var UserModel = require("../models/User");

console.log("Just rendering the navigation");
var checkIfLogged = function () {
  var userModel = new UserModel();
  this.data.isLogged = userModel.isLogged();
};
module.exports = Ractive.extend({
  // template: require("../../tpl/navigation"),

  template: `
  <nav>
  <ul>
    <li><a on-click="goto:home">Home</a></li>
    {{#if !isLogged}}
    <li><a on-click="goto:register">Register</a></li>
    <li><a on-click="goto:login">Login</a></li>
    {{else}}
    <li class="right"><a on-click="goto:logout">Logout</a></li>
    <li class="right"><a on-click="goto:profile">Profile</a></li>
    <li class="right"><a on-click="goto:find-friends">Find friends</a></li>
    {{/if}}
  </ul>
</nav>`,
  onconstruct: function () {
    checkIfLogged.call(this);
  },
});
