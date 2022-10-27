<script>

    export let data

    import { blur } from 'svelte/transition'

    import Chat from '$lib/chat.svelte'
    import NewPost from '$lib/feed/new-post.svelte'
    import Posts from '$lib/feed/posts.svelte'
    import Toast from '$lib/toast.svelte'

    console.log(data)

</script>

<div class="content" transition:blur>
    <NewPost />
    <Posts posts={data.posts} />
    <Chat />
    <Toast />
</div>
