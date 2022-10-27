<script>

    import { alienFoundFlag } from '$lib/stores'
    import { fly } from 'svelte/transition'

</script>

{#if $alienFoundFlag}

    <div class="flag-notifications">

        <div transition:fly class="flag-notification">
            <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 21.5v-6m0 0V6.997a.6.6 0 01.88-.53l6.67 3.53a.6.6 0 01.024 1.048L9 15.5zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span>{$alienFoundFlag} fandt et flag</span>
        </div>

    </div>

{/if}

<style lang="scss">

    .flag-notifications {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 50;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .flag-notification {
            padding: 20px;
            display: flex;
            flex-direction: row;
            gap: 20px;
            justify-content: center;
            align-items: center;
            background-color: $grey;
            color: $white;
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
    }

</style>