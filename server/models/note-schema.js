var db = require('../config/db');

var NoteSchema = db.Schema({
  title: String,
  body: String
});

module.exports = NoteSchema