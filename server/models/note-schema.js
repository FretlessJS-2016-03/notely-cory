var db = require('../config/db');
var sanitizehtml = require('sanitize-html');
var htmlToText = require('html-to-text');

var NoteSchema = db.Schema({
    title: String,
    body: String,
    body_text: String,
    updated_at: {type: Date, default: Date.now }
});

NoteSchema.pre('save',function(next){
    this.updated_at = Date.now();
    this.body = sanitizehtml(this.body);
    this.body_text = htmlToText.fromString(this.body);
    next();
});

module.exports = NoteSchema;