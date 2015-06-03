angular.module('starter.services', [])

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var projects = [{
    id: 0,
    title: 'Project 1',
    desciption: 'A nice project Getting Started. R is a free software environment for statistical computing and graphics. It compiles and runs on a wide ',
    thumbnail: './img/project1.jpg',
    views:[
      {
        viewId:0,
        title:"1. Restaurant",
        imgLeftUrl:'',
        imgRightUrl:''
      },
      {
        viewId:1,
        title:"2. Terras",
        imgLeftUrl:'',
        imgRightUrl:''
      }
    ]
  }, {
    id: 1,
    title: 'Project 2',
    desciption: 'A cool project Getting Started. R is a free software environment for statistical computing and graphics. It compiles and runs on a wide ',
    thumbnail: './img/project1.jpg',
    views:[
      {
        viewId:0,
        title:"1. Supermarkt",
        imgLeftUrl:'',
        imgRightUrl:''
      },
      {
        viewId:1,
        title:"2. Terras",
        imgLeftUrl:'',
        imgRightUrl:''
      }
    ]
  },{
    id: 2,
    title: 'Project 3',
    desciption: 'A awesome project Getting Started. R is a free software environment for statistical computing and graphics. It compiles and runs on a wide',
    thumbnail: '../img/project1.jpg',
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
      projects.push({id:99,title:"New project", desciption:"Whutt", thumbnail:"https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg"})
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

      //Scenes
      var sceneRTTLeft = new THREE.Scene();
      var sceneRTTRight = new THREE.Scene();

      var scene = new THREE.Scene();


      //Cameras
      var cameraRTTLeft = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);
      var cameraRTTRight = new THREE.PerspectiveCamera( 90, (window.innerWidth / 2) / window.innerHeight,1, 1000);

      var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );

      //Renderer
      var renderer = new THREE.WebGLRenderer({clearColor:0x888888,antialias:true});
      renderer.setSize( window.innerWidth, window.innerHeight );
     
      document.querySelector(".simulator").appendChild( renderer.domElement );



      //Geometry
      var sphereGeometry = new THREE.SphereGeometry( 20, 32, 32 );
      var planeGeometry = new THREE.PlaneGeometry( window.innerWidth / 2, window.innerHeight );

      

      //Textures
      var textureRTTLeft = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );
      var textureRTTRight = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );



      //Materials
      var materialRTTLeft = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: THREE.ImageUtils.loadTexture('img/scene1_left.jpg')
      });

      var materialRTTRight = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: THREE.ImageUtils.loadTexture('img/scene1_right.jpg')
      });

     var materialLeft =  new THREE.MeshBasicMaterial({map:textureRTTLeft} );
     var materialRight = new THREE.MeshBasicMaterial({map:textureRTTRight} );



      //Meshes
      var sphereLeft  = new THREE.Mesh( sphereGeometry, materialRTTLeft );
      var sphereRight = new THREE.Mesh( sphereGeometry, materialRTTRight );

      var planeLeft  = new THREE.Mesh( planeGeometry, materialLeft );
      var planeRight = new THREE.Mesh( planeGeometry, materialRight );
      

      sceneRTTLeft.add(  sphereLeft );
      sceneRTTRight.add( sphereRight );

      scene.add(planeLeft);
      scene.add(planeRight);


      camera.position.z = 5;


      planeLeft.position.x = -window.innerWidth / 4;
      planeRight.position.x = -window.innerWidth / -4;


      controlsLeft = new DeviceOrientationController( cameraRTTLeft, renderer.domElement );
      controlsLeft.connect();  

      controlsLeft.enableManualZoom = false;     

      controlsRight = new DeviceOrientationController( cameraRTTRight, renderer.domElement );
      controlsRight.connect();     

      controlsRight.enableManualZoom = false;
      
 

      var render = function () {
        requestAnimationFrame( render );

        controlsLeft.update();
        controlsRight.update();

        renderer.render(sceneRTTLeft, cameraRTTLeft,textureRTTLeft,true);

        renderer.render(sceneRTTRight, cameraRTTRight,textureRTTRight,true);

        renderer.render(scene,camera);
      };

      render();
     
    }


  }


});

