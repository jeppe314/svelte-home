<script>
  import { createApi } from "unsplash-js";
  import { onMount } from "svelte";
  import { getCityFromIp, getCurrentWeather, getImage, store } from "../store/store";

  let imgSrc = "";
  let loaded = false; // Reactive variable to track image load status

  const weatherstackKey = import.meta.env.VITE_WEATHERSTACK_API_ACCESS;

  const unsplash = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS,
  });

  onMount(async () => {
    const res = await getCityFromIp();
    const { current } = await getCurrentWeather(res.city);
    const img = await getImage(current);
    console.log("🚀 ~ file: Background.svelte:19 ~ onMount ~ img:", img);
    console.log($store.backgroundImgSrc);
    loaded = true;
  });
</script>

<div class="hub-background" class:loaded style="background-image: url({$store.backgroundImgSrc});">
  <slot />
</div>

<style>
  .hub-background {
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    transition: opacity 1s ease-in-out; /* Transition effect for the opacity */
  }

  .hub-background.loaded {
    opacity: 1; /* Fully visible when loaded */
  }
</style>
