const bodyParser = require("body-parser");
const people = require("./routePeople");

module.exports = app => {
    app.use(bodyParser.json());
    app.use(people);
};