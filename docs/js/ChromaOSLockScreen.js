/* global $:false */
(function(angular) {
  'use strict';

  function runFunction() {
    // $(document).keydown(function(event) {
    //   if (event.keyCode === 123 || event.which === 123) {
    //     return false;
    //   } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
    //     return false; //Prevent from ctrl+shift+i
    //   }
    // });

    $(document).ready(function() {
      $(document).on('contextmenu', function() {
        return false;
      });
    });
  }

  angular.module('ChromaOSLockScreen.Kernel', [])

  .constant('$', $)

  .run(runFunction);

  runFunction.$inject = [];

})(window.angular);
;(function(angular) {
  'use strict';

  angular.module('ChromaOSLockScreen.Services', []);

})(window.angular);
;(function(angular) {
  'use strict';

  function ChromaOSLockScreenService($compile, $rootScope, $) {

    var lockScreenTemplate = '<div chromaos-lock-screen tpl="__lock_screen_tpl__"></div>';
    var lockScreenContentDefaultTemplate = '<div chromaos-default-lock-screen-content></div>';
    var lockScreenLocked = false;
    var lockScreenScope;

    var prepareLockScreen = function(template) {
      var prepared = lockScreenTemplate
        .replace('__lock_screen_tpl__', template);
      return prepared;
    };

    var $lock = function(template, args) {
      lockScreenScope = $rootScope.$new(true);
			if(!template) {
				template = lockScreenContentDefaultTemplate;
			}
      var renderedApp = $compile(prepareLockScreen(template))(lockScreenScope, function(a, b, c) {
        setTimeout(function() {
          var finalArgs = {};
          var renderedHtml = $(a[0]);
          $('body').append(a[0]);
          if (args) {
            angular.extend(finalArgs, args);
          }
          lockScreenScope.$broadcast('chromaos-lock-screen.opened', finalArgs);
          lockScreenScope.$apply();
          lockScreenLocked = true;
        }, 0);
      });
    };

    var $unlock = function() {
      lockScreenScope.$broadcast('chromaos-lock-screen.close', {});
      lockScreenScope.$destroy();
      lockScreenLocked = false;
    };

    var $isLocked = function() {
      return lockScreenLocked;
    };

    var factory = {
      $lock: $lock,
      $unlock: $unlock,
      $isLocked: $isLocked
    };

    return factory;
  }

  angular.module('ChromaOSLockScreen.Services')

  .factory('ChromaOSLockScreenService', ChromaOSLockScreenService);

  ChromaOSLockScreenService.$inject = ['$compile', '$rootScope', '$'];
})(window.angular);
;(function(angular) {
  'use strict';

  angular.module('ChromaOSLockScreen.Modules', [
		'ChromaOSLockScreen.Modules.LockScreen',
		'ChromaOSLockScreen.Modules.DefaultLockScreenContent'
	]);

})(window.angular);
;(function(angular) {

  angular.module('ChromaOSLockScreen.Modules.DefaultLockScreenContent', []);

})(window.angular);
;(function(angular) {

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
;(function(angular) {
  'use strict';

  angular.module('ChromaOSLockScreen.Modules.LockScreen', []);

})(window.angular);
;(function(angular) {
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
;(function(angular) {
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
;angular.module('ChromaOSLockScreen.Templates', ['modules/chromaos-lock-screen-default-content/directives/ChromaOSDefaultLockScreenContentDirectiveTemplate.html', 'modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenCompilerDirectiveTemplate.html', 'modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenDirectiveTemplate.html']);

angular.module("modules/chromaos-lock-screen-default-content/directives/ChromaOSDefaultLockScreenContentDirectiveTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/chromaos-lock-screen-default-content/directives/ChromaOSDefaultLockScreenContentDirectiveTemplate.html",
    "<div>\n" +
    "	<div class=\"chromaos-default-lock-screen-default-content\">\n" +
    "		<h1 class=\"chromaos-default-lock-screen-default-content-title\">Lock Screen</h1>\n" +
    "		<div class=\"avatar\">\n" +
    "			<img src=\"imgs/default-user-profile.jpg\" class=\"avatar-img\" />\n" +
    "		</div>\n" +
    "		<div class=\"row chromaos-default-lock-screen-default-content-actions\">\n" +
    "			<div class=\"col-xs-6 text-center\">\n" +
    "				<button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"unlockScreenOk();\">\n" +
    "					<i class=\"fa fa-unlock\"></i> Unlock correctly\n" +
    "				</button>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-6 text-center\">\n" +
    "				<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"unlockScreenKo();\">\n" +
    "					<i class=\"fa fa-unlock\"></i> Unlock error\n" +
    "				</button>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenCompilerDirectiveTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenCompilerDirectiveTemplate.html",
    "<div></div>\n" +
    "");
}]);

angular.module("modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenDirectiveTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/chromaos-lock-screen/directives/views/ChromaOSLockScreenDirectiveTemplate.html",
    "<div class=\"chromaos-lock-screen\">\n" +
    "	<div class=\"chromaos-lock-screen-image\"></div>\n" +
    "	<div class=\"chromaos-lock-screen-content\">\n" +
    "		<div chromaos-lock-screen-compiler tpl=\"tpl\"></div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
;(function(angular) {
  'use strict';

  angular.module('ChromaOSLockScreen', [
		'ChromaOSLockScreen.Kernel',
		'ChromaOSLockScreen.Templates', // Needed when grunting templates (HTML2JS).
		'ChromaOSLockScreen.Modules',
		'ChromaOSLockScreen.Services'
	]);

})(window.angular);
