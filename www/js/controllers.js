angular.module('starter.controllers', [])


.controller('ProjectsCtrl', function($scope, Projects) {
  $scope.projects = Projects.all();
 
  $scope.remove = function(project) {
    Projects.remove(project);
  }
})

.controller('ProjectDetailsCtrl', function($scope) {})



