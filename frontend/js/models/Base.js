//var Ractive = require("ractive");
var ajax = require("../lib/Ajax");

var fetcher = function (callback) {
  var self = this;
  ajax
    .request({
      url: self.get("url"),
      json: true,
    })
    .done(function (result) {
      self.set("value", result);
      if (callback) {
        callback(null, result);
      }
    })
    .fail(function (xhr) {
      console.log(xhr.key);
      if (callback) {
        self.fire("Error fetching ", self.get("url"));
      }
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

var Setter = function (key) {
  var self = this;
  return function (value) {
    self.set(key, value);
  };
};

module.exports = Ractive.extend({
  data: {
    value: null,
    url: "",
  },
  fetch: function (callback) {
    return fetcher.call(this, callback);
  },
  bindComponent: function (component) {
    return bindingComponent.call(this, component);
  },
  create: function (callback) {
    return creator.call(this, callback);
  },
  save: function (callback) {
    return updater.call(this, callback);
  },
  del: function (callback) {
    return deleter.call(this, callback);
  },
  setter: function (key) {
    return Setter.call(this, key);
  },
});
