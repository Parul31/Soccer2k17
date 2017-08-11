var initialData = [
	{
		date:"2017-08-06",
		id:"sr:match:12148638",
		time:"15:00",
		venue : {
			"name": "Grolsch Veste Stadium",
	        "capacity": 30205,
	        "city_name": "Enschede",
	        "country_name": "Netherlands",
	        "lat": "52.236667",
	        "lng":"6.837500",
	        "country_code": "NLD"
	    },
	    "competitors": [
            {
                "id": "sr:competitor:32484",
                "name": "Netherlands",
                "country": "Netherlands",
                "country_code": "NLD",
                "abbreviation": "NED",
                "flag": "img/netherlands.svg",
                "qualifier": "home"
            },
            {
                "id": "sr:competitor:7414",
                "name": "Denmark",
                "country": "Denmark",
                "country_code": "DNK",
                "abbreviation": "DEN",
                "flag": "img/denmark.svg",
                "qualifier": "away"
            }
        ],
        "winner_id": "sr:competitor:32484"
	},
	{
		date:"2017-08-03",
		id:"sr:match:12107474",
		time:"18:45",
		venue: {
			"name":"Grolsch Veste Stadium",
			"capacity":30205,
			"city_name":"Enschede",
			"country_name":"Netherlands",
			"lat": "52.236667",
	        "lng":"6.837500",
			"country_code":"NLD"	
		},
		"competitors": [
            {
                "id": "sr:competitor:32484",
                "name": "Netherlands",
                "country": "Netherlands",
                "country_code": "NLD",
                "abbreviation": "NED",
                "flag": "img/netherlands.svg",
                "qualifier": "home"
            },
            {
                "id": "sr:competitor:7415",
                "name": "England",
                "country": "England",
                "country_code": "ENG",
                "abbreviation": "ENG",
                "flag": "img/england.png",
                "qualifier": "away"
            }
        ],
        "winner_id": "sr:competitor:32484"
	},
	{
		date:"2017-08-03",
		id:"sr:match:12107406",
		time:"16:00",
		venue: {
			"name":"Rat Verlegh Stadion",
			"capacity":19000,
			"city_name":"Breda",
			"country_name":"Netherlands",
			"lat": "51.595556",
	        "lng":"4.750278",
			"country_code":"NLD"
		},
		"competitors": [
            {
                "id": "sr:competitor:7414",
                "name": "Denmark",
                "country": "Denmark",
                "country_code": "DNK",
                "abbreviation": "DEN",
                "flag": "img/denmark.svg",
                "qualifier": "home"
            },
            {
                "id": "sr:competitor:34014",
                "name": "Austria",
                "country": "Austria",
                "country_code": "AUT",
                "abbreviation": "AUT",
                "flag": "img/austria.svg",
                "qualifier": "away"
            }
        ],
        "winner_id": "sr:competitor:7414"
	},
	{
		date:"2017-07-30",
		id:"sr:match:12095326",
		time:"18:45",
		venue: {
			"name":"De Adelaarshorst",
			"capacity":8000,
			"city_name":"Deventer",
			"country_name":"Netherlands",
			"lat": "52.260416",
	        "lng":"6.172578",
			"country_code":"NLD"
		},
		"competitors": [
            {
                "id": "sr:competitor:7415",
                "name": "England",
                "country": "England",
                "country_code": "ENG",
                "abbreviation": "ENG",
                "flag": "img/england.png",
                "qualifier": "home"
            },
            {
                "id": "sr:competitor:32485",
                "name": "France",
                "country": "France",
                "country_code": "FRA",
                "abbreviation": "FRA",
                "flag": "img/france.svg",
                "qualifier": "away"
            }
        ],
        "winner_id": "sr:competitor:7415"
	},
	{
		date:"2017-07-30",
		id:"sr:match:12095324",
		time:"16:00",
		venue: {
			"name":"Willem II Stadion",
			"capacity":14637,
			"city_name":"Tilburg",
			"country_name":"Netherlands",
			"lat": "51.542778",
	        "lng":"5.066944",
			"country_code":"NLD"
		},
		"competitors": [
            {
                "id": "sr:competitor:34014",
                "name": "Austria",
                "country": "Austria",
                "country_code": "AUT",
                "abbreviation": "AUT",
                "flag": "img/austria.svg",
                "qualifier": "home"
            },
            {
                "id": "sr:competitor:37371",
                "name": "Spain",
                "country": "Spain",
                "country_code": "ESP",
                "abbreviation": "ESP",
                "flag": "img/spain.svg",
                "qualifier": "away"
            }
        ],
        "winner_id": "sr:competitor:34014"
	}

];
var map;
var marker;
var popup ;
//initialize the map using accessToken
function initMap() {
	L.mapbox.accessToken = 'your accessToken';
	map = L.mapbox.map('map')
		.setView([52.236667,6.837500],17);
	popup = L.popup()
        .setLatLng([52.236667,6.837500])
        .setContent("<h3>Grolsch Veste Stadium</h3>")
        .openOn(map);
	// Use styleLayer to add a Mapbox style created in Mapbox Studio
	L.mapbox.styleLayer('your style').addTo(map);
}
initMap();
//to display the popup wheneven the marker is clicked
function popUp(lat,lng,sportsdata) {
map.on("click", function(e) {
	var this_lat=Math.floor(lat*1000)/1000;
	var this_lng=Math.floor(lng*1000)/1000;
    var latitude = Math.floor(e.latlng.lat*1000)/1000;
    var longitude = Math.floor(e.latlng.lng*1000)/1000;
    console.log(this_lat + " - " + this_lng);
    console.log(latitude + " - " + longitude);
    if((this_lat==latitude) && (this_lng==longitude)) {
		console.log('insideif');
		popup = L.popup()
        .setLatLng([lat,lng])
        .setContent("<h3>"+sportsdata.venue.name+"</h3>")
        .openOn(map);
	}
  });
}
//display information about the event
function displayInfo(currentSportsData) {
	var heading = currentSportsData.date+" @"+currentSportsData.time;
	var desc = currentSportsData.venue.name;
	$('#display-heading').text("The event took place on "+heading);
	$('#display-desc').text("The event took place in "+currentSportsData.venue.country_name+" in the city "+currentSportsData.venue.city_name+" at "+desc);
	$('#country1').attr('src',currentSportsData.competitors[0].flag);
	$('#country2').attr('src',currentSportsData.competitors[1].flag);
	$('#country1-name').text(currentSportsData.competitors[0].name);
	$('#country2-name').text(currentSportsData.competitors[1].name);
	currentSportsData.competitors.forEach(function(competitor) {
		if(competitor.id == currentSportsData.winner_id) {
			$('#winner').text(" "+competitor.name+"("+competitor.country_code+")");
		}
	});
}
function initialDate(data) {
	document.getElementById('date').textContent = data[0].date;
	displayInfo(data[0]);
}
//to set the view of the map according to selected date on the slider
function filterBy(sportsdata) {
    initialDate(sportsdata); //to fill display the information when the page is loaded
    document.getElementById('slider').addEventListener('input', function(e) {
        var this_date = parseInt(e.target.value, 10);
        var this_id = sportsdata[this_date].id;
        console.log(this_id);
        document.getElementById('date').textContent = sportsdata[this_date].date;
        console.log(sportsdata[this_date].venue);
        map.setView([sportsdata[this_date].venue.lat,sportsdata[this_date].venue.lng],17);
        popUp(sportsdata[this_date].venue.lat,sportsdata[this_date].venue.lng,sportsdata[this_date]);
		displayInfo(sportsdata[this_date]);
    });
}
//the viewmodel
var viewModel = function() {
	var self = this;
	self.venues = ko.observableArray([]);
	self.soccerData = ko.observableArray([]);
	initialData.forEach(function(data) {
    	self.soccerData.push(data);
    });
    console.log(self.soccerData());
    filterBy(self.soccerData());
};
ko.applyBindings(new viewModel());
