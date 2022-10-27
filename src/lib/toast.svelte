<script>

    import { toast } from '$lib/stores'
    import { fade } from 'svelte/transition'

</script>

{#if $toast}
    <div class="toast" transition:fade>
        <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M14.571 15.004l.858 1.845s3.857.819 3.857 2.767C19.286 21 17.57 21 17.57 21H13l-2.25-1.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.429 15.004l-.857 1.845s-3.858.819-3.858 2.767C4.714 21 6.43 21 6.43 21H8.5l2.25-1.25L13.5 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 15.926s2.143-.461 3.429-.922C7.714 8.546 11.57 9.007 12 9.007c.429 0 4.286-.461 5.571 5.997 1.286.46 3.429.922 3.429.922M12 7a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <span>{$toast}</span>
    </div>
{/if}

<style lang="scss">

    .toast {
        position: fixed;
        left: 20px;
        bottom: 20px;
        z-index: 50;
        background-color: $wine;
        max-width: 350px;
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 10px;
        color: $white;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

        svg {
            flex-shrink: 0;
            flex-grow: 0;
        }
    }

</style>