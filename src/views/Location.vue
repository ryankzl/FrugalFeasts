<template>
  <section class="p-5 background">
    <div class="mx-auto d-flex align-items-center justify-content-center text-center" style="flex-direction: column;">
      <div class="card w-40" style="max-width: 700px; background-color: grey; padding: 20px;">
        <div class="card-header bg-dark project-name" id="header">
          <h5 class="text-white fw-bold">Results</h5>
        </div>
      <GMapMap
        :center="center"
        :zoom="15"
        map-type-id="terrain"
        style="width: 50vw; height: 300px"
        ref="myMapRef"
        :clickable="false"
      >
        <GMapMarker 
          v-if="userMarkerLocation"
          :position="userMarkerLocation.position"
          :clickable="userMarkerLocation.clickable"
          :icon="userMarkerLocation.icon"
        />
        <GMapMarker
          :key="index"
          v-for="(bakery, index) in bakeries"
          :position="bakery.geometry.location"
          :clickable="true"
          @click="showBakeryDetails(bakery)"
          @rightclick="getDirections()"
          :id="bakery.place_id"
        />
        <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="infowindowMarkerId !== null"
          style="width: 300px; height: 100px"
          :position="infoCoordinates"
        >
          <div>
            <h4 style="font-family: Arial, Helvetica, sans-serif;">{{ selectedPlaceName }}</h4>
            <p>{{ selectedPlaceAddress }}</p>
            <p><a :href="link">View on Google Maps</a></p>
          </div>
        </GMapInfoWindow>
      </GMapMap>
    </div>
    
	<StoreCards></StoreCards>

  </div>
  </section>
  
</template>

<script>

import StoreCards from "../components/StoreCards.vue"

export default {
  name: 'Location',
  components:{
	StoreCards,
  },
  data() {
    return {
      center: { lat: 1.3521, lng: 103.8198 },
      locationSearch: this.$route.params.postalCode,
      bakeries: [],
      infoCoordinates: null,
      selectedPlaceName: "",
      selectedPlaceAddress: "",
      link: "",
      service: null,
      infowindowMarkerId: null,
      userMarkerLocation: null,
      directionsRenderer: null,
      targetPlaceIds: [
        'ChIJOWmPzaUZ2jERtgmyBock1Y4', 
        'ChIJfwEEIqYZ2jER7KGqeEBPVLw', 
        'ChIJMUALI68Z2jER6yrUp2Z11Xk'
      ], // Add your target place IDs here

    };
  },
  methods: {
    async loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    // Check if the google object is already defined
    if (typeof google !== 'undefined') {
      resolve();
    } else if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
      // Check if the API script is already in the DOM
      // If it is, wait for it to load
      const checkForScript = () => {
        if (typeof window.google !== 'undefined') {
          resolve();
        } else {
          setTimeout(checkForScript, 100);
        }
      };
      checkForScript();
    } else {
      // Create a script element for the Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      // Set up a callback function to resolve the promise when the script is loaded
      script.onload = resolve;
      script.onerror = reject;

      // Add the script to the document's head
      document.head.appendChild(script);
    }
  });
},

    async initMap() {
      const map = await this.$refs.myMapRef.$mapPromise;
      this.service = new google.maps.places.PlacesService(map);
    },
    async fetchNearbyBakeries() {
      const address = this.locationSearch;
      const geocoder = new google.maps.Geocoder();

      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(results);
            console.log(results);
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      });

      const userLocation = results[0].geometry.location;
      this.userMarkerLocation = {
        position: userLocation,
        clickable: true,
        icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      };
      console.log('Latitude:', userLocation.lat());
      console.log('Longitude:', userLocation.lng());
      const map = await this.$refs.myMapRef.$mapPromise;
      map.setCenter(userLocation);
      this.service = new google.maps.places.PlacesService(map);

      const nearbyResults = await new Promise((resolve) => {
        this.service.nearbySearch({
          location: userLocation,
          radius: 1000,
          type: 'bakery',
        }, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
          }
        });
      });

      // Create markers for nearby bakeries
      console.log(nearbyResults);
      this.bakeries = nearbyResults;
       // Filter out and create a marker only for the desired bakery
      // this.bakeries = nearbyResults.filter(bakery => bakery.place_id === 'ChIJOWmPzaUZ2jERtgmyBock1Y4');
      this.bakeries = nearbyResults.filter(bakery => this.targetPlaceIds.includes(bakery.place_id));

    },
    showBakeryDetails(bakery) {
      this.infowindowMarkerId = bakery.place_id;
      const request = {
        placeId: bakery.place_id,
        fields: ['name', 'place_id', 'formatted_address', 'geometry'],
      };

      const place = new Promise((resolve) => {
        this.service.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
            this.selectedPlaceAddress = place.formatted_address;
            this.selectedPlaceName = place.name;
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            this.infoCoordinates = { lat: latitude, lng: longitude };
            console.log(this.infoCoordinates);

            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`;
            this.link = googleMapsLink;
          }
        });
      });
    },
    openMarker(id) {
      this.infowindowMarkerId = id;
    },
    getDirections() {
      const directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      directionsService.route(
        {
          origin: this.userMarkerLocation.position,
          destination: this.infoCoordinates,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === "OK") {
            this.directionsRenderer.setDirections(response);
          }
          else {
            window.alert("Directions request failed due to " + status);
          }
        });
    },
  },
  created() {
  // Call the loadGoogleMaps method to load the Google Maps API
  this.loadGoogleMaps(import.meta.env.VITE_GOOGLE_MAP_API_KEY)
    .then(() => {
      // The Google Maps API is now loaded and ready to use
      this.initMap();
      this.fetchNearbyBakeries();
    })
    .catch((error) => {
      console.error('Failed to load Google Maps API:', error);
    });
}
  // created() {
  //   // Call the initMap function to initialize the map and services
  //   this.initMap();
  //   // Fetch nearby bakeries based on the postal code received as a prop
  //   this.fetchNearbyBakeries();
  // },
};
</script>


<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    height: 100%;
}
.body{
    display: flex;
    justify-content: right;
    align-items: center;
    height: calc(100vh - 100px);			
}
</style>