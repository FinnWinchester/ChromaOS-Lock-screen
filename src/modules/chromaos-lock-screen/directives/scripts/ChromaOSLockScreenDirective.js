(function(angular) {
  'use strict';

  function ChromaOSLockScreenDirective($, $timeout) {

    function ChromaOSLockScreenDirectiveLink($scope, $element, $attrs, $controller) {
      $scope.$on('chromaos-lock-screen.close', function(e, args) {
        $($element).fadeOut('fast', function() {
          $element.remove();
        });
      });
    }

    var directive = {
      restrict: 'EA',
      scope: {
        tpl: '@'
      },
      templateUrl: 'modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenDirectiveTemplate.html',
      link: ChromaOSLockScreenDirectiveLink
    };

    return directive;
  }

  angular.module('ChromaOSLockScreen.Modules.LockScreen')

  .directive('chromaosLockScreen', ChromaOSLockScreenDirective);

  ChromaOSLockScreenDirective.$inject = ['$', '$timeout'];
})(window.angular);
