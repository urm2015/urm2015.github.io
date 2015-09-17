//**********Model Section********

//Setup Map

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(29.4268198, -98.4887071),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });
var iconURLPrefixRed = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

  // Define locations as an Array
var initialLocations = [
  {
    name : 'Tobin Center',
    lat : '29.4306927',
    long : '-98.4886484',
    marker: new google.maps.Marker({
          position: new google.maps.LatLng(29.4306927, -98.4886484),
          map: map,
          icon: iconURLPrefixRed,
        }),
  },
  {
    name : 'The Buckhorn',
    lat : '29.4261784',
    long : '-98.4889309',
    marker: new google.maps.Marker({
          position: new google.maps.LatLng(29.4261784, -98.4889309),
          map: map,
          icon: iconURLPrefixRed,
        })
  },
  {
    name : 'The Majestic Theater',
    lat : '29.42616',
    long : '-98.4905833',
    marker: new google.maps.Marker({
          position: new google.maps.LatLng(29.42616, -98.4905833),
          map: map,
          icon: iconURLPrefixRed,
        })
  },
  {
    name : 'The Alamo',
    lat : '29.4259671',
    long : '-98.4861419',
    marker: new google.maps.Marker({
          position: new google.maps.LatLng(29.4259671, -98.4861419),
          map: map,
          icon: iconURLPrefixRed,
        }) 
  },
  {
    name : 'The Menger Hotel',
    lat : '29.4268198',
    long : '-98.4887071',
    marker: new google.maps.Marker({
          position: new google.maps.LatLng(29.4248426, -98.486367),
          map: map,
          icon: iconURLPrefixRed,
        })
  }];
    
  var Location = function(data) {
  var self = this;
  this.name= ko.observable(data.name);
  this.lat= ko.observable(data.lat);
  this.long= ko.observable(data.long);
  this.marker= ko.observable(data.marker);
};


//*********ViewModel Section********

var ViewModel = function() {
    var self = this;
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 120
      });

//Make locations an observable array

    this.locations = ko.observableArray([]);

//Add elements to locations array
  this.addElements= function(){
    initialLocations.forEach(function(place){
      self.locations().push(new Location(place));
    });
  };

  self.addElements();

//Set marker animation to false

  this.animateFalse = function(){
      self.locations().forEach(function(point){
        point.marker().setAnimation(false);
      });
    };

//Add click event to marker and info window

  this.addClick = function(){  
    self.locations().forEach(function(place){
    
      marker = place.marker();

      google.maps.event.addListener(marker, 'click', (function(marker, place) {
        return function() {
          self.animateFalse();
          infowindow.setContent(place.name() + " " +place.lat());
          infowindow.open(map, place.marker());
          place.marker().setAnimation(google.maps.Animation.BOUNCE);
        }
      })(marker, place));
    });
  };
  self.addClick();

//Set all markers visible

  this.setMarker = function(){
      self.locations().forEach(function(point){
      point.marker().setVisible(true);
    })
  }; 

//Set list view to be clicakble

this.currentMarker = ko.observable( this.locations()[0] );

this.setClickedMarker = function(clickedMarker) {
  self.currentMarker(clickedMarker);

  var name = this.name();
  var marker = this.marker();

  self.animateFalse();
  infowindow.setContent(name);
  infowindow.open(map, marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
};

//////////////
//Search and filter the list and markers
  
  this.searchFilter = function(){
    self.query = ko.observable('');

    self.search = ko.computed(function(){
      self.setMarker();
      self.animateFalse();
      return ko.utils.arrayFilter(self.locations(), function(place){
        self.locations().forEach(function(point){
          if (point.name().toLowerCase().indexOf(self.query().toLowerCase()) >=0){
              point.marker().setVisible(true);
              infowindow.close(map, point.marker());
          } else { 
              point.marker().setVisible(false);
              infowindow.close(map, point.marker());
            }
          })    
        return place.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
      });
    });
  };

  self.searchFilter();

 /////////////////////////
 /*
  this.wikiData = function(){
      

var MengerUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Menger Hotel';
var mengerid = '315875'

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: MengerUrl,
        datatype: "jsonp"
      });
        success: function( response ) {
            var mengerid = response.pageid;

                var content = 'http://en.wikipedia.org/?curid=' + mengerid;
                infowindow.setContent(place.name() + " " + content);
            };

            clearTimeout(wikiRequestTimeout);
        }
    });
  } 
*/
////////////////////////////
};

ko.applyBindings(new ViewModel())