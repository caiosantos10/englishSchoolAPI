const bodyParser = require("body-parser");
const people = require("./routePeople");
const classes = require("./routeClasses");
const levels = require("./routerLevels");

module.exports = app => {
    app.use(bodyParser.json());
    app.use(people, classes, levels);
};