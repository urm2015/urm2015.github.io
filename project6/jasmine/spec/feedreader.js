// feedreader.js

$(function() {

    //This suite tests the RSS Feeds and their properties.

    describe('RSS Feeds', function() {

        //This test checks to see that the value of the feed URL does
        //not equal "undefined".

        it('is defined', function() {
            expect(allFeeds).toBeDefined();
        });

        //This test checks to see that the value of the feed URL does
        //not equal "undefined".

        it('is not empty', function() {
            expect(allFeeds.length).not.toBe(0);
        });

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
                expect(feed.url).not.toBeNull();
            });
        });

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
                expect(feed.name).not.toBeNull();
            });
        });
    });

    //This suite tests the menu functionality.

    describe('The menu', function() {
        var $body = $('body');
            $menuIconLink = $('.menu-icon-link');
            $menu = $('.menu');

        //This checks to see that the x value of the menu is less than 0.
        //This means the menu is off the screen.

        it('is off the screen initially', function(){
            expect($menu.offset().left).toBeLessThan(0);
        });

        //This test checks to make sure that the x value for the menu is greater than or
        //equal to 0, by triggering a click event then checking the x value of the menu.
        // This means the menu is on the screen.

        it('moves on the screen when clicked', function(done) {
            $menuIconLink.trigger('click');
            window.setTimeout(function() {
                expect($menu.offset().left).not.toBeLessThan(0);
                done();
            }, 500);
        });

        //This test checks to make sure that the x value for the menu is less than 0,
        // by triggering a click event then checking the x value of the menu.
        //This means the menu is off the screen.

        it('moves off the screen when clicked', function(done) {
            $menuIconLink.trigger('click');
            window.setTimeout(function() {
                expect($menu.offset().left).toBeLessThan(0);
                done();
            }, 500);
        });
    });

    //This suite checks the first entries added by loadfeed.

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //This test checks to see that the feed is not empty by making sure there is
        //at least one entry in the feed array.

        it('feed is not empty', function() {
            expect($('.feed').length).toBeGreaterThan(0);
        });

        //This test checks to make sure that there is at least one entry in the entry
        //array and it is not empty.

        it('entry is not empty', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    //This suite tests that the new feeds differ from the old ones.

    describe('New Feed Selection', function(done) {

        //This loads the feeds to compare
        var title0 = $(".feed .entry-link .entry h2").html();
        var header0 = $("h1.header-title").html();

        beforeEach(function(done) {
            loadFeed(0, function() {
                title0 = $(".feed .entry-link .entry h2").html();
                header0 = $("h1.header-title").html();
                loadFeed(1, done);
            });
        });

       //This test checks to see that the new header loaded does not match the
       //previous header already loaded.

        it('header does not match old feed header', function() {
                expect($("h1.header-title").html()).not.toBe(header0);
        });

        //This test checks to see that the new title loaded does not match the
        //previous title loaded.

        it('entry does not match old feed entry', function() {
            expect($(".feed .entry-link .entry h2").html()).not.toBe(title0);
        });

        afterAll(function(done) {
            loadFeed(0, done);
        });
    });
}());