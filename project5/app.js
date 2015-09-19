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
    title : 'Tobin Center for the Performing Arts',
    apiLink : '1',
    extract : 'The 2100 seat venue was first built in 1926 as the San Antonio Municipal Auditorium ',
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
    title : 'Buckhorn_Saloon_%26_Museum',
    apiLink : '1',
    extract : 'The museum was established in 1997',
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
    title: 'Majestic Theatre (San Antonio)',
    apiLink : '1',
    extract : 'The theatre seats 2,311 people and was built in 1929',
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
    title: 'Alamo Mission in San Antonio',
    apiLink : '1',
    extract : 'Founded in the eighteenth century as a Roman Catholic mission',
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
    title : 'Menger Hotel',
    apiLink : '1',
    extract : 'The hotel was built in 1859',
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
  this.title= ko.observable(data.title);
  this.apiLink= ko.observable(data.apiLink);
  this.extract= ko.observable(data.extract);
  this.lat= ko.observable(data.lat);
  this.long= ko.observable(data.long);
  this.marker= ko.observable(data.marker);
};


//*********ViewModel Section********

var ViewModel = function() {
    var self = this;
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 160
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

//Make wikipedia api call and store it in apiLink 

this.wikiData = function(){

   self.locations().forEach(function(point){

    var title = point.title();   

    var titleUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title;

    var wikiRequestTimeout = setTimeout(function(){
        infowindow.setContent("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: titleUrl,
        dataType: "jsonp",
        success: function( response ) {
            var titleid = Object.keys(response.query.pages)[0];           
                point.apiLink = 'http://en.wikipedia.org/?curid=' + titleid;
            },

            
      });
      clearTimeout(wikiRequestTimeout);
    });  
  };
    self.wikiData();



//Add click event to marker and info window

  this.addClick = function(){  
    self.locations().forEach(function(place){
    
      marker = place.marker();

      google.maps.event.addListener(marker, 'click', (function(marker, place) {
        return function() {
          self.animateFalse();
          infowindow.setContent('<a href="' + place.apiLink + '">' +  place.name() + '</a>' +"<br />" + place.extract());
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
  var apiLink = this.apiLink;
  var marker = this.marker();
  var extract = this.extract();

  self.animateFalse();
  infowindow.setContent('<a href="' + apiLink + '">' +  name + '</a>' +"<br />" + extract);
  infowindow.open(map, marker);
  marker.setAnimation(google.maps.Animation.BOUNCE);
};

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

};

ko.applyBindings(new ViewModel())