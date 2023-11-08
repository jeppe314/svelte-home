<script>
  import { onMount } from "svelte";
  import { movable } from "../../actions/movable"; // Make sure the path is correct
  import { updateCardPosition } from "../../store/store";

  export let card;
  const formatDate = (date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(/:/g, "");
  };
  let now = formatDate(new Date());
  let position = { x: 0, y: 0 };

  onMount(() => {
    const interval = setInterval(() => {
      now = formatDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function handleMove(event) {
    position.x += event.detail.dx;
    position.y += event.detail.dy;
    updateCardPosition(card.id, position);
  }
</script>

<div class="time" use:movable on:move={handleMove} style="position: absolute; left: {position.x}px; top: {position.y}px;">
  {now}
</div>

<style lang="scss">
  .time {
    font-size: 5em;
    font-family: "Cascadia Code", "Roboto", sans-serif;
    font-weight: 700;
    color: rgba(21, 20, 20, 0.852);
    cursor: move;
    user-select: none;
    letter-spacing: 2mm;
  }
</style>
