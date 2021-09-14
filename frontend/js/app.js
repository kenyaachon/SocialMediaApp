var Router = require('./lib/Router');
var Home = require('./controllers/Home');
var currentPage;
var body;

var showPage = function(newPage) {
    if(currentPage) {
        currentPage.teardown();
    }
    currentPage = newPage;
    body.innerHTML = '';
    currentPage.render(body);
    currentPage.on('navigation.goto', function(e, route) {
        Router.navigate(route);
    });
}
//ensure our Javascript isn't run until
//resources of the page are fully loaded
window.onload() = function() {
    Routera
    .add('home', function() {
        var page = new Home();
        showPage(p);
    })
    .add(function() {
        Router.navigate('home');
    })
    .listen()
    .check();
}
