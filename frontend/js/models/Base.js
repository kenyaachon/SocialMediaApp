var Ractive = require("ractive");
var ajax = require("../lib/Ajax");

var fetcher = function () {
  var self = this;
  ajax
    .request({
      url: self.get("url"),
      json: true,
    })
    .done(function (result) {
      self.set("value", result);
    })
    .fail(function (xhr) {
      self.fire("Error fetching ", self.get("url"));
    });
  return this;
};

var creator = function (callback) {
  var self = this;
  ajax
    .request({
      url: self.get("url"),
      method: "POST",
      data: this.get("value"),
      json: true,
    })
    .done(function (result) {
      if (callback) {
        callback(null, result);
      }
    })
    .fail(function (xhr) {
      if (callback) {
        callback(JSON.parse(xhr.responseText));
      }
    });
  return this;
};

var updater = function (callback) {
  var self = this;
  ajax
    .request({
      url: self.get("url"),
      method: this.get("value"),
      data: this.get("value"),
      json: true,
    })
    .done(function (result) {
      if (callback) {
        callback(null, result);
      }
    })
    .fail(function (xhr) {
      if (callback) {
        callback(JSON.parse(xhr.responseText));
      }
    });
  return this;
};

var deleter = function (callback) {
  var self = this;
  ajax
    .request({
      url: self.get("url"),
      method: this.get("value"),
      json: true,
    })
    .done(function (result) {
      if (callback) {
        callback(null, result);
      }
    })
    .fail(function (xhr) {
      if (callback) {
        callback(JSON.parse(xhr.responseText));
      }
    });
  return this;
};
var bindingComponent = function (component) {
  if (component) {
    this.observe(
      "value",
      function (value) {
        for (var key in value) {
          component.set(key, value[key]);
        }
      },
      { init: false }
    );
  }
  return this;
};

module.exports = Ractive.extend({
  data: {
    value: null,
    url: "",
  },
  fetch: function () {
    return fetcher();
  },
  bindComponent: function (component) {
    return bindingComponent(component);
  },
  create: function (callback) {
    return creator(callback);
  },
  save: function (callback) {
    return updater(callback);
  },
  del: function (callback) {
    return deleter(callback);
  },
});
