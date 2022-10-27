<script>

    import { socket } from '$lib/socket'
    import { flip } from 'svelte/animate'
    import { crossfade } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'

    export let posts = []

    socket.on('new post', (post) => {
        console.log(post)
        posts = [post, ...posts]
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

</script>

<div class="container">
    <div class="posts">
        {#each posts as post (post.id)}
            <div in:receive={{ key: post.id }} out:send|local={{ key: post.id }} animate:flip={{ duration: 1000 }} class="post" style="--color: {post.user.color}">
                <div class="meta">
                    <span class="avatar">
                        {post.user.name.slice(0, 1)}
                    </span>
                    <span class="name">
                        {post.user.name}
                    </span>
                </div>
                <img src="{post.url}" alt="Billede uploaded af {post.user.name}" />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    .posts {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }

    .post {
        width: 100%;
        height: 70vh;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        border-radius: 0 0 20px 20px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        border-radius: 20px;
        overflow: hidden;
        background-color: var(--color);

        .meta {
            background-color: var(--color);
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 20px;
            gap: 20px;
            border-radius: 20px 20px 0 0;

            .avatar {
                width: 80px;
                height: 80px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
                display: block;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

</style>