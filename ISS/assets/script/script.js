/***************
  MAP LEAFLET
***************/
//Map Mayer Creation
const MAP = L.map('map').setView([0, 0], 5); 

//Add Tile Layer to Map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(MAP);

//Creation of ISS icon
const ISS_ICON = L.icon({
    iconUrl: '../../assets/img/international-space-station-icon.png', 
    iconSize:     [50, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
});

//Add marker ISS_ICON on Map
const MARKER = L.marker([0, 0], {icon: ISS_ICON}).addTo(MAP);
/*******************
  SUIVI ISS
*******************/
async function issAPI(map,marker){
    try{
        //Get Lat-long ISS from API via Fetch (RESPONSE catch JSON)
        const RESPONSE = await fetch('http://api.open-notify.org/iss-now.json');

        //Convert JSON to object
        const DATA = await RESPONSE.json();

        //ISS Coordenate
        const LAT = DATA.iss_position.latitude;
        const LONG = DATA.iss_position.longitude;

        // Set view os ISS coordonate
        map.setView([LAT,LONG],5);
        console.log(marker);

        //Set coordonate marker on ISS
        marker.setLatLng([LAT,LONG]);

    }catch(error){
        console.error(error);
    };
}

//Syntaxe Fetch().then()
function issAPIthen(map,marker){
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const LAT = DATA.iss_position.latitude;
            const LONG = DATA.iss_position.longitude;

            map.setView([LAT,LONG],5);

            marker.setLatLng([LAT,LONG]);
        })
        .catch(error => {
            console.error(error);
        });
}

//Follow in quasi real-time of ISS
setInterval(()=>{issAPI(MAP,MARKER)},1000); //EXO 2.3

/***************
  METEO LOCALE
***************/
//Creation of a paragraph
const PARAGRAPH = document.createElement("p");

//Paragraph Style
PARAGRAPH.style.height  = "300px";
PARAGRAPH.style.width  = "200px";
PARAGRAPH.style.margin  = "16px auto";
PARAGRAPH.style.border  = "3px solid grey";
PARAGRAPH.style.padding  = "16px 12px 24px";

//target .cardMeteo
const ARTICLE = document.querySelector(".cardMeteo");
const BUTTON = document.querySelector("button");
//Insert PARAGRAPH Before button
ARTICLE.insertBefore(PARAGRAPH,BUTTON);

//addInfo
function addInfo(HTMLElement, text){
    HTMLElement.innerText = text;
}

BUTTON.addEventListener("click", async(event) => {
    try{
        //Resquest METEO API
        const RESPONSE = await fetch('https://prevision-meteo.ch/services/json/toulouse');

        //Convert JSON to Objetct
        const DATA = await RESPONSE.json();

        console.log(DATA);

        const CURRENT_CONDITION = DATA.current_condition.condition;
        const CURRENT_TEMP = DATA.current_condition.tmp;
        const MAX_TEMP_DAY_0 = DATA.fcst_day_0.tmax;
        const MIN_TEMP_DAY_0 = DATA.fcst_day_0.tmin;

        const TEXT = `Condition : ${CURRENT_CONDITION} - Température actuelle : ${CURRENT_TEMP} -
            Température Maximale : ${MAX_TEMP_DAY_0} - 
            Température Minimale : ${MIN_TEMP_DAY_0}`

        addInfo(PARAGRAPH,TEXT);
    }catch(error){
        console.error(error);
    }
})