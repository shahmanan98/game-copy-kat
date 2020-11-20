// =======================
// Classic Node Packages
// =======================
global.express = require("express");
global.app = express();
global.path = require('path');

// =======================
// Environment Variables
// =======================
var PORT = 3000;

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

// ====================================
// PORT listener, server is running :)
// ====================================
app.listen(PORT, function(){
    console.log(`The server is running... at http://localhost:${PORT}/ `);
})

// ======================
// All the static files
// ======================
app.use(express.static(__dirname + '/public'));
