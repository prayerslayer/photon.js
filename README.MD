# Photon

I found different Lightbox tools (such as fancybox, fancybox2, lightbox and a dozen others) too feature-rich. So here's a <100 lines lightbox: Photon.

# Status and roadmap

* Should work in modern browsers (>= IE10, due to use of ``classList``). I'll add some shims/polyfills to get the same functionality for older browsers.
* Architecture is not quite right yet. To be solved.
* Some animations will probably be added too.

# Features

* Puts an image in a lightbox
* Browse through images with arrow keys
* Exit lightbox with click on background

# Usage

Warning: This might change!

Takes every ``img`` on the page:

    Photon().init();

Provide a custom selector:

    Photon().init( ".my-custom-image-class" );

In case you load images dynamically you will have to call this every time.