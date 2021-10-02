// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson

var equake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
d3.json(equake_url).then(function(quake_list){
    

 // Create the tile layer that will be the background of our map.
 var worldmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// Create a baseMaps object to hold the streetmap layer.
// var baseMaps = {
//   "World Map": worldmap
// };

// Create an overlayMaps object to hold the bikeStations layer.
// var overlayMaps = {
//   "Bike Stations": bikeStations
// };
 // Pull the "stations" property from response.data.
 var quakes = quake_list.features;
//console.log(quakes[0])

//  // Initialize an array to hold bike markers.
//  var bikeMarkers = [];
var quake_markers = [];
var map = L.map("map", {
    center: [40.73, -54.0059],
    zoom: 4,
    layers: [worldmap]
});

//  // Loop through the stations array.
//  for (var index = 0; index < stations.length; index++) {
//    var station = stations[index];
for (var i = 0; i < quakes.length; i++){
    var d = quakes[i].geometry.coordinates[2]
    if(255 - d*10 < 0){
        g = 0}
        else{
            g= 255 -d*10}

    
    var rgb = 'rgb(0,'+g+',0)'
    var title = quakes[i].properties.title
    var alert = quakes[i].properties.alert
    var q_mark =L.circle([quakes[i].geometry.coordinates[1],quakes[i].geometry.coordinates[0]],{
        color: 'black',
        fillColor: rgb,
        fillOpacity: 0.7,
        radius: quakes[i].properties.mag * 50000
    }).addTo(map).bindPopup("<h1>"+title+"</h1><hr><h2>Alert: "+alert+"</h2>");

    console.log(quakes[i].geometry.coordinates[0],quakes[i].geometry.coordinates[1]);
    
    
}
console.log(quake_markers);
/* var shake = L.layerGroup(quake_markers, {
    radius: 20,
    blur: 35
  });

  var map = L.map("map", {
    center: [40.73, -54.0059],
    zoom: 4,
    layers: [worldmap, shake]
}); */




//createMap(L.layergroup(quake_markers));

//    // For each station, create a marker, and bind a popup with the station's name.
//    var bikeMarker = L.marker([station.lat, station.lon])
//      .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

//    // Add the marker to the bikeMarkers array.
//    bikeMarkers.push(bikeMarker);
//  }
    
//  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//  createMap(L.layerGroup(bikeMarkers));

// Create the map object with options.

});

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(map);


