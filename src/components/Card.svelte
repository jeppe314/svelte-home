<script>
export let card;
</script>

<article>
    <!-- <h1>asd</h1> -->
    <h1>{card.name}</h1>
</article>

<style lang="scss">
    article {
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 0 1em 0 rgba(255, 255, 255, 0.2);
        border-radius: 1em;
        width:300px;
        height: 400px;
        padding: 2em;
        backdrop-filter: blur(.3em);
        h1 {
            color: black;
        }
    }
</style>