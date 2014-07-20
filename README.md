#Curtain.js
Requires jQuery ;)
##About
Display content for comback intersitials.
This leverages the [Page Visibility API that is provided by all *decently* modern browsers](http://caniuse.com/#feat=pagevisibility).
All decent browsers. If your browser dosen't support this API, time to upgrade.

##Setup
Include `curtain.js` and `curtain.css` in your project.
`curtain.css` goes in your `<head>`, like so:

    <link href="bower_components/curtain.js/curtain.css" rel="stylesheet">

Then, include `curtain.js` in your *hot* `<body>`, ideally near the closing tag:

    <script src="bower_components/curtain.js/curtain.js"></script>

Then after your openining `<body>` tag, place a `<div>` with the Curtain class:

So the most basic document would look something like this:
```HTML
<!DOCTYPE html>
<html>
  <head>
    <link href="../curtain.css" rel="stylesheet">
  </head>
  <body>
    <section class="curtain" curtain-delay="0.5s" curtain-duration="1s">
      <!-- curtain content, Make sure you actually have *something* here -->
    </section>
    <div>
      <!-- page content -->
    </div>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/curtain.js/curtain.js"></script>
  </body>
</html>
```
This script is self instating, so it should just run on load. That may change. It may not. Let me know.

##UX Considerations
This isn't really intended for pages/apps with referential materials.
I mean, *I* would be pissed coming back and forth, and having to wait.
So be sure you use this sparingly so as not to piss off your users.

Speaking of pissing off users, it *could* also be used for interstitial ads, but I sure hope not.
Shit. I know you will. Oh well. Enjoy it.
