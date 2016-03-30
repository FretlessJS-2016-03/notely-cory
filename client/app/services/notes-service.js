(function() {
    angular.module('notely')
    .service('NotesService', NotesService);
    NotesService.$inject = ['$http'];
    function NotesService($http) {
        var _this = this;
        _this.notes = [];
        _this.create = function(note){
            return $http.post('http://localhost:3030/notes', {
                note: note
            })
              .then(function(response){
                  _this.notes.unshift(response.data.note);
              });
        };
        _this.fetch = function() {
            return $http.get('http://localhost:3030/notes')
              .then(function(response) {
                  _this.notes = response.data;
                  console.log(response);
              },
              function(response){
                  console.log('That sucks: ' + response);
              });
        };
        _this.getNotes = function() {
            return _this.notes;
        };
    }
})();