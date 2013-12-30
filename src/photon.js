/*
	photon.js
	=============
	A minimalistic lightbox tool.
*/

( function( win , undef ) {

	"use strict";

	var doc = win.document;
	win.Photon = function( selector, options  ) {

		if ( !selector ){
			selector = "img"; // takes all images by default
		}
		
		if ( !options ) {
			options = {};
		}

		var Utils = {
			classList: win.document.documentElement.classList,
			addClass: function (elem, className) {
				if (this.classList) {
					elem.classList.add(className);
				} else {
					if (!this.hasClass(elem, className)) {
						elem.className += (elem.className ? " " : "") + className;
					}
				}
			},
			removeClass: function (elem, className) {
				if (this.classList) {
					elem.classList.remove(className);
				} else {
					if (this.hasClass(elem, className)) {
						elem.className = elem.className.replace(new RegExp("(^|\\s)*" + className + "(\\s|$)*", "g"), "");
					}
				}
			},
			addEvent: function( elem, evnt, func ) {
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
			removeEvent: function( elem, evnt, func ) {
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

		// default options

		options.caption = options.caption === undef ? true : options.caption;
		
		// vars
		var active = false,	// whether key events are processed
			current = 0,	// current image index
			fancyimg,		// image
			fig,			// figure element
			box,			// container
			caption,		// caption of image
			bg,				// background of container
			clickFunc,
			imgs = doc.querySelectorAll( selector );	// all of the images
		
		console.debug( imgs );

		// public object
		return {

			display: function( index ) {
				fancyimg.src = "";
				fancyimg.src = imgs[ index ].src;
				if ( options.caption ) {
					var cap = "#" + ( index + 1 ) + " / " + imgs.length;
					var alt = imgs[ index ].attributes.alt;
					if ( alt && alt.value ) {
						cap += ": " + alt.value;
					}
					caption.textContent = cap;
				}
			},

			stop: function() {
				document.body.removeChild( box );
				for (var i = imgs.length - 1; i >= 0; i--) {
					Utils.removeEvent( imgs[ i ], "click", clickFunc );
					imgs[i].removeAttribute( "data-photon-index" );
				}
			},

			start: function( ) {
				var that = this;
				// build markup
				// this is the container of all the things
				box = doc.createElement( "div" );
				box.classList.add( "photon-box" );
				box.classList.add( "photon-box_invisible" );
				// insert it as first child so it appears above everything else
				doc.body.insertBefore( box, doc.body.firstChild );

				// append key event listener on body that cycles through images
				doc.body.addEventListener( "keydown", function( keyEvent ) {
					// break if photon is not visible
					if ( !active ) {
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

					// break if it was neither left nor right key
					if ( direction === 0 ) {
						return;
					}

					// display next image
					current += direction;
					// index value must be valid
					current = current < 0 ? current + imgs.length : current % imgs.length;
					that.display( current );
				});

				// background element - closes photon on click
				bg = doc.createElement( "div" );
				Utils.addClass( bg, "photon-box__background" );
				box.appendChild( bg );
				Utils.addEvent( bg, "click", function() {
					Utils.addClass( box, "photon-box_invisible" );
					active = false;
				});

				// figure element
				fig = doc.createElement( "figure" );
				box.appendChild( fig );

				// the actual image element
				fancyimg = doc.createElement( "img" );
				Utils.addClass( fancyimg, "photon-box__image" );
				fig.appendChild( fancyimg );

				// image caption
				if ( options.caption ) {
					caption = doc.createElement( "figcaption" );
					Utils.addClass( caption, "photon-box__caption" );
					fig.appendChild( caption );
				}
				
				clickFunc = function() {
					console.debug( "clicked", this.src );
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
					var img = imgs[ i ];
					Utils.addEvent( img, "click", clickFunc );
					img.setAttribute( "data-photon-index", i );
				}
			}
		};
	};

})( window, undefined );