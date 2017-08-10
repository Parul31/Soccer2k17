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
	    }
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
		}
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
		}
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
		}
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
		}
	}

];

var map;
var marker;
var popup ;
function initMap() {
	L.mapbox.accessToken = 'pk.eyJ1IjoicGFydWwzMSIsImEiOiJjajYxemtxcDAweXVuMnFuejlwMXp5OXJ2In0.Ur-gLsJ8I1IgDQGNhSWRsg';
	map = L.mapbox.map('map')
		.setView([52.236667,6.837500],17);
	popup = L.popup()
        .setLatLng([52.236667,6.837500])
        .setContent("<h3>Grolsch Veste Stadium</h3>")
        .openOn(map);
	

	// Use styleLayer to add a Mapbox style created in Mapbox Studio
	L.mapbox.styleLayer('mapbox://styles/parul31/cj66ev2y377av2sn4uy2t6pk1').addTo(map);


	// map.on('load',function() {
	// 	addIcon(52.236667,6.837500,"This is some desc");	
	// })
	map.on('load',function() {

	})
}
initMap();
function popUp(lat,lng,sportsdata) {

// var latitude;
// var longitude;
map.on('click', function(e) {
	var this_lat=Math.floor(lat*10000)/10000;
	var this_lng=Math.floor(lng*10000)/10000;
    var latitude = Math.floor(e.latlng.lat*10000)/10000;
    var longitude = Math.floor(e.latlng.lng*10000)/10000;
    console.log(this_lat + " - " + this_lng);
    console.log(latitude + " - " + longitude);
    if((this_lat==latitude) && (this_lng==longitude)) {
		console.log('insideif');
		popup = L.popup()
        .setLatLng([this_lat,this_lng])
        .setContent("<h3>"+sportsdata.venue.name+"</h3>")
        .openOn(map);
	}
  });
}
function displayInfo(currentSportsData) {
	var heading = currentSportsData.date+" @"+currentSportsData.time;
	var desc = currentSportsData.venue.name;
	$('#display-heading').text(heading);
	$('#display-desc').text(desc);
}
function initialDate(data) {
	document.getElementById('date').textContent = data[0].date;
	displayInfo(data[0]);
}
function filterBy(sportsdata) {
    initialDate(sportsdata);
    document.getElementById('slider').addEventListener('input', function(e) {
  	
        var this_date = parseInt(e.target.value, 10);
        var this_id = sportsdata[this_date].id;
        console.log(this_id);
        // filterBy(dates[this_date].date);
        document.getElementById('date').textContent = sportsdata[this_date].date;
        console.log(sportsdata[this_date].venue);
        map.setView([sportsdata[this_date].venue.lat,sportsdata[this_date].venue.lng],17);
        popUp(sportsdata[this_date].venue.lat,sportsdata[this_date].venue.lng,sportsdata[this_date])
		displayInfo(sportsdata[this_date]);
    });
}

// data = [
// 	{
// 		header: "221b Baker St.",
// 		para: "November 1895. London is shrouded in fog and Sherlock Holmes and Watson pass time restlessly awaiting a new case. \"The London criminal is certainly a dull fellow,\" Sherlock bemoans. \"There have been numerous petty thefts,\" Watson offers in response. Just then a telegram arrives from Sherlock's brother Mycroft with a mysterious case."
// 	},
// 	{
// 		header: "Aldgate Station",
// 		para: "Arthur Cadogan West was found dead, head crushed in on train tracks at Aldgate Station at 6AM Tuesday morning. West worked at Woolwich Arsenal on the Bruce-Partington submarine, a secret military project. Plans for the submarine had been stolen and seven of the ten missing papers were found in West's possession. Mycroft implores Sherlock to take the case and recover the three missing papers."
// 	},
// 	{
// 		header: "London Bridge",
// 		para: "Holmes and Watson's investigations take them across London. Sherlock deduces that West was murdered elsewhere, then moved to Aldgate Station to create the illusion that he was crushed on the tracks by a train. On their way to Woolwich Sherlock dispatches a telegram to Mycroft at London Bridge: \"Send list of all foreign spies known to be in England, with full address.\""
// 	}
// ];

// var sections = function(data) {
// 	this.heading = data.header;
// 	this.desc = data.para;
// }

var viewModel = function() {
	var self = this;
	
	self.venues = ko.observableArray([]);
	self.soccerData = ko.observableArray([]);
	initialData.forEach(function(data) {
    	self.soccerData.push(data);
    })
    console.log(self.soccerData());
    // console.log(self.inputSlider());
    filterBy(self.soccerData());

	
	// this.display = ko.observableArray([]);
	// data.forEach(function(info) {
	// 	self.display.push(new sections(info));
	// });
	// console.log(self.display());
}
ko.applyBindings(new viewModel());
