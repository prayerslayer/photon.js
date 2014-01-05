/*
	photon.js
	=============
	A minimalistic lightbox tool.
*/

( function( win , undef ) {

	"use strict";

	win.Photon = function( selector, options  ) {

		// some cross-browser utility functions
		var Utils = {
			"classList": win.document.documentElement.classList,
			"addClass": function addClass( elem, className ) {
				if ( this.classList ) {
					elem.classList.add( className );
				} else {
					if ( !this.hasClass( elem, className ) ) {
						elem.className += ( elem.className ? " " : "" ) + className;
					}
				}
			},
			"removeClass": function removeClass( elem, className ) {
				if ( this.classList ) {
					elem.classList.remove( className );
				} else {
					if ( this.hasClass( elem, className ) ) {
						elem.className = elem.className.replace( new RegExp( "(^|\\s)*" + className + "(\\s|$)*", "g" ), "" );
					}
				}
			},
			"addEvent": function addEvent( elem, evnt, func ) {
				if ( elem.addEventListener ) {
					// W3C DOM
					elem.addEventListener( evnt, func, false );
				}
				else if ( elem.attachEvent ) {
					// IE DOM
					elem.attachEvent( "on" + evnt, func );
				}
				else {
					// No much to do
					elem[ evnt ] = func;
				}
			},
			"removeEvent": function removeEvent( elem, evnt, func ) {
				if ( elem.removeEventListener ) {
					// W3C DOM
					elem.removeEventListener( evnt, func, false );
				}
				else if ( elem.detachEvent ) {
					// IE DOM
					elem.detachEvent( "on" + evnt, func );
				}
				else {
					// No much to do
					elem[ evnt ] = null;
				}
			}
		};

		if ( !selector ){
			selector = "img"; // takes all images by default
		}

		if ( !options ) {
			options = {};
		}

		// default options
		options.caption = options.caption === undef ? true : options.caption;
		options.emptyCaptionText = options.emptyCaptionText === undef ? "No caption" : options.emptyCaptionText;

		// vars
		var active = false,	// whether key events are processed
			current = 0,	// current image index
			fancyimg,		// image
			fig,			// figure element
			box,			// container
			caption,		// caption of image
			bg,				// background of container
			previous,		// previous click div
			next,			// next click div
			clickFunc,
			typeFunc,
			closeFunc,
			imgs = win.document.querySelectorAll( selector );	// all of the images

		// public object
		return {

			// function that displays a certain image
			"display": function display( index ) {
				// set src
				fancyimg.src = "";
				var fullsize = imgs[ index ].attributes[  "data-photon-fullsize" ];
				if ( fullsize ) {
					fancyimg.src = fullsize.value;
				} else {
					fancyimg.src = imgs[ index ].attributes.src.value;
				}
				// set caption if wanted and available
				if ( options.caption ) {
					var cap = "",
						alt = imgs[ index ].attributes.alt;
					if ( alt && alt.value ) {
						cap = alt.value;
					} else {
						cap = options.emptyCaptionText;
					}
					caption.textContent = cap;
				}
			},

			// removes all markup generated by photon and removes event listeners
			"stop": function stop() {
				win.document.body.removeChild( box );
				Utils.removeEvent( win.document.body, typeFunc );
				for (var i = imgs.length - 1; i >= 0; i--) {
					Utils.removeEvent( imgs[ i ], "click", clickFunc );
					imgs[i].removeAttribute( "data-photon-index" );
				}
				//delete references to functions and dom elements
				win = null;
				fancyimg = null;
				fig = null;
				box = null;
				caption = null;
				bg = null;
				previous = null;
				next = null;
				clickFunc = null;
				typeFunc = null;
				closeFunc = null;
				imgs = null;

			},

			// starts photon
			"start": function start( ) {
				var that = this;
				// build markup
				// this is the container of all the things
				box = win.document.createElement( "div" );
				Utils.addClass( box, "photon-box" );
				Utils.addClass( box, "photon-box_invisible" );
				// insert it as last child so it appears above everything else
				win.document.body.appendChild( box );

				// append key event listener on body that cycles through images
				typeFunc = function typeFunc( keyEvent ) {
					// break if photon is not visible
					if ( !active ) {
						return;
					}

					if ( keyEvent.keyCode === 27 ) {
						// escape
						closeFunc();
						return;
					}

					var direction = 0;
					if ( keyEvent.keyCode === 37 ) {
						// left arrow
						direction = -1;
					}
					else if ( keyEvent.keyCode === 39 ) {
						// right arrow
						direction = 1;
					}

					// break if it was neither escape, left nor right key
					if ( direction === 0 ) {
						return;
					}

					// display next image
					current += direction;
					// index value must be valid
					current = current < 0 ? current + imgs.length : current % imgs.length;
					that.display( current );
				};
				Utils.addEvent( win.document.body, "keydown", typeFunc );

				// background element - closes photon on click
				bg = win.document.createElement( "div" );
				Utils.addClass( bg, "photon-box__background" );
				box.appendChild( bg );
				closeFunc = function closeFunc() {
					Utils.addClass( box, "photon-box_invisible" );
					active = false;
				};
				Utils.addEvent( bg, "click", closeFunc );

				// figure element
				fig = win.document.createElement( "figure" );
				box.appendChild( fig );

				// the actual image element
				fancyimg = win.document.createElement( "img" );
				Utils.addClass( fancyimg, "photon-box__image" );
				fig.appendChild( fancyimg );

				// image caption
				if ( options.caption ) {
					caption = win.document.createElement( "figcaption" );
					Utils.addClass( caption, "photon-box__caption" );
					fig.appendChild( caption );
				}

				// left/right controls
				var cycleFunc = function cycleFunc( direction ) {
					return function() {
						// display next image
						current += direction;
						// index value must be valid
						current = current < 0 ? current + imgs.length : current % imgs.length;
						that.display( current );
					};
				};

				previous = win.document.createElement( "div" );
				previous.textContent = "⟵";
				Utils.addClass( previous, "photon-box__previous" );
				box.appendChild( previous );
				Utils.addEvent( previous, "click", cycleFunc( -1 ) );

				next = win.document.createElement( "div" );
				next.textContent = "⟶";
				Utils.addClass( next, "photon-box__next" );
				box.appendChild( next );
				Utils.addEvent( next, "click", cycleFunc( +1 ) );

				cycleFunc = null; // no longer needed
				
				clickFunc = function clickFunc() {
					// enable key events
					active = true;
					// show photon
					Utils.removeClass( box, "photon-box_invisible" );
					// display clicked image
					current = parseInt( this.attributes[ "data-photon-index" ].value );
					that.display( current );
				};

				// register click handler on images
				// also add data attribute that holds index of image in array for convenience
				for (var i = imgs.length - 1; i >= 0; i--) {
					Utils.addEvent( imgs[ i ], "click", clickFunc );
					imgs[ i ].setAttribute( "data-photon-index", i );
				}
			}
		};
	};

})( window, undefined );