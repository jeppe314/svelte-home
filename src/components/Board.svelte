<script>
  import Card from "./Card.svelte";
  import { store } from "../store/store";
  import { flip } from "svelte/animate";

  // TODO: Render components dynamically from store objects from components
  const dragDuration = 300;
  let draggingSlot;
  let animatingSlots = new Set();
  let slots = Array(144)
    .fill()
    .map((_, i) => i + 1);

  function swapWith(slot) {
    if (draggingSlot === slot || animatingSlots.has(slot)) return;
    animatingSlots.add(slot);
    setTimeout(() => animatingSlots.delete(slot), dragDuration);
    const slotAIndex = slots.indexOf(draggingSlot);
    const slotBIndex = slots.indexOf(slot);
    slots[slotAIndex] = slot;
    slots[slotBIndex] = draggingSlot;
  }
</script>

<section class="grid">
  {#each slots as slot, i (slot)}
    <article
      style="display: grid; place-items:center;"
      animate:flip={{ duration: dragDuration }}
      class="slot"
      draggable="true"
      on:dragstart={() => (draggingSlot = slot)}
      on:dragend={() => (draggingSlot = undefined)}
      on:dragenter={() => swapWith(slot)}
      on:dragover|preventDefault
    >
      {slot}
    </article>
  {/each}
</section>

<style lang="scss">
  section {
    outline: 1px solid lime;
    height: 100%;
    width: 100%;
    // padding: 2em;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);

    // gap:1em;
    article {
      background: steelblue;
    }
  }
</style>
