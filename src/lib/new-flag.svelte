<script>

    import { ConfettiExplosion } from 'svelte-confetti-explosion'
    import { newlyFoundFlag } from '$lib/stores'
    import { blur } from 'svelte/transition'
    
    console.log('new flag')

</script>

{#if $newlyFoundFlag}
    <div id="new-flag" transition:blur>
        
        <div class="body">
            <div class="confetti">
                <ConfettiExplosion particleCount={500} force={0.5} stageHeight={3000} />
            </div>
            <div>
                <h1>
                    <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 21.5v-6m0 0V6.997a.6.6 0 01.88-.53l6.67 3.53a.6.6 0 01.024 1.048L9 15.5zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    Du fandt et flag!
                </h1>
                <p>
                    {$newlyFoundFlag.message}
                </p>
            </div>

            <button on:click={() => $newlyFoundFlag = null}>Haps</button>
        </div>

    </div>
{/if}

<style lang="scss">

    .confetti {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #new-flag {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 100;
        backdrop-filter: blur(20px);
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .body {
            width: 50%;
            max-width: 600px;
            height: auto;
            max-height: 80%;
            background-color: $grey;
            color: $white;
            padding: 20px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            overflow-y: scroll;

            h1 {
                color: $wine;
                text-align: center;
            }

            p {
                margin: 40px;
                white-space: pre-wrap;
            }

            button {
                padding: 20px;
                text-transform: uppercase;
                background-color: $wine;
                border: none;
                border-radius: 10px;
                cursor: pointer;
            }
        }
    }

    .container {
        display: none;
    }

</style>