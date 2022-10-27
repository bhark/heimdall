<script>

    import { socket } from '$lib/socket'
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { sleep } from '$lib/utils'
    import { slide } from 'svelte/transition'

    $: formState = {
        loading: false,
        success: false,
        error: false
    }

    let username
    let password
    let solved = false

    onMount(async() => {
        if (!$page.data.user) {
            goto('/register')
        } else {
            socket.emit('flag verification', 'e104b85c-e044-42fe-951d-60d330713a44')
        }
    })

    async function submit(e) {
        formState.loading = true 

        try {
            await sleep(1000)
            const sqliExamples = ['1=1', '1 = 1', '\'', 'SELECT', ' OR ']
            if (sqliExamples.some(example => username.includes(example)) || sqliExamples.some(example => password.includes(example))) {
                socket.emit('flag verification', '1ebf0417-973e-4aff-8761-eba5a93f0597')
                solved = true
            } else {
                throw 'Forkert brugernavn eller adgangskode'
            }
        } catch (error) {
            formState.error = error
        } finally {
            formState.loading = false
            await sleep(3000)
            formState = { loading: false, success: false, error: false }
        }

    }

</script>

<div id="admin">
    {#if !solved}
        <form transition:slide on:submit|preventDefault={submit} class:loading={formState.loading} class:error={formState.error} class:success={formState.success}>
            <img class="logo" src="/wordpress_logo.png" alt="Wordpress Logo" />
            <input autocomplete=off bind:value={username} type="text" name="username" placeholder="Brugernavn">
            <input autocomplete=off bind:value={password} type="password" name="password" placeholder="Adgangskode">
            <button>
                {#if formState.loading}
                    <span transition:slide>
                        Tænke, tænke...
                    </span>
                {:else if formState.error}
                    <span transition:slide>
                        <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        {formState.error}
                    </span>
                {:else}
                    <span transition:slide>
                        <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19 12h-7m0 0l3 3m-3-3l3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        Log ind
                    </span>
                {/if}
            </button>
        </form>
    {:else}
        <p transition:slide>
            <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 21.5v-6m0 0V6.997a.6.6 0 01.88-.53l6.67 3.53a.6.6 0 01.024 1.048L9 15.5zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </p>
    {/if}
</div>

<style lang="scss">

    #admin {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    form {
        width: 90vw;
        max-width: 800px;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 40px;
        border-radius: 20px;
        background-color: $white;
        position: relative;
        transition: ease all 300ms;

        &.error {
            background-color: $wine;
        }

        &.loading {
            background-color: $sand;
        }

        input, button {
            width: 80%;
            max-width: 300px;
            margin: 10px 0;
            padding: 10px;
            background-color: $grey;
            color: $white;
            border-radius: 10px;
            border: none;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        button {
            cursor: pointer;

            span {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 10px;

                svg {
                    transform: scale(.8);
                }

                img {
                    width: 60px;
                }
            }
        }

        img.logo {
            position: absolute;
            top: 0px;
            transform: translateY(-50%);
            width: 400px;
            background-color: $white;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-radius: 20px;
        }

    }

</style>