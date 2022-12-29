var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
// const fileUpload = require('express-fileupload');
app.disable('etag');

// var https = require('https');
var http = require('http');
// var fs = require('fs');
// var privateKey = fs.readFileSync('./key.pem', 'utf8');
// var certificate = fs.readFileSync('./cert.pem', 'utf8');
// var credentials = { key: privateKey, cert: certificate };

// app.use(fileUpload());
var corsOptions = {
    origin: ["https://digiotouchweb.itechnolabs.tech","https://academy.digiotouch.app","http://localhost:3001", "http://localhost:3000", "https://admin-digiotouch.itechnolabs.tech"]
};
// app.use(fileUpload());
app.use(cors(corsOptions));
// app.use('/storage', express.static('storage'));

// Database Config
var dbConfig = require('./config/databaseConfig.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})
//end Database config

require('./routes/courseRoutes.js')(app);
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(4080, function () {
//     console.info("Server is listening on port 4080");
// });
// var app = http.createServer((req, res) =>{
//     console.log('connected')
// });
app.listen(8015, function () {
    console.info("Server is listening on port 8015");
});

