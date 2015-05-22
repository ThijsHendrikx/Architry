angular.module('starter.services', [])

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var projects = [{
    id: 0,
    title: 'Project 1',
    description: 'A nice project',
    tumbnail: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    views:[
      {
        viewId:0,
        title:"Restaurant",
        imgLeftUrl:'',
        imgRightUrl:''
      },
      {
        viewId:1,
        title:"Terras",
        imgLeftUrl:'',
        imgRightUrl:''
      }
    ]
  }, {
    id: 1,
    title: 'Project 2',
    desciption: 'A cool project',
    thumbnail: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    views:[
      {
        viewId:0,
        title:"Supermarkt",
        imgLeftUrl:'',
        imgRightUrl:''
      },
      {
        viewId:1,
        title:"Terras",
        imgLeftUrl:'',
        imgRightUrl:''
      }
    ]
  },{
    id: 2,
    title: 'Project 3',
    desciption: 'A awesome project',
    thumbnail: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    views:[
      {
        viewId:0,
        title:"Winkels",
        imgLeftUrl:'',
        imgRightUrl:''
      }
    ]
  }];

  return {
    all: function() {
      return projects;
    },
    remove: function(project) {
      projects.splice(projects.indexOf(project), 1);
    },
    get: function(projectId) {
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === parseInt(projectId)) {
          return projects[i];
        }
      }
      return null;
    },
    add: function(projectCode){
      projects.push({id:99,title:"New project",desciption:"Whutt",thumbnail:"https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg"})
    }
  };
})


.factory('Simulator', function() {

  var translationLeft = null;
  var translationRight = null;

  var rotationLeft = null;
  var rotationRight = null;

  var currentRotation = 0;
  var currentTranslation = 0;

  var translationWidth = 0;

  return{

    start:function(){

        var rotationLeft  = document.querySelector(".imgleft .rotationWrapper"); 
        var rotationRight = document.querySelector(".imgright .rotationWrapper");

        var translationLeft  = rotationLeft.querySelector(".translationWrapper");
        var translationRight = rotationRight.querySelector(".translationWrapper");

        var translationWidth = translationLeft.offsetWidth;

        if (window.DeviceOrientationEvent) {
    
          window.addEventListener('deviceorientation', function(eventData) {

              var tiltLR = eventData.gamma;
              var tiltFB = eventData.beta;
              var dir = eventData.alpha;

              var normalizedRotation = tiltFB;
              var normalizedTranslation = dir;

              if( Math.abs(dir - currentTranslation) > 320){
                normalizedTranslation = dir;
              }

              rotationLeft.style.webkitTransform = "rotate(" + - normalizedRotation + "deg)";
              rotationRight.style.webkitTransform = "rotate("+ - normalizedRotation + "deg)";


              translationLeft.style.marginLeft =  Math.round( ((360 - normalizedTranslation) / 360) * - (translationWidth / 2) ) + "px";
              translationRight.style.marginLeft = Math.round( ((360 - normalizedTranslation) / 360) * - (translationWidth / 2) ) + "px";
 
              showDebugInfo(el,tiltLR,tiltFB,dir);

          }, false);
        
        } else {
          document.getElementById("doEvent").innerHTML = "Not supported."
        }
     
    },

    showDebugInfo:function(el,tiltLR,tiltFB,dir){

      el.querySelector("#debug").style.display = "block";

      el.querySelector("#doTiltLR").innerHTML = Math.round(tiltLR);
      el.querySelector("#doTiltFB").innerHTML = Math.round(tiltFB); 
      el.querySelector("#doDirection").innerHTML = Math.round(dir);

    }

  }


});

