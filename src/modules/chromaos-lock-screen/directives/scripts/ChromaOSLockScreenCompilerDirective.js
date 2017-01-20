(function(angular) {
  'use strict';

  function ChromaOSLockScreenCompilerDirective($compile) {

    function ChromaOSLockScreenCompilerDirectiveLink($scope, $element, $attrs, $controller) {
			var compiledTemplate = $compile($scope.tpl)($scope);
			$element.replaceWith(compiledTemplate);
			$element = compiledTemplate;
    }

    var directive = {
      restrict: 'EA',
      scope: {
        tpl: '='
      },
      templateUrl: 'modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenCompilerDirectiveTemplate.html',
      link: ChromaOSLockScreenCompilerDirectiveLink
    };

    return directive;
  }

  angular.module('ChromaOSLockScreen.Modules.LockScreen')

  .directive('chromaosLockScreenCompiler', ChromaOSLockScreenCompilerDirective);

  ChromaOSLockScreenCompilerDirective.$inject = ['$compile'];
})(window.angular);
