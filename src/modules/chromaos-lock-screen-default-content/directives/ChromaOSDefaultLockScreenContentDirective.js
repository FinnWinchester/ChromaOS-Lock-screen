(function(angular) {

  function ChromaOSDefaultLockScreenContentDirective(ChromaOSLockScreenService, $) {

    function ChromaOSDefaultLockScreenContentDirectiveLink($scope, $element) {
      $element.addClass('chromaos-default-lock-screen-content-wrapper');
      $scope.unlockScreenOk = function() {
        ChromaOSLockScreenService.$unlock();
      };
      $scope.unlockScreenKo = function() {
        $($element).effect('shake');
      };
    }

    var directive = {
      restrict: 'A',
      scope: {},
      templateUrl: 'modules/chromaos-lock-screen-default-content/directives/ChromaOSDefaultLockScreenContentDirectiveTemplate.html',
      link: ChromaOSDefaultLockScreenContentDirectiveLink
    };

    return directive;

  }

  angular.module('ChromaOSLockScreen.Modules.DefaultLockScreenContent')

  .directive('chromaosDefaultLockScreenContent', ChromaOSDefaultLockScreenContentDirective);

  ChromaOSDefaultLockScreenContentDirective.$inject = ['ChromaOSLockScreenService', '$'];

})(window.angular);
