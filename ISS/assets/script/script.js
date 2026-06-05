/***************
  MAP LEAFLET
***************/
//EXO 1.1
const map = L.map('map').setView([0, 0], 5); 

// EXO 1.2
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker = L.marker([0, 0]).addTo(map);

let circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

let polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// let popup = L.popup()
//     .setLatLng([51.513, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

map.on('click', onMapClick);

let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

// EXO 1.3
const ISS_ICON = L.icon({
    iconUrl: '../../assets/img/international-space-station-icon.png', 
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
});

// EXO 1.4
const MARKER = L.marker([51.5, -0.09], {icon: ISS_ICON}).addTo(map);

/*******************
  SUIVI ISS
*******************/

// EXO 2.1 et EXO 2.2
function issAPI(map,MARKER) {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
            let lat = data['iss_position']['latitude'];
            let lon = data['iss_position']['longitude'];
        
            // See leaflet docs for setting up icons and map layers
            // The update to the map is done here:
            MARKER.setLatLng([lat, lon]);
            circle.setLatLng([lat, lon]);
            map.panTo([lat, lon], animate=true); 
        });
    try{ 
        division(); 
        }catch(err){ 
        alert(err.message); 
        }finally{ 
        alert(`Ce message s'affichera quoiqu'il arrive`); 
        }     
        setInterval(issAPI(map,MARKER), 1000); //EXO 2.3
}

/***************
  METEO LOCALE
***************/
// EXO 3.1