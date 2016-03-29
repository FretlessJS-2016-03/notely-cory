var express = require('express');
var app = express();

app.get('/', function(request, response){
    response.send('I <3 Express!!!!!');
})
.listen(3030, function(){
    console.log("Listening on 3030 suckah");
});