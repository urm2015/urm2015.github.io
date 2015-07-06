//Adding name and title to the heaader
var name = "Robert Miller";
var role = "Web Designer";

$("#header").prepend(HTMLheaderRole.replace("%data%", role));
$("#header").prepend(HTMLheaderName.replace("%data%", name));

//Adding bio info to the page
var bio = {
	"name" : "Robert",
    "role" : "Web Designer",
    "contacts" : {
          "mobile" : "210-262-1457",
          "email" : "jackrabbitmoon@yahoo.com", 
          "github" : "urm2015",
          "twitter" : "@rmiller", 
          "location" : "Blanco, Texas",
      },
    "welcomeMessage" : "Welcome to the Wonderful World of the Duck", 
    "skills" : ["Quacking", "Getting Angry", "Losing Temper"],
    "biopic" : "images/donaldDuck.jpg",
 	display : function() {
 		
 //Adding contact information to the header along with picture, welcome message and skills
		$("#topContacts").append(HTMLmobile.replace("%data%",bio.contacts.mobile));
		$("#topContacts").append(HTMLemail.replace("%data%",bio.contacts.email));
		$("#topContacts").append(HTMLtwitter.replace("%data%",bio.contacts.twitter));
		$("#topContacts").append(HTMLgithub.replace("%data%",bio.contacts.github));
		
		$("#topContacts").append(HTMLlocation.replace("%data%",bio.contacts.location));
		$("#topContacts").append(HTMLbioPic.replace("%data%",bio.biopic));
		$("#topContacts").append(HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage));

		if (bio.skills.length > 0) { 
		$("#header").append(HTMLskillsStart);
		
		$("#skills").append(HTMLskills.replace("%data%", bio.skills[0]));
		$("#skills").append(HTMLskills.replace("%data%", bio.skills[1]));
		$("#skills").append(HTMLskills.replace("%data%", bio.skills[2]));
		}

//Adding contact information to the footer
		$("#footerContacts").append(HTMLmobile.replace("%data%",bio.contacts.mobile));
		$("#footerContacts").append(HTMLemail.replace("%data%",bio.contacts.email));
		$("#footerContacts").append(HTMLtwitter.replace("%data%",bio.contacts.twitter));
		$("#footerContacts").append(HTMLgithub.replace("%data%",bio.contacts.github));

	}
};

//Adding Job information section to the page
var work = {
  "jobs": [
    {
      "employer": "SF Giants",
      "title": "General Manager",
      "location": "San Francisco, CA",
      "dates": "Feb 2014 - Current",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    },
    {
      "employer": "Red Wings",
      "title": "General Manager",
      "location": "Detriot, MI",
      "dates": "May 2013 - Jan 2014",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    },
    {
      "employer": "Los Angeles Kings",
      "title": "General Manager",
      "location": "Los Angeles, CA",
      "dates": "Jul 2012 - May 2013",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    },
    {
      "employer": "Blackhawks",
      "title": "General Manager",
      "location": "Chicago, IL",
      "dates": "Jun 2009 - Jun 2012",
      "description": "Who moved my cheese cheesy feet cauliflower cheese. Queso taleggio when the cheese comes out everybody's happy airedale ricotta cheese and wine paneer camembert de normandie. Swiss mozzarella cheese slices feta fromage frais airedale swiss cheesecake. Hard cheese blue castello halloumi parmesan say cheese stinking bishop jarlsberg."
    }
  ],

display : function() {
	for (job in work.jobs) {
	$("#workExperience").append(HTMLworkStart);

	var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer); 
	var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
	var formattedEmployerTitle = formattedEmployer + formattedTitle;
	$(".work-entry:last").append(formattedEmployerTitle);
	var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
	$(".work-entry:last").append(formattedDates);
	var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
	$(".work-entry:last").append(formattedDescription);
	
	}	
  }
};

//Adding Education information to the page
var education = {
	"schools" : [

	{
		"name" : "CSUS",
		"location" : "Sacramento",
		"degree" : "BA",
		"majors" : ["Computer Science", "EE"],
		"dates" : "2000-2005",
		"url" : "schoolsurl",
	}],
	"onlineCourses" : [
	{
		"title" : "Front End Nanodergee",
		"school" : "Udacity",
		"date" : "2015",
		"url" : "Udacity.com"
	},
	{
		"title" : "Back End Nanodergee",
		"school" : "Udacity",
		"date" : "2015",
		"url" : "Udacity.com"
	}
   ],
   display : function() {
   for (school in education.schools) {

	$("#education").append(HTMLschoolStart);

	$(".education-entry").append(HTMLschoolName.replace("%data%", education.schools[school].name));
	$(".education-entry").append(HTMLschoolDegree.replace("%data%", education.schools[school].degree));
	$(".education-entry").append(HTMLschoolDates.replace("%data%", education.schools[school].dates));
	$(".education-entry").append(HTMLschoolLocation.replace("%data%", education.schools[school].location));
	$(".education-entry").append(HTMLschoolMajor.replace("%data%", education.schools[school].majors));
  }
  $(".education-entry").append(HTMLonlineClasses);
  	
  	for (classes in education.onlineCourses){
  	
  	$(".education-entry").append(HTMLonlineTitle.replace("%data%", education.onlineCourses[classes].title));
  	$(".education-entry").append(HTMLonlineSchool.replace("%data%", education.onlineCourses[classes].school));
  	$(".education-entry").append(HTMLonlineDates.replace("%data%", education.onlineCourses[classes].date));
  	$(".education-entry").append(HTMLonlineURL.replace("%data%", education.onlineCourses[classes].url));
  
  }
 }
};

//Adding project information to the page
var projects = {
	"projects" : [
	
	{
		"title" : "Project 1",
		"dates" : "2456.12 - 2456.20",
		"description" : "WARP ENGINE--Warp drive is a technology that allows space travel at faster-than-light speeds. It works by generating warp fields to form a subspace bubble that envelopes the starship, distorting the local spacetime continuum and moving the starship at velocities that can greatly exceed the speed of light. These velocities are referred to as warp factors. Warp drive is the most common form of interstellar propulsion used in the Milky Way Galaxy, making interstellar exploration, commerce, and warfare possible.",
		"images" : ["images/warpEngine.jpg"],
	},
	{
		"title" : "Project 2",
		"dates" : "5634.13 - 5634.90",
		"description" : "STABILIZER",
		"images" : ["images/stabilizer.jpg"],
	},
	{
		"title" : "Project 3",
		"dates" : "5643.74 - 5643.80",
		"description" : "BRIDGE--On Starfleet vessels, the bridge is usually located on Deck 1, on top of the vessel's primary hull. The bridge is the nerve-center of every starship, and it is manned by the top officers of each department except for Engineering and Medical. There is typically an engineering station that the Chief Engineer can use when on the bridge, as well as science stations that the science officer or chief medical officer cans use. ",
		"images" : ["images/bridge.jpg"],
	}
  ],
  display : function() {
	for (project in projects.projects) {
	$("#projects").append(HTMLprojectStart);

	$(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title));
	$(".project-entry:last").append(HTMLprojectDates.replace("%data%", projects.projects[project].dates));
	$(".project-entry:last").append(HTMLprojectDescription.replace("%data%", projects.projects[project].description));
	if (projects.projects[project].images.length > 0) {
		for (image in projects.projects[project].images){
			$(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]))
			}
		}
	}
  }


};

//Display all information on the page
bio.display();
work.display();
projects.display();
education.display();

//Add google map to the page
$("#mapDiv").append(googleMap);

