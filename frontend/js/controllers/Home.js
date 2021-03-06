//var Ractive = require("ractive");
module.exports = Ractive.extend({
  // template: require("../../tpl/home"),
  template: `
  <header>
  <navigation></navigation>
</header>
<div class="hero">
  {{#if posting === true}}
    <form enctype="multipart/form-data" method="post">
      <h3>What is on your mind?</h3>
      {{#if error && error != ''}}
        <div class="error">{{error}}</div>
      {{/if}}
      {{#if success && success != ''}}
        <div class="success">{{{success}}}</div>
      {{/if}}
      <label for="text">Text</label>
      <textarea value="{{text}}"></textarea>
      <input type="file" name="file" />
      <input type="button" value="Post" on-click="post" />
    </form>
    {{#each posts:index}}
      <div class="content-item">
        <h2>{{posts[index].userName}}</h2>
        {{posts[index].text}}
        {{#if posts[index].file}}
        <br /><br />
        <img src="/static/uploads/{{posts[index].file}}" />
        {{/if}}
      </div>
    {{/each}}
  {{else}}
    <h1>Social Media App</h1>
  {{/if}}
</div>
<appfooter />`,
  components: {
    navigation: require("../views/Navigation"),
    appfooter: require("../views/Footer"),
  },
  onrender: function () {
    console.log("Home page rendered");
  },
});
