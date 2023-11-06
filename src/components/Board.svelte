<script>
import Card from "./Card.svelte";
import {store} from "../store/store";

// TODO: Render components dynamically from store objects from components array
</script>

<section class="grid" >
    {#each $store.cards as card, index (index)}
        <Card card={card}/>
    {/each}
</section>

<style lang="scss">
section {
    outline: 1px solid lime;
    height: 100%;
    width:100%;
    // padding: 2em;
    display: grid;
    grid-template-columns: repeat(36, 1fr);
    grid-template-rows: repeat(12, 1fr);
    &:hover {
        // this for edit mode perhaps (gridl lines)
        background-image: 
            linear-gradient(0deg, #b7b7b72d 1px, transparent 1px), 
            linear-gradient(90deg, #b7b7b72d 1px, transparent 1px);
        background-size: calc(100vw / 36) calc(100vh / 12);
        
    }
    // gap:1em;
    div  {
        background: steelblue;
    }
}
</style>