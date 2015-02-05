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

# Attribute Manipulation
    var elem = document.querySelector('#some-element');
	elem.getAttribute('data-example'); // Get data attribute
	elem.setAttribute('data-example', 'Hello world'); // Set data attribute
	if ( elem.hasAttribute('data-example') ) { // Check data attribute
	    console.log('yep!');
	}

	var elem = document.querySelector('#some-element');
	// Set an ID
	elem.setAttribute('id', 'new-id');
	elem.id = 'new-id';

	// Set width
	elem.setAttribute('width', '200px');
	elem.width = '200px';

	// Get title
	elem.getAttribute('title');
	elem.title;
-----

# Event Listeners
    var elem = document.querySelector('.some-class');
	elem.addEventListener('click', function(event) {
	    // Do stuff
	}, false);
	
## DRY Approach
    var elem = document.querySelector('.some-class');
	var someFunction = function (event) {
	    // Do stuff
	}
	elem.addEventListener('click', someFunction, false);
	elem.addEventListener('mouseover', someFunction, false)
	
	var elem = document.querySelector('.some-class');
	var someFunction = function (var1, var2, var3, event) {
	    // Do stuff
	}
	elem.addEventListener('click', someFunction.bind(null, var1, var2, var3), false);
	elem.addEventListener('mouseover', someFunction.bind(null, var1, var2, var3), false);

	elem.removeEventListener('click', someFunction, false);
	elem.removeEventListener('mouseover', someFunction, false);
	
## Event Listener on Multiple Elements
    var eventHandler = function () {

	    // Get the clicked element
	    var toggle = event.target;

	    // If clicked element is the one you're looking for, run your methods
	    if ( toggle.hasAttribute('data-example') || toggle.classList.contains('sample-class') ) {
	        event.preventDefault(); // Prevent default click event
	        someMethod( the, arguments, to, pass, in );
	    }

	};

	// Listen for all click events on the document
	document.addEventListener('click', eventHandler, false);

-----

# Height Manipulation
    var getHeight = function (elem) {
		return Math.max( elem.scrollHeight, elem.offsetHeight, elem.clientHeight );
	};

	var elem = document.querySelector('#some-element');
	var height = getHeight(elem); // Get Height
	elem.style.height = '200px'; // Set height
-----

# Working with Forms
    var form = document.querySelector('#some-form');
	var input = document.querySelector('#some-input');
	document.forms; // Get all forms on a page
	form.elements; // Get all form elements
	input.type.toLowerCase(); // Get input type (radio, checkbox, text, etc.)
	input.value; // Get input value
	input.name; // Get input name
	input.checked; // Get the checked status of a checkbox or radio button
	input.disabled; // Get input disabled status
-----

# Height Content
    var elem = document.querySelector('#some-element');
	var html = elem.innerHTML; // Get HTML
	elem.innerHTML = 'Hello World!'; // Set HTML
-----

# Extend Function
## Shallow Extend
	var extend = function ( objects ) {
	    var extended = {};
	    var merge = function (obj) {
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                extended[prop] = obj[prop];
	            }
	        }
	    };
	    merge(arguments[0]);
	    for (var i = 1; i < arguments.length; i++) {
	        var obj = arguments[i];
	        merge(obj);
	    }
	    return extended;
	};

## Deep Extend
	var deepExtend = function ( objects ) {
	    var extended = {};
	    var merge = function (obj) {
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                if ( Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
	                    extended[prop] = deepExtend(extended[prop], obj[prop]);
	                }
	                else {
	                    extended[prop] = obj[prop];
	                }
	            }
	        }
	    };
	    merge(arguments[0]);
	    for (var i = 1; i < arguments.length; i++) {
	        var obj = arguments[i];
	        merge(obj);
	    }
	    return extended;
	};

	// Example objects
	var object1 = {
	    apple: 0,
	    banana: { weight: 52, price: 100 },
	    cherry: 97
	};
	var object2 = {
	    banana: { price: 200 },
	    durian: 100
	};
	var object3 = {
	    apple: 'yum',
	    pie: 3.214,
	    applePie: true
	}

	// Create a new object by combining two or more objects
	var newObject = extend(object1, object2, object3);
	var newObjectDeep = deepExtend(object1, object2);
-----

# Is Element in the Viewport
    var isInViewport = function ( elem ) {
	    var distance = elem.getBoundingClientRect();
	    return (
	        distance.top >= 0 &&
	        distance.left >= 0 &&
	        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	    );
	};

	var elem = document.querySelector('#some-element');
	isInViewport(elem); // Boolean: returns true/false
-----

# Distance to the top of the Viewport
    var position = window.pageYOffset;

	// Get an element's distance from the top of the page
	var getElemDistance = function ( elem ) {
	    var location = 0;
	    if (elem.offsetParent) {
	        do {
	            location += elem.offsetTop;
	            elem = elem.offsetParent;
	        } while (elem);
	    }
	    return location >= 0 ? location : 0;
	};
	var elem = document.querySelector('#some-element');
	var location = getElemDistance( elem );
-----

# Get Document Height
    var getDocumentHeight = function () {
	    return Math.max(
	        document.body.scrollHeight,
	        document.documentElement.scrollHeight,
	        document.body.offsetHeight,
	        document.documentElement.offsetHeight,
	        document.body.clientHeight,
	        document.documentElement.clientHeight
	    );
	};
-----

# Climbing up the DOM
    var elem = document.querySelector('#some-element');
	var parent = elem.parentNode;
	var getClosest = function (elem, selector) {
	    var firstChar = selector.charAt(0);
	    // Get closest match
	    for ( ; elem && elem !== document; elem = elem.parentNode ) {
	        // If selector is a class
	        if ( firstChar === '.' ) {
	            if ( elem.classList.contains( selector.substr(1) ) ) {
	                return elem;
	            }
	        }
	        // If selector is an ID
	        if ( firstChar === '#' ) {
	            if ( elem.id === selector.substr(1) ) {
	                return elem;
	            }
	        } 
	        // If selector is a data attribute
	        if ( firstChar === '[' ) {
	            if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
	                return elem;
	            }
	        }
	        // If selector is a tag
	        if ( elem.tagName.toLowerCase() === selector ) {
	            return elem;
	        }
	    }
	    return false;
	};
	var elem = document.querySelector('#some-element');
	var closest = getClosest(elem, '.some-class');
	var closestLink = getClosest(elem, 'a');
	var closestExcludingElement = getClosest(elem.parentNode, '.some-class');

	var getParents = function (elem, selector) {
	    var parents = [];
	    if ( selector ) {
	        var firstChar = selector.charAt(0);
	    }
	    // Get matches
	    for ( ; elem && elem !== document; elem = elem.parentNode ) {
	        if ( selector ) {
	            // If selector is a class
	            if ( firstChar === '.' ) {
	                if ( elem.classList.contains( selector.substr(1) ) ) {
	                    parents.push( elem );
	                }
	            }
	            // If selector is an ID
	            if ( firstChar === '#' ) {
	                if ( elem.id === selector.substr(1) ) {
	                    parents.push( elem );
	                }
	            }
	            // If selector is a data attribute
	            if ( firstChar === '[' ) {
	                if ( elem.hasAttribute( selector.substr(1, selector.length - 1) ) {
	                    parents.push( elem );
	                }
	            }
	            // If selector is a tag
	            if ( elem.tagName.toLowerCase() === selector ) {
	                parents.push( elem );
	            }
	        } else {
	            parents.push( elem );
	        }
	    }
	    // Return parents if any exist
	    if ( parents.length === 0 ) {
	        return null;
	    } else {
	        return parents;
	    }
	};
	var elem = document.querySelector('#some-element');
	var parents = getParents(elem, '.some-class');
	var allParents = getParents(elem.parentNode);
-----

# Climbing down the DOM
    var elem = document.querySelector('#some-element');
	var all = elem.childNodes;

	var elem = document.querySelector('#some-element');
	var first = elem.firstChild;

	var elem = document.querySelector('#some-element');
	var firstMatch = elem.querySelector('.sample-class');

	var elem = document.querySelector('#some-element');
	var allMatches = elem.querySelectorAll('.sample-class');
-----

# Get Sibling Elements
    var getSiblings = function (elem) {
	    var siblings = [];
	    var sibling = elem.parentNode.firstChild;
	    for ( ; sibling; sibling = sibling.nextSibling ) {
	        if ( sibling.nodeType === 1 && sibling !== elem ) {
	            siblings.push( sibling );
	        }
	    }
	    return siblings;
	};
	var elem = document.querySelector('#some-element');
	var siblings = getSiblings(elem);
-----

# Get HTML From Another Page
    var getHTML = function ( url, callback ) {
	    // Feature detection
	    if ( !window.XMLHttpRequest ) return;
	    // Create new request
	    var xhr = new XMLHttpRequest();
	    // Setup callback
	    xhr.onload = function() {
	        if ( callback && typeof( callback ) === 'function' ) {
	            callback( this.responseXML );
	        }
	    }
	    // Get the HTML
	    xhr.open( 'GET', url );
	    xhr.responseType = 'document';
	    xhr.send();
	};
	// Get the entire document
	getHTML( '/about', function (response) { 
	    console.log( response ); 
	});
	// Get an element in the document
	getHTML( '/about', function (response) { 
	    console.log( response.querySelector( '#some-elem' ) ); 
	});
-----

# Get JSON Data
    var getJSONP = function ( url, callback ) {
	    // Create script with url and callback (if specified)
	    var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
	    var script = window.document.createElement( 'script' );
	    script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'callback=' + callback;
	    // Insert script tag into the DOM (append to <head>)
	    ref.parentNode.insertBefore( script, ref );
	    // After the script is loaded (and executed), remove it
	    script.onload = function () {
	        this.remove();
	    };
	};
	var logAPI = function ( data ) {
	    console.log( data );
	}
	getJSONP( 'http://api.petfinder.com/shelter.getPets?format=json&key=12345&shelter=AA11', 'logAPI' );
-----

# Foreach Loop
    var forEach = function (collection, callback, scope) {
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection);
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection);
		}
	};

	// Array:
	forEach(['A', 'B', 'C', 'D'], function (value, index) {
		console.log(value); // A, B, C, D
		console.log(index); // 0, 1, 2, 3
	});
	// NodeList:
	forEach(document.querySelectorAll('div'), function (value, index) {
		console.log(value); // <div>, <div>, <div>...
		console.log(index); // 0, 1, 2...
	});

	forEach({ name: 'Steve', location: 'UK' }, function (value, prop, obj) {
    	console.log(value); // Steve, UK
    	console.log(prop); // name, location
		console.log(obj); // { name: 'Steve', location: 'UK' }, { name: 'Steve', location: 'UK' }
	});
