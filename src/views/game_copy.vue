<template>
	<div class="background">
		<div class="container-fluid body">

			<div class="container-fluid flex game">
				<!-- First Row -->
				<div class="keys">
					<img src="../assets/game_key.png" id = "key">:{{ keys }}
				</div>
				<img src="../assets/game_chest.png" id="chest">

				<div class="details">
					Boxes Opened:{{ totalBoxes }}
					Vouchers Won:{{ win }}
				</div>
				<!-- Second Row -->
				<div class="play">
					<!-- Would like to put a turn key here -->
					<img src="../assets/game_key.png" id = "unlock">
					<input type="range" id="slider" min="0" max="180" value="0" @input="rotateKey">
					Turn Key To Unlock 

				</div>
					
				
			</div>
		</div>

		
	</div>
     
</template>


<script>
	import { auth } from "../firebase";
	import { db } from "../firebase";
    import { getDoc, doc} from "../../node_modules/firebase/firestore";


    export default{
        name: "Game",

        data(){
            return {
				
                keys: 0,
                win: 0,
                loss: 0,
                totalBoxes: 0,
				
            }
        },

        created() {
        // Call the fetchFireStoreData method only when the component is created
			auth.onAuthStateChanged((user) => {
				if (user) {
					this.fetchFireStoreData();
				} else {
					console.log("No user is currently logged in.");
					
				}
			});			
        },

        methods: {
            async fetchFireStoreData(){
				console.log(auth.currentUser)
				const userEmail = auth.currentUser.email;
                const docRef = doc(db, userEmail, "gameInfo")

				try {
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()){
						const data = docSnap.data();
						this.keys = data.keys
						this.win = data.win
						this.loss = data.loss
						this.totalBoxes = this.win + this.loss
					}
					else {
						console.log("This doc does not exist")
					}
				}

				catch (error) {
					console.log(error)
				}
             
            },
        }
    };
	


</script>

<style scoped>
.background{
    background-image: url("../assets/background.png");
    background-repeat: no-repeat;
    background-size: cover;  
    height: calc(100vh - 100px);
}
.body{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 100px);			
}
.game{
    background-color: rgba(245, 245, 220, 0.9);
    padding: 2%;
    width: 90%;
	height: 90%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
	display: grid;
    grid-template-columns: 1fr 3fr 1fr; /* Three columns */
    grid-template-rows: 2fr 1fr ;
}

#chest{
	grid-column: 2 / 3; /* This places the chest in the second column */
    justify-self: center; 
	grid-row: 1;

	/* Size of Image */
	width: 400px;
	height: auto;
	
}
.details{
	grid-column: 3 / 4; /* This places the details in the third column */
    justify-self: start;
	grid-row: 1;
}


.play{
	grid-column: 2/3;
	grid-row: 2;
	justify-self: center;
	display: grid;
	justify-content: center;
	padding: 0;
	align-self: start;

}
#unlock{
	justify-content: center;
}

.keys{
	grid-column: 1 / 3 ;
	justify-self: start;
	grid-row: 1;
}
#key{
	width: 100px;
	height: auto;
}



</style>