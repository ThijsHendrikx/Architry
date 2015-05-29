angular.module('starter.controllers', [])


.controller('ProjectsCtrl', function($scope, $http, Projects) {
  
  $scope.projects = Projects.all();

  $scope.projectCode = "";
 
  $scope.remove = function(project) {
    Projects.remove(project);
  }

  $scope.addProject = function(projectCode){

  	var postData = {code:projectCode};

  	$http.post('http://i281998.iris.fhict.nl/architry/getproject.php', postData)

  		.success(function (data) {
  			if(data.message == "success"){
            alert(data.message)
        		Projects.add(data.data);
        	}
        })

        .error(function(data){
        	alert( "failure message: " + JSON.stringify({data: data}));
        });
  	}

})





.controller('ProjectDetailsCtrl', function($scope, $stateParams, Projects) {
  $scope.project = Projects.get($stateParams.projectId);
})





.controller('VRViewerCtrl', function($scope, $ionicHistory,Simulator) {

  screen.lockOrientation('landscape-secondary');

	if(window.orientation == 90 && !Simulator.active){
		Simulator.start();
	}

	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		window.addEventListener("orientationchange", orientationChange, true);

    function orientationChange(e) {
    	if(window.orientation == 90  && !Simulator.active){
	     	Simulator.start();
	   }
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




