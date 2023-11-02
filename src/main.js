// Imports Bootstrap CSS & JS
import "../node_modules/bootstrap/dist/css/bootstrap.css"; 
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

// Imports nes.css
import "../node_modules/nes.css/css/nes.min.css";

// Create Router & App
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(router)

app.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCEylNlPDVXx01GS9tQYb9NZ1_2fpZVDPI",
        libraries: "places",
        callback: "initMap",
        V: "weekly",
    },
})

app.mount('#app')
