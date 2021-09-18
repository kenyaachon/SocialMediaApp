var ajax = require("../lib/Ajax");
var Base = require("./Base");

var findFriendsFunc = function (searchFor, callback) {
  ajax
    .request({
      url: this.get("url") + "/find",
      method: "POST",
      data: {
        searchFor: searchFor,
      },
      json: true,
    })
    .done(function (result) {
      callback(null, result);
    })
    //xhr is XMLHttpRequest
    .fail(function (xhr) {
      callback(JSON.parse(xhr.responseText));
    });
};

var addFriendsFunc = function (id, callback) {
  ajax
    .request({
      url: this.get("url") + "/add",
      method: "POST",
      data: {
        id: id,
      },
      json: true,
    })
    .done(function (result) {
      callback(null, result);
    })
    //xhr is XMLHttpRequest
    .fail(function (xhr) {
      callback(JSON.parse(xhr.responseText));
    });
};

module.exports = Base.extend({
  data: {
    url: "/api/friends",
  },
  find: function (searchFor, callback) {
    findFriendsFunc(searchFor, callback);
  },
  add: function (id, callback) {
    addFriendsFunc(id, callback);
  },
});
