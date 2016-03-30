(function(){
    angular.module('notely.notes', [
        'ui.router'
    ])
        .config(notesConfig);
    
    notesConfig.$inject = ['$stateProvider'];
    function notesConfig($stateProvider){
        
        $stateProvider
            .state('notes', {
                url: '/notes',
                //template: '<h1> Notely</h1> <p> {{ message }} </p><div ui-view></div>',
                templateUrl: '/notes/notes.html',
                controller: NotesController
            })
            
            .state('notes.form', {
                url: '/:noteId',
                templateUrl: '/notes/notes-form.html' 
            });
    }
    
    NotesController.$inject = ['$state', '$scope', 'NotesService'];
    function NotesController($state, $scope, NotesService){
        NotesService.fetch(function(){
            $scope.notes = NotesService.getNotes();
        });
        $state.go('notes.form');
    }
})();