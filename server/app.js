var express = require('express');
var app = express();
var notes = [
    {
        "title": "My cool note",
        "body": "Cool isn't it?"
    },
    {
        "title": "Whatevs",
        "body": "Dawson's Creek"
    }
]

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
            }
        ]

    );
})
    .listen(3030, function() {
        console.log("Listening on 3030 suckah");
    });