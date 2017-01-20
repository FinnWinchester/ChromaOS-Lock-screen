(function(angular) {
  'use strict';

  angular.module('ChromaOSLockScreen', [
		'ChromaOSLockScreen.Kernel',
		'ChromaOSLockScreen.Templates', // Needed when grunting templates (HTML2JS).
		'ChromaOSLockScreen.Modules',
		'ChromaOSLockScreen.Services'
	]);

})(window.angular);
