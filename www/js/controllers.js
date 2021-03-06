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


.controller('VRViewerCtrl', function($scope, $ionicHistory,Simulator) {

	Simulator.start();

	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
        if ('orientation' in screen) {
		   screen.lockOrientation('landscape-secondary');
		}

		window.plugins.insomnia.keepAwake()
    });
    $scope.$on('$ionicView.unloaded', function (viewInfo, state) {
        if ('orientation' in screen) {
		    screen.unlockOrientation();
		}

		window.plugins.insomnia.allowSleepAgain()
    });


 
    $scope.quit = function(event)  {
	   $ionicHistory.goBack();
	 
	
	}




})

.directive('detectGestures', function($ionicGesture) {
  return {

    restrict :  'A',

    link : function(scope, elem, attrs) {

        $ionicGesture.on('doubletap', scope.quit, elem);

    }
  }
})




