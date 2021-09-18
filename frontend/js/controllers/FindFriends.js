//var Ractive = require("ractive");

module.exports = Ractive.extend({
  template: require("../../tpl/find-friends"),
  components: {
    navigatioon: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  data: {
    loading: false,
    message: "",
    searchFor: "",
    foundFriends: null,
  },
  onrender: function () {
    //rendering
  },
});
