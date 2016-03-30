(function() {
    angular.module('notely')
    .service('NotesService', NotesService);
    NotesService.$inject = ['$http'];
    function NotesService($http) {
        var _this = this;
        _this.notes = [];
        _this.fetch = function() {
            return $http.get('http://localhost:3030')
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