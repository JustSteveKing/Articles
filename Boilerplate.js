// Create a namespace for the application
var cws = (function (){
  'use strict';
  
  // create a variable to store all public methods within
  var exports = {};

  // create another variable for private variables to be stored in
  var private_method = function () {
    console.log('this is a private method');
  };

  // This is a public method
  exports.public_method = function () {
    console.log('I am a public method, i can call a private method though, you can call me in the GDOM by typing cws.public_method()');

    private_method();
  };

  // Return the Public Object
  return exports;

}());

// This is a subModule of the main namespace
cws.subModule = (function (){
  'use strict';

  var exports = {};
  
  var private_method = function () {
    console.log('this is a private method');
  };

  exports.public_method = function () {
    console.log('I am a public method, i can call a private method though, you can call me in the GDOM by typing cws.subModule.public_method()');

    private_method();
  };

  return exports;
}());
