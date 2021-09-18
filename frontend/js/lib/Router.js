// this covers stirng to string matching
// but also supports dynamic parameters
// the dynamic parameters use ":id"
var checkFunction = function (f, params) {
  var fragment, vars;
  if (typeof f !== "undefined") {
    fragment = f.replace(/^\//, "");
  } else {
    fragment = this.getFragment();
  }
  for (var i = 0; i < this.routes.length; i++) {
    var match,
      path = this.routes[i].path;
    path = path.replace(/^\//, "");
    vars = path.match(/:[^\s/] +/g);
    var r = new RegExp("^" + path.replace(/:[^\s/]+/g, "([\\w-]+)"));
    match = fragment.match(r);
    if (match) {
      match.shift();
      var matchObj = {};
      if (vars) {
        for (var j = 0; j < vars.length; j++) {
          var v = vars[j];
          matchObj[v.substr(1, v.length)] = match[j];
        }
      }
      this.routes[i].handler.apply({}, (params || []).concat([matchObj]));
      return this;
    }
  }
  return false;
};

//helps to get the current URL of the browser by using the
// global window.location object
var getFragmentFunction = function () {
  var fragment = "";
  fragment = this.clearSlashes(
    decodeURI(window.location.pathname + location.search)
    //decodeURI(window.location.pathname + location.search)
  );

  fragment = fragment.replace(/\?(.*)$/, "");
  fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment;
  return this.clearSlashes(fragment);
};

//this registers routes and calls a handler function if the current URL
//matches the path
var addFunction = function (path, handler) {
  //some code
  if (typeof path === "function") {
    handler = path;
    path = "";
  }
  this.routes.push({
    path: path,
    handler: handler,
  });
  return this;
};

//removes unnecessary slashes from the beginning and end of the strinng
var clearSlashesFunction = function (path) {
  return path.toString().replace(/\/$/, "").replace(/^\//, "");
};
//allows for constant monitoring of the current browser location
var listenerFunc = function () {
  var self = this;
  var current = self.getFragment();
  var func = function () {
    if (current !== self.getFragment()) {
      current = self.getFragment();
      self.check(current);
    }
  };
  clearInterval(this.interval);
  //setInterval allows us to run func multiple times
  this.interval = setInterval(func, 50);
  return this;
};

var navigator = function (path) {
  path = path ? path : "";
  //the pushState method changes the string of the browser's address bar
  history.pushState(null, null, this.root + this.clearSlashes(path));
  return this;
};

module.exports.routes = [];
module.exports.root = "/";
module.exports.add = function (path, handler) {
  return addFunction.call(this, path, handler);
};

module.exports.check = function (fragment, params) {
  return checkFunction.call(this, fragment, params);
};

module.exports.getFragment = function () {
  return getFragmentFunction.call(this);
};

module.exports.clearSlashes = function (path) {
  return clearSlashesFunction(path);
};

module.exports.listen = function () {
  return listenerFunc.call(this);
};

module.exports.navigate = function (path) {
  return navigator.call(this, path);
};

// module.exports = function () {
//   return {
//     routes: [],
//     root: "/",
//     add: function (path, handler) {
//       //return addFunction(path, handler).call(this);
//       return addFunction.call(this, path, handler);
//     },
//     check: function (fragment, params) {
//       //regex expressions with string-to-string matching
//       // and also dynamic parameters
//       return checkFunction(fragment, params);
//     },
//     getFragment: function () {
//       return getFragmentFunction();
//     },
//     clearSlashes: function (path) {
//       return clearSlashesFunction(path);
//     },
//     listen: function () {
//       return listenerFunc.call(this);
//     },
//     navigate: function (path) {
//       return navigator(path);
//     },
//   };
// };
