/*
	photon.js
	=============
	A minimalistic lightbox tool.
*/

(function( $ ) {
	"use strict";

	$.fn.Photon = function( options ) {
	
		if ( this.size() === 0 ) {
			return;
		}

		if ( !options ) {
			options = {};
		}

		// default options
		options.caption = options.caption === undefined ? true : options.caption;
		options.emptyCaptionText = options.emptyCaptionText === undefined ? "No caption" : options.emptyCaptionText;

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
			len = this.size(),
			imgs = this,	// all of the images
			body = $( "body ");

		function display( index ) {
			// set src
			fancyimg.src = "";
			var img = $( imgs[ index ] ),
				fullsize = img.attr(  "data-photon-fullsize" );
			if ( fullsize ) {
				fancyimg.attr( "src", fullsize );
			} else {
				fancyimg.attr( "src", img.attr( "src" ) );
			}
			// set caption if wanted and available
			if ( options.caption ) {
				var cap = "",
					alt = img.attr( "title" ) || img.attr( "alt" );
				if ( alt ) {
					cap = alt;
				} else {
					cap = options.emptyCaptionText;
				}
				caption.text( cap );
			}
		}

		function cycle( direction ) {
			return function() {
				// display next image
				current += direction;
				// index value must be valid
				current = current < 0 ? current + len : current % len;
				display( current );
			};
		}

		function close() {
			box.addClass( "photon-box_invisible" );
			active = false;
		}

		function type( keyEvent ) {
			// break if photon is not visible
			if ( !active ) {
				return;
			}

			if ( keyEvent.keyCode === 27 ) {
				// escape
				close();
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
			current = current < 0 ? current + len : current % len;
			display( current );
		}

		function click() {
			// enable key events
			active = true;
			// show photon
			box.removeClass( "photon-box_invisible" );
			// display clicked image
			current = parseInt( $( this ).data( "photon-index" ) );
			display( current );
		}

		box = $( document.createElement( "div" ) );
		box.addClass( "photon-box" );
		box.addClass( "photon-box_invisible" );
		// insert it as last child so it appears above everything else
		body.append( box );

		// append key event listener on body that cycles through images
		body.on( "keydown", type );

		// background element - closes photon on click
		bg = $( document.createElement( "div" ) );
		bg.addClass( "photon-box__background" );
		box.append( bg );
		bg.on( "click", close );

		// figure element
		fig = $( document.createElement( "figure" ) );
		box.append( fig );

		// the actual image element
		fancyimg = $( document.createElement( "img" ) );
		fancyimg.addClass( "photon-box__image" );
		fig.append( fancyimg );

		// image caption
		if ( options.caption ) {
			caption = $( document.createElement( "figcaption" ) );
			caption.addClass( "photon-box__caption" );
			fig.append( caption );
		}

		// left/right controls
		previous = $( document.createElement( "div" ) );
		previous.text( "⟵" );
		previous.addClass( "photon-box__previous" );
		box.append( previous );
		previous.on( "click", cycle( -1 ) );

		next = $( document.createElement( "div" ) );
		next.text( "⟶" );
		next.addClass( "photon-box__next" );
		box.append( next );
		next.on( "click", cycle( +1 ) );

		// register click handler on images
		// also add data attribute that holds index of image in array for convenience
		this.each( function( i ) {
			var dis = $( this );
			dis.on( "click", click );
			dis.data( "photon-index", i );
		});

	};

})( jQuery );