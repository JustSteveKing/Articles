# Selectors
    var firstClass = document.querySelector('.some-class');
    var firstId = document.querySelector('#some-id');
    var firstData = document.querySelector('[data-example]');
    var allClasses = document.querySelectorAll('.some-class');
    var allData = document.querySelectorAll('[data-example]');
-----    

# Looping
## Arrays and node lists
    var elems = document.querySelectorAll('.some-class');
    for ( var i = 0; i < elems.length; i++) {
        console.log(i); // Log Index
        console.log(elems[i]); // Log Object
    };
## Objects
    var obj = {
        apple: 'yum',
        pie: 3.214,
        applePie: true
    };
    for ( var prop in obj ) {
        if( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
            console.log(prop); // Log KEY
            console.log(obj[prop]); Log VALUE
        }
    }
-----

# Class Manipulation
    var elem = document.querySelector('#some-element');
    elem.classList.add('some-class'): // Add a class
    elem.classList.remove('some-other-class'); // Remove a class
    elem.classList.toggle('some-other-class'); // Add or Remove a class
    if ( elem.classList.contains( 'some-third-class' ) ) { // Check for a class
        console.log('Element contains class');
    }
-----

# Style Manipulation
    var elem = document.querySelector('#some-element');
    elem.style.color; // Get a CSS attribute
    elem.style.color = 'rebeccapurple'; // Set a CSS attribute
    elem.style.minHeight; // Get a CSS attribute
    elem.style.minHeight = '200px'; // Set a CSS attribute
-----
