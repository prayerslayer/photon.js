# Photon

I found different Lightbox tools (such as fancybox, fancybox2, lightbox and a dozen others) too feature-rich. So here's a 200 lines, about 5.5 KB (after minification, not gzipped) lightbox: **Photon**. I tested only in latest Chrome and Firefox, but Photon should work in all browsers, even IE 6. Please open an issue if you encounter problems.

# Features

* Puts an image in a lightbox
* Browse through images with arrow keys (some click targets will be added)
* Exit lightbox with click on background or Escape key

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