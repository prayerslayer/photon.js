# Photon

I found different Lightbox tools (such as fancybox, fancybox2, lightbox and a dozen others) too feature-rich. So here's a <100 lines lightbox: Photon.

# Status and roadmap

* Should work in modern browsers (>= IE10, due to use of ``classList``). I'll add some shims/polyfills to get the same functionality for older browsers.
* Some animations will probably be added too.

# Features

* Puts an image in a lightbox
* Browse through images with arrow keys
* Exit lightbox with click on background

# Usage

Create a photon object, then start it:

    var photon = new Photon( ".image-selector" );
    photon.start();

In case you load images dynamically you will have to call this every time.

## Options

Options may be passed as second argument:

    Photon( ".img", {
		caption: false
    }).start();

Available options:

* caption (boolean): Whether the caption should be displayed or not. Defaults to true.