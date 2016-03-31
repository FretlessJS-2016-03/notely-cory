require('dotenv').load();
var express = require('express');
var notelyServerApp = express();
var Note = require('./models/note');
var bodyParser = require('body-parser');

notelyServerApp.use(bodyParser.json());

// Cross-Origin Resource Sharing (CORS) middleware
notelyServerApp.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

notelyServerApp.get('/notes', function(req, res) {
    Note.find().sort({updated_at: 'desc'}).then(function(notes) {
        res.json(notes);
    });
});

notelyServerApp.post('/notes', function(req, res) {
    var note = new Note({
        title: req.body.note.title,
        body: req.body.note.body
    });
    note.save().then(function(noteData) {
        res.json({
            message: 'Saved!',
            note: noteData
        });
    });
});

notelyServerApp.put('/notes/:noteId', function(req, res){
    Note.findOne({_id: req.params.noteId}).then(function(note){
        note.title = req.body.note.title;
        note.body = req.body.note.body;
        note.save().then(function() {
            res.json({
                message: 'Saved!',
                note: note
            });
        });        
    });
    
});

notelyServerApp.delete('/notes/:noteId', function(req, res){
    Note.findOne({_id: req.params.noteId}).then(function(note){
        note.remove({_id: note._id}).then(function() {
            res.json({
                message: 'Deleted!',
                note: note
            });
        });        
    });
    
});

notelyServerApp.listen(3030, function() {
    console.log('Listening on http://localhost:3030');
});