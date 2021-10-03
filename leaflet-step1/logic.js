

//Gather data for major earthquakes around the world within the past 30 days:
var equake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
d3.json(equake_url).then(function(quake_list){
    

 // Create world map barckground
 var worldmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//reduce json object to features level
 var quakes = quake_list.features;
//console.log(quakes[0])

//Display world map - arbitrary center; zoom out enough to see whole world.
var map = L.map("map", {
    center: [40.73, -54.0059],
    zoom: 2,
    layers: [worldmap]
});


// Loop through features to add circles on earthquake locations (sized according to magnitude) and colored according to depth.
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
   
}
});

