# Simple Javascript Loader

For smaller projects you might not need a something like requirejs.
You'll just want to load javascript, and know when it's loaded.
That's all that Simple Javascript Loader does.

## Setup

First of all, you'll need to include `sjl.min.js` to your project:

```html
<!-- in your head -->
<script src="/assets/js/sjl.min.js"></script>
```

You can autoload a main js file like so:

```html
<!-- in your head -->
<script data-main="/assets/js/app.js" src="/assets/js/sjl.min.js"></script>
```

This will automatically load app.js for you.
This is the only fancy feature!

# Usage

```javascript
// Load a single file
sjl.load('/assets/js/jquery.js');

// Load multiple files.
sjl.load(['/assets/js/jquery.js', '/assets/js/underscore.js']);

// Do something after a javascript file is loaded
sjl.load('/assets/js/jquery.js', function(){
	
	$("document").ready(function(){
		// work with jQuery
	});
	
});

// Do something after a javascript file is loaded
sjl.load(['/assets/js/jquery.js', '/assets/js/underscore.js'], function(){
	
	$("document").ready(function(){
		// work with jQuery
	});
	
});
```

## Using the `.add` method

In some cases it's nice to add a bunch of files to a queue before starting to load.

```javascript
sjl.add(['/assets/js/jquery.js', '/assets/js/underscore.js']);
sjl.load(function(){
	// jQuery and underscore are loaded.
});
```

## Nested loading

In this case, Backbone.js depends on underscore and jQuery.

```javascript
sjl.add(['/assets/js/jquery.js', '/assets/js/underscore.js']);
sjl.load(function(){
	sjl.load('/assets/js/backbone.js', function(){
		// Do something with backbone.
	});
});
```

### The end...