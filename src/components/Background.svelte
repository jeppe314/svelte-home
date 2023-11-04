<script>
  import axios from 'axios';
  import { createClient } from 'pexels';
  import { onMount } from 'svelte';

  const client = createClient('563492ad6f91700001000001eab712a512294704a89a7bd982be1889');
  
  let imgSrc = '';
  let loaded = false; // Reactive variable to track image load status

  async function getImage() {
    const query = 'Rainy day';
    try {
      const response = await client.photos.search({ query, per_page: 1, orientation: 'landscape', size: 'large' });
      console.log("🚀 ~ file: Background.svelte:16 ~ getImage ~ response.photos[0].src.original:", response.photos[0].src)
      imgSrc = response.photos[0].src.landscape;
      loaded = true; // Set loaded to true after the image source has been set
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  onMount(() => {
    getImage();
  });
</script>

<div class="hub-background" class:loaded={loaded} style="background-image: url({imgSrc});"></div> 

<style>
  .hub-background {
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
