var Base = require("./Base");
var ajax = require("../lib/Ajax");

const loginUser = function (callback) {
  ajax
    .request({
      url: this.get("url") + "/login",
      method: "POST",
      data: {
        email: this.get("email"),
        password: this.get("password"),
      },
      json: true,
    })
    .done(function (result) {
      callback(null, result);
    })
    .fail(function (xhr) {
      callback(JSON.parse(xhr.responseText));
    });
};

//if a user is logged in, we return what is store in
// the session object
var isLoggedIn = function () {
  return this.get("value.firstName") && this.get("value.lastName");
};

module.exports = Base.extend({
  data: {
    url: "/api/user",
  },
  login: function (callback) {
    loginUser.call(this, callback);
  },
  isLogged: function () {
    return isLoggedIn.call(this);
  },
});
