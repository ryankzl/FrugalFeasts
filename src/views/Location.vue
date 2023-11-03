<template>

    <div class="container-fluid location background">

        <h1>Location Page</h1>

        <section class="ui two column centered grid">
        <div class="column">
            <form class=" ui segment large form">
                <div class=" ui message red" v-show="error">{{ error }}</div>
                <div class=" ui segment">
                    <div class="field">
                        <div class=" ui right icon input large" :class="{loading:spinner}">
                            <input type="text" placeholder="Enter your Address" v-model="address" />
                            <button type="button" @click="locatorButtonPressed">Click Me</button>
                        </div>
                    </div>
                    <button class=" button">Go</button>
                </div>
            </form>
        </div>
        </section>
    </div>

    <div class="map-container">
      <GMapMap
        :center="center"
        :zoom="7"
        map-type-id="terrain"
        style="width: 500px; height: 300px; margin-top: 200px;"
    >
      <GMapCluster>
        <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
        />
      </GMapCluster>
      </GMapMap>
    </div>
 
</template>


<script>

// import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      center: {lat: 51.093048, lng: 6.842120},
      markers: [
        {
          position: {
            lat: 51.093048, lng: 6.842120
          },
        }
        , // Along list of clusters
      ]
    }
  },
  // data() {
  //   return {
  //     address: "",
  //     error:"",
  //     spinner: false,
  //   }
  // },

//   methods: {
//     locatorButtonPressed() {

//       this.spinner = true;

//       if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             this.getAddressFrom(position.coords.latitude, position.coords.longitude)

//         },
//         error => {
//           this.error = "Locator is unable to find the address. Please type your address manually";
//           this.spinner = false;
//           // console.log( error.message);
//         }
//         );
//       } else {
//         this.error = error.message;
//         this.spinner = false;
//         console.log("Your browser does not support geolocation API ");
//       }
//     },

//     getAddressFrom(lat, long) {
//       axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="
//        + lat + 
//        ","
//         + long  
//         + "&key=AIzaSyCXenSAdvj3jGWFGvml0kABzIiop3P30ck")
//         .then(response => {
//           if(response.data.error_message) {
//             console.log(response.data.error_message);
//           } else {
//             this.address = response.data.results[0].formatted_address
//               // console.log(response.data.results[0].formatted_address);
//           }
//       })
//       .catch(err => {
//         console.log(error.message);
//       })
//     }
  }
// }
// import leaflet from 'leaflet';
// import { onMounted, ref } from 'vue';
// import GeoErrorModal from '@/components/GeoErrorModal.vue';
// import MapFeatures from '@/components/MapFeatures.vue';
// export default {
//     name: "Location",
//     components: { GeoErrorModal, MapFeatures },
//     setup() {
//         let map;
//         onMounted(() => {
//             // init map
//             map = leaflet.map('map').setView([51.505, -0.09], 13);

//             // add tile layers
//             leaflet
//             .tileLayer(
//                 `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
//                 {
//                     attribution: 
//                         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//                     maxZoom: 18,
//                     id: "mapbox/streets-v11",
//                     tileSize: 512,
//                     zoomOffset: -1,
//                     accessToken: process.env.VUE_APP_API_KEY,
//                 }
//             )
//             .addTo(map);

//             getGeolocation();
//         })

//         const coords = ref(null);
//         const fetchCoords = ref(null);
//         const geoMarker = ref(null);
//         const geoError = ref(null);
//         const geoErrorMsg = ref(null);

//         const getGeolocation = () => {
//             if (coords.value) {
//                 coords.value = null;
//                 sessionStorage.removeItem("coords");
//                 map.removeLayer(geoMarker.value);
//                 return;
//             }
//             //check session storage for coords
//             if (sessionStorage.getItem('coords')) {
//                 coords.value = JSON.parse(sessionStorage.getItem('coords'));
//                 plotGeoLocation(coords.value);
//                 return;
//             }
//             fetchCoords.value = true;
//             navigator.geolocation.getCurrentPosition(setCoords, getLocError);
//         };

//         const setCoords = (pos) => {
//             // stop fetching coords
//             fetchCoords.value = null;

//             //set coords in session storage
//             const setSessionCoords = {
//                 lat: pos.coords.latitude,
//                 lng: pos.coords.longitude,
//             };

//             sessionStorage.setItem("coords", JSON.stringify(setSessionCoords));

//             //set ref coords value
//             coords.value = setSessionCoords;

//             plotGeoLocation(coords.value);
//         };

//         const getLocError = (err) => {
//             fetchCoords.value = null;
//             geoError.value = true;
//             geoErrorMsg.value = err.message;
//         };

//         const plotGeoLocation = (coords) => {
//             // create custom marker
//             const customMarker = leaflet.icon({
//                 iconUrl : require('../assets/map-marker-red.svg'),
//                 iconSize: [35, 35],
//             });

//             // create new marker with coords and custom icon
//             geoMarker.value = leaflet.marker([coords.lat, coords.lng], { icon: customMarker }).addTo(map);

//             //setting map view to current location
//             map.setView([coords.lat, coords.lng], 10);
//         };

//         const closeGeoError = () => {
//             geoError.value = null;
//             geoErrorMsg.value = null;
//         };

//         return { coords, fetchCoords, geoMarker, closeGeoError, geoError, geoErrorMsg, getGeolocation, };
//     },
// };
</script>

<style scoped>
.location {
    text-align: center;
    padding-top: 100px;
}

/* Center the form in the middle column */
/* .ui.two.column.centered.grid {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;
}

.ui.segment.large.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

/* Style for buttons */
 .button,
 .circle.icon {
    background-color: red;
    color: white;
} 

.background {
    background-image: url("../assets/home_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 100px;
    height: 100vh;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}


</style>
