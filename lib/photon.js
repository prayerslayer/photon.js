;

/*
	photon.js
	=============
	A minimalistic lightbox tool.
*/

( function( win, undef ) {
	var doc = win.document;
	win.Photon = function( selector, options  ) {

		if ( !selector )
			selector = "img"; // takes all images by default

		if ( !options ) {
			options = {};
		}

		// default options


		// vars
		var active = false,
			current = 0;

		// register click event handler on images
		var imgs = doc.querySelectorAll( selector );
		console.debug( imgs );

		// public object
		return {

			init: function( ) {

				
				
				// build fancy pants box
				var box = doc.createElement( "div" );
				box.classList.add( "photon-box" );
				box.classList.add( "photon-box_invisible" );
				doc.body.insertBefore( box, doc.body.firstChild );

				doc.body.addEventListener( "keydown", function( key_ev ) {
					
					// keycode 37 is left
					// 39 is right
					if ( !active )
						return;
					var direction = 0;
					if ( key_ev.keyCode === 37 )
						direction = -1;
					else if ( key_ev.keyCode === 39 )
						direction = 1;

					if ( direction === 0 )
						return;

					current += direction;
					current = current < 0 ? current + imgs.length : current % imgs.length;
					fancyimg.src = imgs[ current ].src;
				});

				var bg = doc.createElement( "div" );
				bg.classList.add( "photon-box__background" );
				box.appendChild( bg );
				bg.addEventListener( "click", function() {
					box.classList.add( "photon-box_invisible" );
					active = false;
				});

				var inner = doc.createElement( "div" );
				inner.classList.add( "photon-box__inner" );
				box.appendChild( inner );

				var fancyimg = doc.createElement( "img" );
				fancyimg.classList.add( "photon-box__image" );
				fancyimg.src= "notset";
				inner.appendChild( fancyimg );

				// function to execute on click
				var imgClick = function() {
					console.debug( "clicked", this.src );
					active = true;
					box.classList.remove( "photon-box_invisible" );
					fancyimg.src = this.src;
					current = parseInt( this.attributes[ "data-photon-index" ] );
				};

				for (var i = imgs.length - 1; i >= 0; i--) {
					var img = imgs[ i ];
					img.addEventListener( "click", imgClick );
					img.attributes[ "data-photon-index" ] = i;
				};
			}
		};
	};

})( window, undefined );