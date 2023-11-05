<template>

    <div class="container-fluid border border-danger border-5 game">

        <h1>This is the Games page</h1>
        <hr>
        <h1>Keys: {{ keys }}</h1>
        <!-- <h1>Wins: {{ wins }}</h1>
        <h1>Losses: {{ losses }}</h1>
        <h1>Total Games Played: {{ totalGames }}</h1> -->
        <!-- <button v-on:click="fetchFireStoreData()">Click Me</button> -->
    </div>
 
</template>


<script>

import { db } from "../firebase";
import { collection, getDocs, query, where, getDoc, doc} from "../../node_modules/firebase/firestore";

export default{
    name: "Game",

    data(){
        return {
            keys: 0,
            wins: 0,
            losses: 0,
            totalGames: 0
        }
    },

    created() {
    // Call the fetchFireStoreData method when the component is created
    this.fetchFireStoreData();
    },


    methods: {
        async fetchFireStoreData(){
            const docRef = doc(db, "ryankzl001@gmai.com", "misc")
            // const userDoc = db.collection("ryankzl001@gmai.com").doc("misc");

            const docSnap = await getDoc(docRef);

            await getDoc(docRef)
                .then((snapshot) =>{
                    console.log(snapshot.data().keys)

                    this.keys = snapshot.data().keys
                   
                })
                .catch((error) => {
                    console.log(error)
                })

        }
    }
};

</script>

<style scoped>
.game{
    text-align: center;
    background-color: cyan;
    margin-top: 100px;
}

</style>