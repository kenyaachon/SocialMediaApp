var getParams = function (data, url) {
  var arr = [],
    str;
  for (var name in data) {
    arr.push(name + "=" + encodeURIComponent(data[name]));
  }
  str = arr.join("&");
  if (str != "") {
    return url ? (url.indexOf("?") < 0 ? "?" + str : "&" + str) : str;
  }
  return "";
};

var handleProcess = function (ops) {
  var self = this;
  this.xhr = null;
  if (window.ActiveXObject) {
    this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    console.log("hello is the XMLHttpReqest");
    this.xhr = new XMLHttpRequest();
  }
  if (this.xhr) {
    this.xhr.onreadystatechange = function () {
      if (self.xhr.readyState == 4 && self.xhr.status == 200) {
        var result = self.xhr.responseText;
        if (ops.json === true && typeof JSON != "undefined") {
          result = JSON.parse(result);
        }
        self.doneCallback &&
          self.doneCallback.apply(self.host, [result, self.xhr]);
      } else if (self.xhr.readyState == 4) {
        // console.log("calling the failback callback");
        self.failCallback && self.failCallback.apply(self.host, [self.xhr]);
      }
      self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.xhr]);
    };
  }
  if (ops.method == "get") {
    this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
  } else {
    if (ops.formData) {
      this.xhr.open(ops.method, ops.url);
    } else {
      this.xhr.open(ops.method, ops.url, true);
      this.setHeaders({
        "X-Requested-With": "XMLHttpRequest",
        "Content-type": "application/x-www-form-urlencoded",
      });
    }
  }
  if (ops.headers && typeof ops.headers == "object") {
    this.setHeaders(ops.headers);
  }
  setTimeout(function () {
    if (ops.formData) {
      self.xhr.send(ops.formData);
    } else {
      ops.method == "get"
        ? self.xhr.send()
        : self.xhr.send(getParams(ops.data));
    }
  }, 20);
  return this;
};

var handleSetHeaders = function (headers) {
  for (var name in headers) {
    this.xhr && this.xhr.setRequestHeader(name, headers[name]);
  }
};

module.exports = {
  request: function (ops) {
    if (typeof ops == "string") ops = { url: ops };
    ops.url = ops.url || "";
    ops.method = ops.method || "get";
    ops.data = ops.data || {};

    var api = {
      host: {},
      process: function (ops) {
        console.log("handling the process call for ajax");
        return handleProcess.call(this, ops);
      },
      done: function (callback) {
        this.doneCallback = callback;
        return this;
      },
      fail: function (callback) {
        this.failCallback = callback;
        return this;
      },
      always: function (callback) {
        this.alwaysCallback = callback;
        return this;
      },
      setHeaders: function (headers) {
        console.log("settings the headers for ajax");
        handleSetHeaders.call(this, headers);
      },
    };
    return api.process(ops);
  },
};
