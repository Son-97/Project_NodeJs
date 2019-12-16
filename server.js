var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000
const sequenlize = require('./database/db')
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}))

var Users = require('./router/Users');

// sequenlize.sync({
//     force: false
// })

app.use("/users", Users);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
})