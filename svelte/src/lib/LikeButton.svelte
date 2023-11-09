<script lang="ts">
    function onLoad(){
        let icons = document.getElementsByClassName("ion-icon");
        for (let i = 0; i < icons.length; i++) {
            const icon = icons.item(i) as HTMLDivElement;
            icon.onclick = function () {
                icon.classList.toggle("active");
            }
        }
        
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="10px"
    height="10px"
    class="likeBtn"
    viewBox="0 0 512 512"
    on:click={(ev)=>{
        ev.currentTarget.classList.toggle("active");
    }}
    ><path
        d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
    />
    <div class="red-bg" />
    <dummy class="active">
</svg>

<style>
    .active {
        animation: like 0.5s 1;
        stroke: red;
        stroke: none;
    }
    .likeBtn {
        fill: transparent;
        stroke: black;
        stroke-width: 30;
        transition: all 0.5s;
    }

    .red-bg {
        background-color: red;
        display: inline-block;
        width: 10px;
        height: 10px;
    }

    @keyframes like {
        0% {
            transform: scale(1);
            fill:transparent
        }
        90% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1.1);
        }
    }
</style>
