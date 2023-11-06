<script>
  import { createApi } from 'unsplash-js';
  import { onMount } from 'svelte';


  let imgSrc = '';
  let loaded = false; // Reactive variable to track image load status

  const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS,
});


  async function getImage() {
    try {
      // TODO: Activate this later, leave commented out when dev because rate limit 50/h
      // imgSrc="https://images.unsplash.com/photo-1506202687253-52e1b29d3527?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      imgSrc="https://images.unsplash.com/photo-1445964047600-cdbdb873673d?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      // const {response} = await unsplash.photos.getRandom({ query: 'landscape', count: 1, orientation: 'landscape', featured: true });
      // imgSrc = response[0].urls.regular;
      loaded = true; // Set loaded to true after the image source has been set
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  onMount(() => {
    getImage();
  });
</script>

<div class="hub-background" class:loaded={loaded} style="background-image: url({imgSrc});">
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
