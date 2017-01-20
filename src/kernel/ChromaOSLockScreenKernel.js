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
