angular.module('starter.controllers', [])


.controller('ProjectsCtrl', function($scope, Projects) {
  $scope.projects = Projects.all();
 
  $scope.remove = function(project) {
    Projects.remove(project);
  }

  $scope.add = function(code){
  	Projects.add(code);
  }

})

.controller('ProjectDetailsCtrl', function($scope, $stateParams, Projects) {
  $scope.project = Projects.get($stateParams.projectId);
})


.controller('VRViewerCtrl', function($scope, $stateParams,Simulator) {

	Simulator.start();

	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
        if ('orientation' in screen) {
		    screen.lockOrientation('landscape');
		}

		ionic.Platform.fullScreen(true, false); 

    });



    $scope.$on('$ionicView.unloaded', function (viewInfo, state) {
        if ('orientation' in screen) {
		    screen.unlockOrientation();
		}

		ionic.Platform.fullScreen(false, true);
    });

})




