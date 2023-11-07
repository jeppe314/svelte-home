<script>
  import Icon from "@iconify/svelte";
</script>

<button class="add-button"> <Icon icon="mdi:plus" /></button>

<style>
  .add-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }

  .add-button:hover {
    background-color: #e0e0e0;
  }

  .add-button:focus {
    outline: none;
  }
</style>
