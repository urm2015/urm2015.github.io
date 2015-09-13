//Model Section********

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

var iconURLPrefixGreen = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

var yelpinfo = 'http://api.yelp.com/v2/search?term=The+Tobin+Center';

  // Define locations as an Array
var initialLocations = [
  {
    name : 'Tobin Center',
    lat : '29.4306927',
    long : '-98.4886484',
    position: new google.maps.LatLng(29.4306927, -98.4886484),
    redIcon: iconURLPrefixRed,
    greenIcon: iconURLPrefixGreen,
    yelpinfo: yelpinfo
  },
  {
    name : 'The Buckhorn',
    lat : '29.4261784',
    long : '-98.4889309',
    position: new google.maps.LatLng(29.4261784, -98.4889309),
    redIcon: iconURLPrefixRed,
    greenIcon: iconURLPrefixGreen,
  },
  {
    name : 'The Majestic Theater',
    lat : '29.42616',
    long : '-98.4905833',
    position: new google.maps.LatLng(29.42616, -98.4905833),
    redIcon: iconURLPrefixRed,
    greenIcon: iconURLPrefixGreen,
  },
  {
    name : 'The Alamo',
    lat : '29.4259671',
    long : '-98.4861419',
    position: new google.maps.LatLng(29.4259671, -98.4861419),
    redIcon: iconURLPrefixRed,
    greenIcon: iconURLPrefixGreen,
  },
  {
    name : 'The Menger Hotel',
    lat : '29.4268198',
    long : '-98.4887071',
    position: new google.maps.LatLng(29.4248426, -98.486367),
    redIcon: iconURLPrefixRed,
    greenIcon: iconURLPrefixGreen,
  }];
    
  var Location = function(data) {
  var self = this;
  this.name= ko.observable(data.name);
  this.lat= ko.observable(data.lat);
  this.long= ko.observable(data.long);
  this.position= ko.observable(data.position);
  this.redIcon= ko.observable(data.redIcon);
  this.greenIcon= ko.observable(data.greenIcon);
};


//ViewModel Section********

var ViewModel = function() {
    var self = this;
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 120
      });

//make locations an observable array

    this.locations = ko.observableArray([]);

    this.markers = ko.observableArray([]);
    this.filter = ko.observable('');

//add elements to locations
    initialLocations.forEach(function(place){
      self.locations().push(new Location(place));
    });

//create markers and add click event
    
    
    
    for (var i = 0; i < this.locations().length; i++) {  
    
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations()[i].lat, this.locations()[i].long),
          map: map,
        }); 
      
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(this.locations()[i].name + " " +this.locations()[i].lat);
          infowindow.open(map, marker);
        }
      })(marker, i)); 

    };
    
//search and filter the list

    self.query = ko.observable('');

    self.search = ko.computed(function(){
      return ko.utils.arrayFilter(self.locations(), function(place){
        return place.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
      });
    });
};

ko.applyBindings(new ViewModel())