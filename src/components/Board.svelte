<script>
  import Card from "./Card.svelte";
    import {store} from "../store/store";

</script>

<section>
    {#each $store.cards as card (card.name)}
        <Card card={card} />
    {/each}
</section>

<style lang="scss">
section {
    outline: 1px solid lime;
    height: 100%;
    width:100%;
    padding: 2em;
}
</style>