var FooterModel = require("../models/Version");
var Ractive = require("ractive");

module.exports = Ractive.extennd({
  template: require("../../tpl/footer"),
  onrender: function () {
    var model = new FooterModel();
    model.bindComponent(this).fetch();
  },
});
