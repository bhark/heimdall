<script>

    import { socket } from '$lib/socket'
    import { newlyFoundFlag, broadcastCapture } from '$lib/stores'
    import { page } from '$app/stores'

    socket.on('connect', () => {
        console.log('Connected to websocket')
    })

    socket.on('flag', async (flag) => {
        
        const res = await fetch('/leaderboard', {
            method: 'POST',
            body: JSON.stringify(flag),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((r) => r.json())

        console.log(res)

        if (!res.error) {
            $newlyFoundFlag = { message: res.message, id: flag }
            socket.emit('registered flag', { flag: { id: $newlyFoundFlag.id, value: $newlyFoundFlag.value }, name: $page.data.user.name })
        }

    })

    socket.on('flag found', (flag) => {
        broadcastCapture(flag.name)
    })

</script>