# Photon

I wasn't quite satisfied with available lightbox tools (such as [fancybox](http://fancyapps.com/fancybox/), [lightbox](http://lokeshdhakar.com/projects/lightbox/), [lightbox2](http://lokeshdhakar.com/projects/lightbox2/) and [colorbox](http://www.jacklmoore.com/colorbox/), to name a few). Somehow I always felt they do too much. Too long animations. Next/previous controls that change their position. Spinners that look too playful and don't fit on my page.

So here's a really simple lightbox: **Photon**. It puts images of your choice in a lightbox. There are click controls to cycle through the images and they have a fixed position. Alternatively feel free to use your keyboard (arrow keys left/right and escape). Close Photon by clicking on the grey area. That's it. 

Also: It's tiny. Minified JS and CSS weigh 2.5 and 2 KB respectively, a payload of 4.5 KB in total. Though I tested only in latest Chrome and Firefox, Photon should work in ALL of the browsers. Yes, even IE 6. Please open an issue if you encounter problems.

# Features

* Puts images in a lightbox
* Browse through images with arrow keys or click targets
* Exit lightbox with click on background or Escape key
* Shows image caption (alt text) if you want to
* Lacks animations for the most part
* Tiny: 4.5 KB in total after minification
* Should work in all browsers

# Usage

Create a photon object, then start it:

    var photon = new Photon( ".image-selector" );
    photon.start();

In case you load images dynamically you will have to call this every time. If you leave the image selector out, it will use ``"img"``.

If you're finished, you can call ``photon.stop()``.

## Options

Options may be passed as second argument:

    Photon( ".img", {
		caption: false
    }).start();

Available options:

* ``caption`` (boolean): Whether the caption should be displayed or not. Defaults to ``true``.
* ``emptyCaptionText`` (String): What should be displayed if there is no alt text available. Defaults to ``"No caption"`.

# Customization

Please feel free to alter Stylus variables in ``src/photon.stylus`` as you wish.