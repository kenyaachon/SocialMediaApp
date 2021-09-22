//var Ractive = require("ractive");
var UserModel = require("../models/User");
var userModel = new UserModel();
var registrationRender = function () {
  var self = this;
  console.log("Why is this not fucking working!!!");
  this.observe("firstName", userModel.setter("value.firstName"));
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
  // template: require("../../tpl/register"),
  template: `
  <header>
  <navigation></navigation>
</header>
  <div class="hero">
  <h1>Register</h1>
</div>
<form>
  {{#if error && error != ''}}
  <div class="error">{{error}}</div>
  {{/if}} {{#if success && success != ''}}
  <div class="success">{{{success}}}</div>
  {{else}}
  <label for="firstName">First name</label>
  <input type="text" id="firstName" value="{{firstName}}" />
  <label for="lastName">Last name</label>
  <input type="text" id="lastName" value="{{lastName}}" />
  <label for="email">Email</label>
  <input type="text" id="email" value="{{email}}" />
  <label for="password">Password</label>
  <input type="password" id="password" value="{{password}}" />
  <button
    class="green-button"
    type="button"
    value="register"
    on-click="register"
  >
    Register
  </button>
  {{/if}}
</form>
<appfooter />`,
  components: {
    navigation: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  onrender: function () {
    console.log("rendering registration in the controller");
    registrationRender.call(this);
  },
});
