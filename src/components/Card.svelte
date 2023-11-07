<script>
import Icon from '@iconify/svelte';
import {moveRight} from '../store/store';
export let card;
let propStyle = $$props.style;

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

<div bind:this={cardElement} >
    <header on:mousedown={startDrag} on:mousemove={moveCard} on:mouseup={stopDrag}>
    </header>
    <h1>{card.title}</h1>
</div>

<style lang="scss">
    div {
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 0 1em 0 rgba(255, 255, 255, 0.2);
        border-radius: 1em;
        width:100%;
        height: 100%;
        backdrop-filter: blur(.3em);
        overflow:hidden;

        header {
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255, 255, 255, 0) 100%);            display: flex;
            height: 2.5em;
            justify-content: flex-end;
            transition: all .5s ease;
            cursor:pointer;
        }

        h1 {
            color: black;
        }
    }
</style>