(function() {
    angular.module('notely.notes', [
        'ui.router'
    ])
        .config(notesConfig);

    notesConfig.$inject = ['$stateProvider'];
    function notesConfig($stateProvider) {

        $stateProvider
            .state('notes', {
                url: '/notes',
                //template: '<h1> Notely</h1> <p> {{ message }} </p><div ui-view></div>',
                templateUrl: '/notes/notes.html',
                controller: NotesController,
                resolve: {
                    notesLoaded: function(NotesService) {
                        return NotesService.fetch();
                    }
                }
            })

            .state('notes.form', {
                url: '/:noteId',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });
    }

    NotesController.$inject = ['$state', '$scope', 'NotesService'];
    function NotesController($state, $scope, NotesService) {
        $scope.note = {};
        $scope.notes = NotesService.getNotes();
        $scope.note = NotesService.findById($state.params.noteId);
        $state.go('notes.form');
        $scope.clearForm = function() {
            $scope.note = {};
        };
    }
    NotesFormController.$inject = ['$scope', '$state', 'NotesService'];
    function NotesFormController($scope, $state, NotesService) {
        $scope.note = NotesService.findById($state.params.noteId);
        $scope.save = function() {
            if ($scope.note._id){
                NotesService.transfigure($scope.note);
            }
            else {
                NotesService.create($scope.note);
            }
        };
    }
})();