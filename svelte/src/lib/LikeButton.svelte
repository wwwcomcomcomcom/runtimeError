<script lang="ts">
    let icon = document.querySelector(".ionicon");
    let icons = document.getElementsByClassName("ion-icon")
    console.log(icon);
    // icon.onclick = function () {
    //     icon.classList.toggle("active");
    // }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="10px"
    height="10px"
    class="ion-icon"
    viewBox="0 0 512 512"
    ><path
        d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
    />
    <div class="red-bg" />
</svg>

<style>
    .large-font {
        font-size: xxx-large;
    }
    .top-20 {
        position: relative;
        top: 20vh;
    }
    .ion-icon.active {
        animation: like 0.5s 1;
        fill: red;
        stroke: none;
    }
    .ion-icon {
        fill: transparent;
        stroke: black;
        stroke-width: 30;
        transition: all 0.5s;
    }

    @-webkit-keyframes like {
        0% {
            transform: scale(1);
        }
        90% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1.1);
        }
    }
</style>
