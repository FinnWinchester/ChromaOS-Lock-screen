(function(angular) {
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
