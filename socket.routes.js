export const routes = (socket, io) => {
    socket.emit('welcome')

    socket.on('message', async(msg) => {
        const xssStrings = [
            '<script>',
            'onload=',
            'onhover=',
            '</script>',
        ]

        if (xssStrings.some((e) => msg.body.includes(e))) {
            socket.emit('flag', { id: '952519c3-a0e9-45df-a033-06ff6ce49932' })
        } else if (msg.body == '1ebf0417-973e-4aff-8761-eba5a93f0597') {
            socket.emit('flag', { id: '1ebf0417-973e-4aff-8761-eba5a93f0597' })
        } else {
            io.emit('message', msg)
        }

        console.log(msg)

        if (msg.hidden != msg.sender) {
            socket.emit('flag', { id: 'c0f01c6b-86d4-43b2-9091-386334b5ce87' })
        }
    })

    socket.on('registered flag', (data) => {
        io.emit('flag found', data)
    })

    socket.on('registration', (user) => {
        io.emit('registration', user)
    })

    socket.on('flag verification', (flag) => {
        console.log('User requests verification for flag', flag)
        socket.emit('flag', { id: flag })
    })

    socket.on('new post', (post) => {
        io.emit('new post', post)
    })

}