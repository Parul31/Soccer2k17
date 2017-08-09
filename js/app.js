var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders
             };

var myRequest = new Request('https://api.sportradar.us/soccer-t3/intl/en/tournaments/sr:tournament:477/results.json?api_key=4k6cumz6ek9a5zehvqen7v66', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  // var objectURL = URL.createObjectURL(myBlob);
  // myImage.src = objectURL;
  console.log(myBlob);
});
data = [
	{
		header: "221b Baker St.",
		para: "November 1895. London is shrouded in fog and Sherlock Holmes and Watson pass time restlessly awaiting a new case. \"The London criminal is certainly a dull fellow,\" Sherlock bemoans. \"There have been numerous petty thefts,\" Watson offers in response. Just then a telegram arrives from Sherlock's brother Mycroft with a mysterious case."
	},
	{
		header: "Aldgate Station",
		para: "Arthur Cadogan West was found dead, head crushed in on train tracks at Aldgate Station at 6AM Tuesday morning. West worked at Woolwich Arsenal on the Bruce-Partington submarine, a secret military project. Plans for the submarine had been stolen and seven of the ten missing papers were found in West's possession. Mycroft implores Sherlock to take the case and recover the three missing papers."
	},
	{
		header: "London Bridge",
		para: "Holmes and Watson's investigations take them across London. Sherlock deduces that West was murdered elsewhere, then moved to Aldgate Station to create the illusion that he was crushed on the tracks by a train. On their way to Woolwich Sherlock dispatches a telegram to Mycroft at London Bridge: \"Send list of all foreign spies known to be in England, with full address.\""
	}
];
mapboxgl.accessToken = 'pk.eyJ1IjoicGFydWwzMSIsImEiOiJjajYxemtxcDAweXVuMnFuejlwMXp5OXJ2In0.Ur-gLsJ8I1IgDQGNhSWRsg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/satellite-streets-v10'
});
var sections = function(data) {
	this.heading = data.header;
	this.desc = data.para;
}
var viewModel = function() {
	var self = this;
	this.display = ko.observableArray([]);
	data.forEach(function(info) {
		self.display.push(new sections(info));
	});
	console.log(self.display());
}
ko.applyBindings(new viewModel());
