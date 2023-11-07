<script>
  import Card from "./Card.svelte";
  import { store } from "../store/store";
  import AddButton from "./AddButton.svelte";
  import TimeComponent from "./widgets/Time.svelte";

  const componentMap = {
    Time: TimeComponent,
  };

  function getComponent(card) {
    return componentMap[card.component] || null;
  }
</script>

<section>
  {#each $store.cards as card, index (index)}
    <!-- <Card {card} /> -->
    <p>{card.component}</p>
    <svelte:component this={getComponent(card)} {card} />

    <!-- <svelte:component this={card.component} /> -->
  {/each}
  <AddButton />
</section>

<style lang="scss">
  section {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
