<script>

    import { flip } from 'svelte/animate'
    import { crossfade } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'
    import { socket } from '$lib/socket'
    import { blur } from 'svelte/transition'

    export let data
    let users = data.data
    console.log(users)

    // dirty dirty hacks to achieve stable sorting
    Array.prototype.stableSort = function(cmp) {
        cmp = !!cmp ? cmp : (a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        }
        let stabilizedThis = this.map((el, index) => [el, index])
        let stableCmp = (a, b) => {
            let order = cmp(a[0], b[0]);
            if (order != 0) return order;
            return a[1] - b[1];
        }
        stabilizedThis.sort(stableCmp)
        for (let i=0; i<this.length; i++) {
            this[i] = stabilizedThis[i][0]
        }
        return this
    }

    socket.on('flag found', (data) => {
        const idx = users.findIndex((e) => e.name == data.name)

        // ensure we dont increment score if user collected flag already
        // failsafe necessary when using ssr
        if (!users[idx].flags?.includes(data.flag.id) || !users[idx.flags]) {
            users[idx]['flags'] = users[idx]['flags'] ? [data.flag.id, ...users[idx].flags] : [data.flag.id] // append this flag to users flags
            console.log('flags: ', users[idx]['flags'])
            users[idx].score += data.flag.value // increment score
            users = users.stableSort((a, b) => {
                if (a.flags.length < b.flags.length) return 1
                if (a.flags.length > b.flags.length) return -1
                return 0
            }) // sort users
        } else {
            console.log(`Unsafe flag registration`)
        }
    })

    socket.on('registration', (user) => {
        console.log('new user: ', user)
        users = [...users, user]
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


<div id="leaderboard" transition:blur>
    <ul>
        {#each users as user, i (user.name)}
            <li 
                in:receive|local={{ key: user.name }} 
                out:send|local={{ key: user.name }} 
                animate:flip|local={{ duration: 3000 }} 
                style="--color: {user.color}" 
                class:first={i == 0 && user.flags?.length > 0}>
                <div class="user">
                    <span class="avatar">
                        {user.name.slice(0, 1)}
                    </span>
                    <span class="name">
                        {user.name}
                    </span>
                </div>
                <div class="score">
                    {#each user.flags as _}
                        <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 21.5v-6m0 0V6.997a.6.6 0 01.88-.53l6.67 3.53a.6.6 0 01.024 1.048L9 15.5zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    {/each}
                    
                </div>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">

    #leaderboard {
        width: 100vw;
        padding: 80px;
    }

    .score {
        svg {
            background-color: var(--color);
            border-radius: 50%;
            &:not(:last-child) {
                margin-right: -30px;
            }

            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
    }

    ul {
        margin: 0 auto;
        padding: 0px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
        color: $white;
        max-width: 1200px;
    }

    li {
        background: linear-gradient(-45deg, $grey, $grey, $grey, $grey);
        background-size: 200% 200%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 20px;
        margin: 0 20px;
        border-radius: 20px;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        width: calc(100% - 40px);
        transition: ease all 3000ms;

        &.first {
            margin: 0 20px 80px 20px;
            
            background: linear-gradient(-45deg, $sand, $wine, $grey, $white);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }

        .score {
            font-size: 2rem;
            margin-right: 20px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }

        .user {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
            gap: 20px;
        }

        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: var(--color);
            display: block;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            text-transform: uppercase;
            font-size: 1.8rem;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
    }

</style>