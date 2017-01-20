angular.module('myapp', ['ChromaOSLockScreen'])

.controller('ChromaOSController', ['$scope', 'ChromaOSLockScreenService', function($scope, ChromaOSLockScreenService) {

  $scope.lockScreen = function() {
    ChromaOSLockScreenService.$lock();
  };

}]);
