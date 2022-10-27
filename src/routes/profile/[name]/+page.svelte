<script>

    import { onMount } from 'svelte'
    import { socket } from '$lib/socket'
    import { fade } from 'svelte/transition'

    export let data
    console.log(data)

    onMount(async() => {
        if (data.flag) {
            socket.emit('flag verification', data.flag)
        }
    })

</script>

<div id="profile" transition:fade style="--color: {data.user.color}">
    <div class="container">
        <!-- <div class="header">
            <span class="avatar">
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M8 21v-5m0 0V3.577a.6.6 0 01.916-.51l8.79 5.442a.6.6 0 01.017 1.009L8 16z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </span>
        </div> -->
        <div class="header">
            <span class="avatar">
                {data.user.name.slice(0, 1)}
            </span>
            <h1>{data.user.name}</h1>
        </div>
        {#if data.flagCount}
            <div class="flags">
                    {#each new Array(data.flagCount) as _}
                        <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M8 21v-5m0 0V3.577a.6.6 0 01.916-.51l8.79 5.442a.6.6 0 01.017 1.009L8 16z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    {/each}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">

    #profile {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .avatar {
            font-size: 2rem;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            background-color: var(--color);
            display: flex;
            justify-content: center;
            align-items: center;
            color: $white;
        }

        h1 {
            font-size: 3rem;
            color: var(--color);
        }
    }

    .flags {
        background-color: var(--color);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 20px;
        color: $white;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

</style>