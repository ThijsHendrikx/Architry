angular.module('starter.services', [])

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var projects = [{
    id: 0,
    title: 'Project 1',
    description: 'A nice project',
    tumbnail: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    title: 'Project 2',
    desciption: 'A cool project',
    thumbnail: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    title: 'Project 3',
    desciption: 'A awesome project',
    thumbnail: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
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
    }
  };
});
