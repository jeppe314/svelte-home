<script>
  import { store } from "../store/store";
  import { onMount } from "svelte";

  export let card;
  let cardElement;
  let initialMousePos = { x: 0, y: 0 };
  let dragging = false;

  onMount(() => {
    // Set initial card position from store
    const { x, y } = card.position || { x: 0, y: 0 };
    updateElementPosition(x, y);
  });

  // Consolidate repeated logic for updating the card's position
  const updateElementPosition = (x, y) => {
    cardElement.style.left = `${x}px`;
    cardElement.style.top = `${y}px`;
  };

  // Refactor to use a function to handle repetitive update logic
  const updateCardPosition = (dx, dy) => {
    store.update((storeState) => {
      const updatedCards = storeState.cards.map((c) => (c.id === card.id ? { ...c, position: { x: dx, y: dy } } : c));
      return { ...storeState, cards: updatedCards };
    });
  };

  // Add DRY principle by creating a function to add and remove event listeners
  const manageEventListeners = (add) => {
    const method = add ? "addEventListener" : "removeEventListener";
    window[method]("mousemove", moveCard);
    window[method]("mouseup", stopDrag);
  };

  const startDrag = (e) => {
    dragging = true;
    initialMousePos.x = e.clientX;
    initialMousePos.y = e.clientY;
    manageEventListeners(true);
  };

  const moveCard = (e) => {
    if (!dragging) return;

    const dx = e.clientX - initialMousePos.x + cardElement.offsetLeft;
    const dy = e.clientY - initialMousePos.y + cardElement.offsetTop;

    updateElementPosition(dx, dy);
    updateCardPosition(dx, dy);

    initialMousePos.x = e.clientX;
    initialMousePos.y = e.clientY;
  };

  const stopDrag = () => {
    dragging = false;
    manageEventListeners(false);
  };
</script>

<div bind:this={cardElement} class="card" on:mousedown={startDrag}>
  <!-- Card content -->
  <header />
  <h1>{card.title}</h1>
</div>

<style lang="scss">
  .card {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 1em 0 rgba(255, 255, 255, 0.2);
    border-radius: 1em;
    width: 200px;
    height: 400px;
    backdrop-filter: blur(0.3em);
    overflow: hidden;
    position: absolute;

    header {
      background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      display: flex;
      height: 2.5em;
      justify-content: flex-end;
      transition: all 0.5s ease;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }

    h1 {
      color: black;
      padding: 1em;
    }
  }
</style>
