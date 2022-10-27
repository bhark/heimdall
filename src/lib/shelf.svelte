<script>

    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { shelfActive } from '$lib/stores'

    async function signOut() {
        const res = await fetch('/logout', { method: 'POST' })
        goto('/login')
    }

</script>

{#if $page.data.user}
    <div class="toggle" class:active={$shelfActive} on:click={() => $shelfActive = !$shelfActive}>
        <div class="lines">
            {#each new Array(3) as _}
                <span class="line"></span>
            {/each}
        </div>
    </div>
    <div class="shelf" class:shown={$shelfActive} on:click={() => $shelfActive = !$shelfActive}>

        <div class="top">
            <a href="/">
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M3 9.5L12 4l9 5.5M19 13v6.4a.6.6 0 01-.6.6H5.6a.6.6 0 01-.6-.6V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Hjem</span>
            </a>
            <a href="/leaderboard">
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M15 21H9v-8.4a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6V21zM20.4 21H15v-2.9a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v2.3a.6.6 0 01-.6.6zM9 21v-4.9a.6.6 0 00-.6-.6H3.6a.6.6 0 00-.6.6v4.3a.6.6 0 00.6.6H9zM10.806 5.113l.909-1.927a.312.312 0 01.57 0l.91 1.927 2.032.311c.261.04.365.376.176.568l-1.47 1.5.347 2.118c.044.272-.228.48-.462.351l-1.818-1-1.818 1c-.233.128-.506-.079-.462-.351l.347-2.118-1.47-1.5c-.19-.192-.085-.528.175-.568l2.034-.31z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Leaderboard</span>
            </a>
            <a href="/profile/{$page.data.user.name}">
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Min konto</span>
            </a>
        </div>
        <div class="bottom">
            <a href="/logout" on:click|preventDefault={() => signOut()}>
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Log ud</span>
            </a>
        </div>

    </div>
{/if}

<style lang="scss">

    .toggle {
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: $grey;
        width: 55px;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $white;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        cursor: pointer;
        transition: ease all 400ms;
        z-index: 15;

        .lines {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;

            .line {
                display: block;
                width: 20px;
                height: 2px;
                background-color: $white;
                transition: ease all 500ms;
            }
        }

        &.active {
            left: 400px;

            .lines {
                .line:last-child { opacity: 0; }
                .line:first-child {
                    transform: rotate(45deg) translateY(4.5px) translateX(5px);
                }
                .line:nth-child(2) {
                    transform: rotate(-45deg);
                }
            }
        }

        &:hover {
            background-color: $wine;
        }
    }

    .shelf {
        position: fixed;
        left: 0px;
        top: 0px;
        height: 100vh;
        width: 380px;
        background-color: $grey;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        transition: ease all 500ms;
        z-index: 10;

        &:not(.shown) {
            transform: translateX(-100%);
        }

        > div {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;

            > a {
                display: flex;
                flex-direction: row-reverse;
                justify-content: space-between;
                gap: 120px;
                font-size: 1.1rem;
                background-color:rgba(0, 0, 0, 0.22);
                padding: 20px;
                border-radius: 10px;
                transition: ease all 300ms;

                &:hover {
                    background-color: $wine;
                }
            }
        }
        
        a, svg {
            color: $white;
            text-decoration: none;
        }
    }

</style>