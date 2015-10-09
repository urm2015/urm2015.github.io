/* feedreader.js
 * Author: Robert Miller
 * Date: 10/10/2015
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */


        it('is defined', function() {
            expect(allFeeds).toBeDefined();
        });

        it('is not empty', function() {
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        //This test checks to see that the value of the feed URL does
        //not equal "undefined".

        it('each feed has a defined URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });

        //This test checks to see that the feed url is not empty.

        it('each URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toBe('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        //This test checks to see that the value of the feed name does
        //not equal "undefined".

        it('each feed has a defined name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });

        //This test checks to see that the feed url is not empty.

        it('each name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var $body = $('body');
            $menuIconLink = $('.menu-icon-link');
            $menu = $('.menu');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        //This checks to see that the x value of the menu is less than 0.
        //This means the menu is off the screen.

        it('is off the screen initially', function() {
            expect($menu.offset().left).toBeLessThan(0);
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        //This test checks to make sure that the x value for the menu is greater than or
        //equal to 0, by triggering a click event then checking the x value of the menu.
        // This means the menu is on the screen.

        it('moves on the screen when clicked', function(done) {
            $menuIconLink.trigger('click');
            window.setTimeout(function() {
                expect($menu.offset().left).not.toBeLessThan(0);
                done();
            }, 300);
        });

        //This test checks to make sure that the x value for the menu is less than 0,
        // by triggering a click event then checking the x value of the menu.
        //This means the menu is off the screen.

        it('moves off the screen when clicked', function(done) {
            $menuIconLink.trigger('click');
            window.setTimeout(function() {
                expect($menu.offset().left).toBeLessThan(0);
                done();
            }, 200);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //This test checks to see that the feed is not empty by making sure there is
        //at least one entry in the feed array.

        it('feed is not empty', function(done) {
            expect($('.feed').length).toBeGreaterThan(0);
            done();
        });

        //This test checks to make sure that there is at least one entry in the entry
        //array and it is not empty.

        it('entry is not empty', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //This loads the feeds to compare

        beforeEach(function(done) {
            loadFeed(0, function() {
                title0 = $(".feed .entry-link .entry h2").html();
                header0 = $("h1.header-title").html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

       //This test checks to see that the new header loaded does not match the
       //previous header already loaded.

        it('header does not match old feed header', function(done) {
            expect($("h1.header-title").html()).not.toBe(header0);
            done();
        });

        //This test checks to see that the new title loaded does not match the
        //previous title loaded.

        it('entry does not match old feed entry', function(done) {
            expect($(".feed .entry-link .entry h2").html()).not.toBe(title0);
            done();
        });

        afterAll(function(done) {
            loadFeed(0, done);
        });
    });
}());