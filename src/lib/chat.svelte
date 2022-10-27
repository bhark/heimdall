<script>

    import { socket } from '$lib/socket'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { flip } from 'svelte/animate'
    import { crossfade } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'

    onMount(async() => {
        if (!$page.data.user) goto('/register')
        console.log($page.data.user)
    })

    const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

    let messages = []
    let minimized = true

    let msg
    async function sendMessage() {
        if (!msg || msg == '') return
        socket.emit('message', { 
            body: this.message.value, 
            sender: $page.data.user.name, 
            color: $page.data.user.color,
            hidden: this.username.value,
            timestamp: Date.now()
        })
        msg = ''
    }

    socket.on('message', (msg) => {
        messages = [msg, ...messages]
    })

</script>

<div id="chat" class:minimized>
    <span class="minimize" class:minimized on:click={() => minimized = !minimized}>
        <svg class="chat-icon" width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <svg class="close-icon" width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </span>
    <ul class="messages">
        {#each messages as message (message.timestamp)}
            <li in:receive={{ key: message.timestamp }} out:send={{ key: message.timestamp }} animate:flip={{ duration: 300 }} data-initials={message.sender.slice(0, 1)} class="message" style="--color: {message.color}">
                <div class="body">
                    <span class="sender">{message.sender}</span>
                    <span class="content">{message.body}</span>
                </div>
            </li>
        {/each}
    </ul>

    <form on:submit|preventDefault={sendMessage}>
        <input autocomplete=off bind:value={msg} name="message" type="text" placeholder="Skriv en besked">
        <input type="hidden" name="username" value={$page.data?.user?.name} />
        <button>
            <svg width="28px" height="28px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M22 12L3 20l3.563-8L3 4l19 8zM6.5 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
    </form>
</div>

<style lang="scss">

    #chat {
        width: 35vw;
        height: 60vh;
        display: flex;
        flex-direction: column;
        padding: 20px;
        position: fixed;
        background-color: rgba($grey, .9);
        right: 0px;
        bottom: 0px;
        margin-right: 20px;
        border-radius: 10px 10px 0 0;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        transition: ease all 500ms;
        backdrop-filter: blur(20px);

        &.minimized {
            height: 3vh;
            background-color: rgba($grey, 0.5)
        }
    }

    .minimize {
        position: absolute;
        top: 0px;
        left: 0px;
        transform: translate(-50%, -50%);
        background-color: $grey;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        color: $white;
        transition: ease all 500ms;
        cursor: pointer;

        .chat-icon {
            padding: 5px 0;
            width: 0px;
        }
        
        svg {
            overflow: hidden;

            &.close-icon {
                transform: rotate(45deg);
            }

            transition: ease all 500ms;
        }

        &:hover {
            background-color: $wine;
        }

        &.minimized {
            transform: translate(50%, -50%);

            .chat-icon {
                width: auto;
            }
            
            .close-icon {
                width: 0px;
            }
        }
    }

    .messages {
        flex-grow: 1;
        margin: 0 0 20px 0;
        padding: 0px;
        list-style: none;
        display: flex;
        gap: 20px;
        overflow-y: scroll;
        overflow-x: hidden;
        flex-direction: column-reverse;

        .message {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            color: $white;
            border-radius: 10px;

            .body {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 20px 20px 20px 0;
                margin-top: -25px;
                
                .content {
                    background-color: var(--color);
                    padding: 20px;
                    border-radius: 10px;
                    position: relative;

                    &::before {
                        content: ' ';
                        width: 15px;
                        height: 15px;
                        background-color: var(--color);
                        display: block;
                        position: absolute;
                        top: 15px;
                        left: -7.5px;
                        transform: rotate(45deg);
                    }
                }

                .sender {
                    font-weight: bold;
                    text-transform: uppercase;
                    font-style: italic;
                }
            }

            &::before {
                content: attr(data-initials);
                margin: 20px;
                padding: 20px;
                background-color: var(--color);
                display: block;
                border-radius: 50px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-transform: uppercase;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
        }
    }

    form {
        display: flex;
        flex-direction: row;
        position: relative;
        align-items: center;

        input {
            flex-grow: 1;
            padding: 20px;
            border-radius: 10px;
            background-color: $grey;
            color: $white;
            border: none;
        }

        button {
            width: 100px;
            margin: 0 0 0 20px;
            background-color: transparent;
            border: none;
            position: absolute;
            right: 0px;
            cursor: pointer;
            color: $white;
        }
    }

</style>