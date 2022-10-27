<script>

    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { slide, fade } from 'svelte/transition'
    import { socket } from '$lib/socket'
    import { enhance, applyAction } from '$app/forms'

    onMount(async() => {
        if ($page.data.user?.name) goto('/')
    })

    let name

</script>

<div id="registration" transition:fade>
    <div class="right">
        <h1>Heimdall</h1>
        <p>Opret en ny bruger</p>
    </div>
    <form method="POST" use:enhance={() => {
        return async ({ result }) => {
            console.log(result)
            if (result.type === 'success') {
                result.data.user.flags = []
                result.data.user.score = 0
                socket.emit('registration', result.data.user)

                location.href = '/'
            }
        }
    }}>
        <input autocomplete=off class:standalone={!name} bind:value={name} name="name" type="text" placeholder="Mr. Anderson">
        {#if name}
            <button transition:slide class:ready={name}>
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 21.5v-6m0 0V6.997a.6.6 0 01.88-.53l6.67 3.53a.6.6 0 01.024 1.048L9 15.5zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Lad jagten begynde</span>
            </button>
        {/if}
        <span class="divider">Eller</span>
        <a href="/login">Fortsæt hvor du slap &rarr;</a>
    </form>

</div>

<style lang="scss">

    .right {
        width: 40vw;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 40px;
        flex-direction: column;
        font-weight: bold;
        font-size: 1.5rem;
        color: $white;

        h1, p {
            margin: 0px;
            padding: 0px;
        }

        h1 {
            text-transform: uppercase;
        }

        p {
            text-transform: lowercase;
            opacity: .8;
        }
    }

    a {
        font-size: .8rem;
        text-transform: lowercase;
        text-decoration: none;
        color: $wine;
        font-weight: bold;
    }

    .divider {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
        text-transform: uppercase;
        font-size: .8rem;
        margin: 40px 0 20px 0;
        color: $grey;

        &::before, &::after {
            content: ' ';
            width: 40px;
            height: 1px;
            background-color: $grey;
            display: block;
        }
    }

    #registration {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: url('/forest.webp') no-repeat center center fixed;
        background-size: cover;

        form {
            background-color: $white;
            height: 100vh;
            width: 60vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            input {
                background-color: grey;
                color: $white;
                padding: 20px;
                font-size: 2rem;
                text-transform: uppercase;
                border: none;
                border-radius: 10px 10px 0 0;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                width: 50%;
                transition: ease all 300ms;
                font-weight: bold;

                &.standalone { border-radius: 10px; }
            }

            button {
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                border: none;
                padding: 20px;
                width: 50%;
                border-radius: 0 0 10px 10px;
                transition: ease all 300ms;
                cursor: pointer;
                text-transform: uppercase;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
                text-align: center;

                span {
                    max-width: 200px;
                    overflow: hidden;
                    transition: ease all 300ms;
                    white-space: nowrap;
                }

                &:hover {
                    background-color: $wine;
                    color: $white;

                    span {
                        max-width: 0px;
                        margin-right: -20px;
                    }
                }
            }
        }
    }

    @supports (backdrop-filter: blur(10px)) {
        #registration form {
            background-color: rgba($white, .1);
            backdrop-filter: blur(20px);

            .divider {
                color: $white;
                
                &::before, &::after { background-color: $white; }
            }
        }
    }

</style>