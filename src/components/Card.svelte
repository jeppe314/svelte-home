<script>
import Icon from '@iconify/svelte';
export let card;

let cardElement
let dragging = false
let initialMouseX, initialMouseY, initialElementX, initialElementY

const startDrag = (e) => {
    dragging = true;
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;
    initialElementX = cardElement.offsetLeft;
    initialElementY = cardElement.offsetTop;
}

const moveCard = (e) => {
    if (dragging) {
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;
        cardElement.style.left = `${initialElementX + dx}px`;
        cardElement.style.top = `${initialElementY + dy}px`;
    }
}

const stopDrag = () => {
    dragging = false;
}

</script>

<div bind:this={cardElement} on:mouseup={stopDrag} style="position: absolute;">
    <header on:mousedown={startDrag} on:mousemove={moveCard}><Icon icon="material-symbols:drag-handle" color="gray" width="2em" height="2em"/>
</header>
    <h1>{card.name}</h1>
</div>

<style lang="scss">
    div {
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 0 1em 0 rgba(255, 255, 255, 0.2);
        border-radius: 1em;
        width:300px;
        height: 400px;
        backdrop-filter: blur(.3em);
        overflow:hidden;

        header {
            display: flex;
            padding:.5em;
            justify-content: flex-end;
            cursor: pointer;
            transition: all .5s ease;
            &:hover {
                background-color: rgba(70, 131, 180, 0.256);
            }

        }

        h1 {
            color: black;
        }
    }
</style>