var express = require('express');
var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function(request, response) {
    response.json(
        [
            {
                title: "My cool note",
                body: "Cool isn't it?"
            },
            {
                title: "Whatevs",
                body: "Dawson's Creek"
            },
            {
                title: "Note #3",
                body: "Even more text for note #3"
            },
            {
                title: "Note #4",
                body: "Even more text for note #4. TEEEEXXXT"
            }
        ]

    );
})
    .listen(3030, function() {
        console.log("Listening on 3030 suckah");
    });