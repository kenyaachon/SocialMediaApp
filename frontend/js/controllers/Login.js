//var Ractive = require("ractive");
var UserModel = require("../models/User");
var userModel = new UserModel();
const render = function () {
  var self = this;
  this.observe("email", userModel.setter("email"));
  this.observe("password", userModel.setter("password"));
  this.on("login", function () {
    userModel.login(function (error, result) {
      if (error) {
        self.set("error", error.error);
      } else {
        self.set("error", false);
        //redirecting the user to the home page
        window.location.href = "/";
      }
    });
  });
};

module.exports = Ractive.extend({
  // template: require("../../tpl/login"),
  template: `<header>
  <navigation></navigation>
</header>
<div class="hero">
  <h1>Login</h1>
</div>
<form>
  {{#if error && error != ''}}
  <div class="error">{{error}}</div>
  {{/if}} {{#if success && success != ''}}
  <div class="success">{{{success}}}</div>
  {{else}}
  <label for="email">Email</label>
  <input type="text" id="email" value="{{email}}" />
  <label for="password">Password</label>
  <input type="password" id="password" value="{{password}}" />
  <button
    class="green-button"
    type="button"
    value="login"
    on-click="login"
  ></button>
  <!-- <input class="green-button" type="button" value="login" on-click="login" /> -->
  {{/if}}
</form>
<appfooter />`,
  components: {
    navigation: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  onrender: function () {
    console.log("rendering Login page");
    render.call(this);
  },
});
