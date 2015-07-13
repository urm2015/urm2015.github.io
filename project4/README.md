Optimization made for Project4
Robert Miller

Part 1: Optimizing index.html for pagespeed score of at least 90 for both mobile and desktop.

Optimizations made:

1) Inlined all CSS for the index page so there would be faster loading.  
	--Removed the href to style.css on index.html. 
	--Left the href on subsequent pages since they are not part of the initial load.
2) Made loading of files async.
	--Added async to the perfmatters.js load
	--Added async to the googleanalytics load
	Adding this lets the browser continue loading the page while it is downloading files and does not block rendering.
3) Changed the Print.css to a media query since it will only be called when a print action is done.
	--Added  media = "print" to the href call for print.css
	--Added @media tag to the print.css file
4) Reformatted pizzeria.jpg to fit in the size of the actual window of its location.
	--Pizzeria.jpg was way to large compared to the other pictures and was slowing down the load. 
	  By resizing the picture, it sped up the load time and made it the same size as the other pictures.
5) Minified all HMTL, CSS and JS in index.html using Grunt.
	--Using Grunt yielded a 1 KB saving for the index.html file.
6) Moved the call to the GoogleAnalytics fuction to the bottom of the page as this was not needed for page load for the user.

With these optimizations, PageSpeed Insights rated the page at 93 for mobile and 94 for desktop.


Part 2: Optimizing main.js for pizza.html.

Optimizations made:

1) Function changePizzaSizes
	--Removed variables from the for loop
	  	var i = 0;
      	var randomPizzas = document.getElementsByClassName('randomPizzaContainer');
      	var pizzaLength = randomPizzas.length;

      	for (; i < pizzaLength; i++) {
        	randomPizzas[i].style.width = newWidth + "%";
    --Replaced querySelectorAll with getElementByClassName
    --Changed neWidth variables in switch cases to be percentages
    --Rewrote function and removed most of the code
    --Combined the changePizzaSlider function and the changePizzaSizes function to eliminate a function call,
      since both switch commands were accessing same data.  It seemed like double work.

2) Changed number of background pizzas from 200 to 25 since that is all that can be seen on the screen at a time.

3) Function updatePositions
	--Removed variables from the layout for loop
		for (; i < itemslength; i++) {
      		items[i].style.transform = 'translateX(' + items[i].scrollMove + 'px' + ')';
  			}
	--Changed from style.left to style.transform using translateX.
	--Added will-change: transform to the .mover class in the style.css file
	--Added a for loop to do all of the calculations for each item in the list before calling the for loop to change layout 
	--Pulled variables out of this loop to avoid multiple calls 
		var items = document.getElementsByClassName('mover'); 
  		var i = 0;
  		var itemslength = items.length;
  		var scrollPosition = (document.body.scrollTop / 1250);
  

		for (; i < itemslength; i++) {
  			items[i].phaseLeft = Math.sin(scrollPosition  + (i % 5));
  			items[i].scrollMove = ((items[i].basicLeft + 100 * items[i].phaseLeft) - 1024);
			}
	--Changed querySelectorAll to getElementByClassName for items variable
4) DOMContentLoad function
	--Added elem.phaseLeft to be able to store the phase change in the updatePositions function and threfore remove the calculation 
	  from the layout loop
	--Added elem.scrollMove to store the amount of movement each element will make, thus removing it from the layout loop in
	  updatePositions function 

    