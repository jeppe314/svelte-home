<script>
  import { onMount } from "svelte";
  import { movable } from "../../actions/movable"; // Make sure the path is correct
  import { updateCardPosition } from "../../store/store";

  export let card;
  console.log("card", card);
  let now = new Date();
  let position = { x: 0, y: 0 };

  onMount(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function handleMove(event) {
    position.x += event.detail.dx;
    position.y += event.detail.dy;
    console.log(position);
    updateCardPosition(card.id, position);
  }
</script>

<div class="time" use:movable on:move={handleMove} style="position: absolute; left: {position.x}px; top: {position.y}px;">
  {now.toLocaleTimeString()}
</div>

<style lang="scss">
  .time {
    font-size: 5em;
    font-family: "Titillium Web", sans-serif;
    font-weight: 700;
    color: rgba(21, 20, 20, 0.852);
    cursor: move; /* Indicate that the element is movable */
    user-select: none;
  }
</style>
