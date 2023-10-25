<template>

    <div class="container-fluid border border-danger border-5 location background">

        <h1>Location Page</h1>

        <section class="two column centered grid">
        <div class="column">
            <form class=" segment large form">
                <div class=" message red" v-show="error">{{error}}</div>
                <div class=" segment">
                    <div class="field">
                        <div class=" right icon input large">
                            <input type="text" placeholder="Enter your Address" />
                            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                        </div>
                    </div>
                    <button class=" button">Go</button>
                </div>
            </form>
        </div>
    </section>

    </div>
 
</template>


<script>
export default {
    name: "Location",
    methods: {
        locatorButtonPressed() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        console.log(position.coords.latitude);
                        console.log(position.coords.longitude);
                    },
                    error => {
                        this.error = error.message;
                    }
                );
            } else {
                this.error = "Your browser does not support geolocation API";
            }
        }
    }
};
</script>

<style scoped>
.location {
    text-align: center;
    padding-top: 100px;
}

/* Center the form in the middle column */
.two.column.centered.grid {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25vh;
}

.segment.large.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

/* Style for buttons */
.button {
    background-color: red;
    color: white;
}

/* Style for dot circle icon */
.dot.circle.icon {
    /* Define your styles here */
}

.background {
    background-image: url("../assets/home_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 100px;
    height: 100vh;
}
</style>
