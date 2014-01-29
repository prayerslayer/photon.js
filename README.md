# Photon

I wasn't quite satisfied with available lightbox tools (such as [fancybox](http://fancyapps.com/fancybox/), [lightbox](http://lokeshdhakar.com/projects/lightbox/), [lightbox2](http://lokeshdhakar.com/projects/lightbox2/) and [colorbox](http://www.jacklmoore.com/colorbox/), to name a few). Somehow I always felt they do too much. Too long animations. Next/previous controls that change their position. Spinners that look too playful and don't fit on my page.

So here's a really simple lightbox: **Photon**. It puts images of your choice in a lightbox. There are click controls to cycle through the images and they have a fixed position. Alternatively feel free to use your keyboard (arrow keys left/right and escape). Close Photon by clicking on the grey area. That's it. 

![Photon](https://npiccolotto.com/media/img/photonjs.png)

Also: It's tiny. Minified JS and CSS weigh 4 KB combined. Because it's a jQuery Plugin since version 2	 it works in ALL of the browsers.

# Features

* Puts images in a lightbox
* Browse through images with arrow keys or click targets
* Exit lightbox with click on background or Escape key
* Shows image caption (alt text) if you want to
* Lacks animations for the most part
* Tiny: 4 KB in total after minification
* Should work in all browsers

# Usage

Select your images and call ``Photon`` on them.

    $( "img" ).Photon();

That's about it. If you'd like to group certain photos (because Photon cycles them), you need to call ``Photon()`` on every group.

## Options

Options may be passed as an argument:

    $( "img" ).Photon({
		caption: false
    }).start();

Available options:

* ``caption`` (boolean): Whether the caption should be displayed or not. Takes the ``title`` or, if unavailable, ``alt`` attribute of the image. Defaults to ``true``.
* ``emptyCaptionText`` (String): What should be displayed if there is no alt text available. Defaults to ``"No caption"`.

# Customization

Please feel free to alter Stylus variables in ``src/photon.stylus`` as you wish.
