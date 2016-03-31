(function() {
    angular.module('notely')
    .service('NotesService', NotesService);
    NotesService.$inject = ['$http'];
    function NotesService($http) {
        var _this = this;
        _this.notes = [];
        _this.create = function(note) {
            return $http.post('http://localhost:3030/notes', {
                note: note
            })
        .then(function(response) {
            _this.notes.unshift(response.data.note);
        });
        };
        _this.fetch = function() {
            return $http.get('http://localhost:3030/notes')
        .then(function(response) {
            _this.notes = response.data;
        },
        function(response) {
            console.log('That sucks: ' + response);
        });
        };
        _this.getNotes = function() {
            return _this.notes;
        };
        _this.findById = function(id){
            for(var i = 0; i < _this.notes.length; i++){
                if(_this.notes[i]._id === id){
                    return angular.copy(_this.notes[i]);
                }      
            }
            return {};
        };
        _this.replaceNote = function(updatedNote){
            for(var i = 0; i < _this.notes.length; i++){
                if(_this.notes[i]._id ===updatedNote._id){
                    // _this.notes[i] = updatedNote;
                    _this.notes.splice(i,1,updatedNote);
                }
            } 
        };
        _this.deleteNote = function(noteToDelete){
            for(var i = 0; i < _this.notes.length; i++){
                if(_this.notes[i]._id ===noteToDelete._id){
                    _this.notes.splice(i,1);
                }
            } 
        };
        _this.transfigure = function(note){
            $http.put('http://localhost:3030/notes/' + note._id, {
                note: {
                    title: note.title,
                    body: note.body
                }
            })
            .then(function(response) {
                _this.replaceNote(response.data.note);
            });
            
        };
        _this.remove = function(note){
            $http.delete('http://localhost:3030/notes/' + note._id)
           .then(function(response){
               _this.deleteNote(response.data.note);
           });
        };
    }
})();