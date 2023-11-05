<script>
import Card from "./Card.svelte";
import {store} from "../store/store";


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
    padding: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>