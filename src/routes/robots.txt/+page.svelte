<script>

    import { onMount } from 'svelte'
    import { socket } from '$lib/socket'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    onMount(async() => {
        if (!$page.data.user) {
            goto('/register')
        } else {
            socket.emit('flag verification', '06ffaa46-bfc1-449c-887a-effc8f8b4f95')
        }
    })

</script>

<div>
    <p>User-agent: *</p>
    <p>Allow: /</p>
    <p>Allow: /leaderboard</p>
    <p>Disallow: /admin</p>
    <p><br>-----------------</p>

    <p><br># heimdall brugte sine overnaturlige sanser til at forsvare bifrost; hans hørelse var så god, at han kunne høre græsset gro.</p>
    <p># det er ik' nogen dårlig idé at lade sig inspirere - djævlen (og god recon) gemmer sig i detaljerne!</p>
</div>

<style>

    * {
        font-family: monospace;
    }

    p {
        margin: 0px;
        padding: 0px;
    }

    div {
        display: flex;
        flex-direction: column;
    }

</style>