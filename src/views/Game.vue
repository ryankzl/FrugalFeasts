<template>
	<div class="background">
		<div class="container-fluid body">

			<div class="container-fluid flex game">
				<!-- First Row -->

				<div class="details1">
					Keys Required: 5
				</div>

				<div class="keys">
					<img src="../assets/game_key.png" id = "keys">:{{ keys }}
				</div>

				<div class="chest">
					<img src="../assets/game_chest.png" id="chest">
				</div>

				<div class="details">
					Boxes Opened:{{ totalBoxes }}
					Vouchers Won:{{ win }}
				</div>
				
				<!-- Second Row -->
				<!-- <div class="play">
					<img src="../assets/game_key.png" id = "unlock">
					<input type="range" id="slider" min="0" max="180" value="0" @input="rotateKey">
					Turn Key To Unlock 
				</div> -->
			

				<div class="play">
					<section>
						<button type="button" class="nes-btn is-primary" @click="shakeElement() ; unlockChest()" v-if="enoughKeys">
							Unlock Me!
						</button>

						<dialog class="nes-dialog is-dark is-rounded" id="dialog-dark-rounded">
							<form method="dialog">
							
							<div v-if="determineWin()">
								<h1>You Won!</h1>
								<img src="../assets/game_voucher.png" style="height: 300px; width: auto;">
								<p>View Vouchers In 
									<router-link to="/Profile"> Profile </router-link>
								</p>
								<button class="nes-btn ">Claim</button>
							</div>

							<div v-else>
								<h1>You Loss!</h1>
								<p>Boo Hoo :P</p>	
								<button class="nes-btn ">Try Again</button>
							</div>
							
							</form>
						</dialog>
					</section>
					<!-- <button class="nes-btn" @click="shakeElement() ; unlockChest()" v-if="enoughKeys">Unlock Me!</button> -->
					<button class="nes-btn is-error is-disabled" v-if="!enoughKeys">Not Enough Keys!</button>
				</div>
					
				
			</div>
		</div>

		
	</div>
     
</template>


<script>
	import { auth } from "../firebase";
	import { db } from "../firebase";
    import { getDoc, doc, updateDoc, increment} from "../../node_modules/firebase/firestore";


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
		computed: {
            enoughKeys() {
                return this.keys >= 5;
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
			shakeElement() {
				const gameContainer = this.$el.querySelector('.game');
				gameContainer.classList.add('shake');

				// Remove the class after the animation ends
				setTimeout(() => {
					gameContainer.classList.remove('shake');
					this.openDialog();
				}, 2000); // The timeout should match the duration of the animation
			},

			// Random Generator
			determineWin() {
				// Assuming a 80% win rate for simplicity
				return Math.random() < 0.80
			},

			determineVoucher(){
				if (Math.random()<0.3){
					return 'voucher1';
				}
				else if (Math.random()<0.6){
					return 'voucher2';
				}
				else{
					return "voucher3";
				}
			},

			async unlockChest() {
				if (this.enoughKeys) {
					try {
						const userEmail = auth.currentUser.email;

						const docRefGame = doc(db, userEmail, "gameInfo");
						const isWin = this.determineWin();

						// Computing Win/Loss
						if (isWin){
							this.win += 1;
							const docRefVoucher = doc(db,userEmail, "vouchers");
							const voucherType = this.determineVoucher();
							// We can do error handling if there is time
							await updateDoc(docRefVoucher, {
								[voucherType]: increment(1), // Use the Firebase increment function to increase the voucher count
							});
						}
						else {
							this.loss +=1;
						}
						this.totalBoxes = this.win+ this.loss
						
						await updateDoc(docRefGame, {
							keys: this.keys - 5,
							totalBoxes: this.totalBoxes,
							win: this.win,
                    		loss: this.loss,
						});
						
						// Fetch the updated data to reflect changes in the UI
						this.fetchFireStoreData();
					} catch (error) {
						console.error("Error updating document: ", error);
					}
				} 
				else {
					// Handle case where there are not enough keys
					console.log("Not enough keys to unlock.");
				}
        	},
			
			openDialog() {
				// Assuming the dialog element has an id of 'dialog-dark-rounded'
				const dialog = this.$el.querySelector('#dialog-dark-rounded');
				if (dialog) {
					dialog.showModal();
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
    width: 85%;
	height: 85%;
    text-align: center;
    border-radius: 20px; 
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);

	display: grid;
	grid-template-rows: auto 2fr 1fr;
	grid-template-columns: 1fr 2fr 1fr;
}

#chest{
	width: 80%;
	height: auto;
}

.chest{
	grid-row: 2;
	grid-column: 2;
}

.details{
	grid-row: 1;
	grid-column: 3;
}

.keys{
	grid-row: 1;
	grid-column: 2;
}
.keys-required{
	grid-row: 1;
	grid-column: 1;
}

.play{
	grid-row:3;
	grid-column: 2;
}

/* Shaking Animation 1st Ver. Not As Shaky */
/* @keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0); }
    6.7% { transform: translateX(-5px) rotate(-2deg); }
    13.4% { transform: translateX(5px) rotate(2deg); }
    20.1% { transform: translateX(-10px) rotate(-4deg); }
    26.8% { transform: translateX(10px) rotate(4deg); }
    33.5% { transform: translateX(-15px) rotate(-6deg); }
    40.2% { transform: translateX(15px) rotate(6deg); }
    46.9% { transform: translateX(-20px) rotate(-8deg); }
    53.6% { transform: translateX(20px) rotate(8deg); }
    60.3% { transform: translateX(-25px) rotate(-10deg); }
    67% { transform: translateX(25px) rotate(10deg); }
    73.7% { transform: translateX(-20px) rotate(-8deg); }
    80.4% { transform: translateX(20px) rotate(8deg); }
    87.1% { transform: translateX(-15px) rotate(-6deg); }
    93.8% { transform: translateX(15px) rotate(6deg); }
} */
@keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0); }
    5% { transform: translateX(-20px) rotate(-10deg); }
    10% { transform: translateX(20px) rotate(10deg); }
    15% { transform: translateX(-40px) rotate(-20deg); }
    20% { transform: translateX(40px) rotate(20deg); }
    25% { transform: translateX(-60px) rotate(-30deg); }
    30% { transform: translateX(60px) rotate(30deg); }
    35% { transform: translateX(-80px) rotate(-40deg); }
    40% { transform: translateX(80px) rotate(40deg); }
    45% { transform: translateX(-100px) rotate(-50deg); }
    50% { transform: translateX(100px) rotate(50deg); }
    55% { transform: translateX(-80px) rotate(-40deg); }
    60% { transform: translateX(80px) rotate(40deg); }
    65% { transform: translateX(-60px) rotate(-30deg); }
    70% { transform: translateX(60px) rotate(30deg); }
    75% { transform: translateX(-40px) rotate(-20deg); }
    80% { transform: translateX(40px) rotate(20deg); }
    85% { transform: translateX(-20px) rotate(-10deg); }
    90% { transform: translateX(20px) rotate(10deg); }
    95% { transform: translateX(-10px) rotate(-5deg); }
}

.shake {
    animation: shake 2s;
	transform-origin: center; /* Center the rotation axis */
}
</style>