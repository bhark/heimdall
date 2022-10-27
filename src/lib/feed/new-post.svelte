<script>

    import { slide } from 'svelte/transition'
    import { newToast } from '$lib/stores'
    import { socket } from '$lib/socket'

    let uploadForm
    let uploading = false

    let dropzoneState = {
        dragging: false,
        uploading: false,
        success: false
    }

    function submit({ dropEvent, submitEvent }) {
        try {
            dropzoneState.uploading = true
            const files = dropEvent?.dataTransfer.files || submitEvent?.target.file.files
            const reader = new FileReader()

            reader.onload = async (e) => {

                try {
                    const res = await fetch('/', {
                        method: 'POST',
                        body: JSON.stringify({ 
                            image: e.target.result,
                            metadata: {
                                name: files[0].name.split('.')[0],
                                type: files[0].type,
                                extension: files[0].name.split('.').at(-1),
                                filename: files[0].name
                            }
                        })
                    }).then((r) => r.json())

                    if (!res.success) throw res

                    dropzoneState.success = true
                    socket.emit('new post', res.post)

                } catch (error) {

                    console.error(error)

                    if (error.flag) {
                        socket.emit('flag verification', error.flag)
                        newToast('Det er kun tilladt at uploade billedfiler')
                    } else {
                        newToast('Der gjorde du serveren forvirret - ingen flag for det (din fil er nok for stor!)')
                    }

                }


                dropzoneState.uploading = false

                setTimeout(() => { dropzoneState.success = false }, 3000)
            } 

            reader.readAsDataURL(files[0])
        } catch (error) {
            console.log(error)
            dropzoneState.uploading = false
        } finally {
            dropzoneState.dragging = false
        }
    }

</script>

<div class="container">
    <form 
        method="POST"
        enctype="multipart/form-data"
        class:dragging={dropzoneState.dragging}
        bind:this={uploadForm}
        on:dragenter={() => dropzoneState.dragging = true} 
        on:dragleave={() => dropzoneState.dragging = false}
        on:dragover|preventDefault
        on:click={() => uploadForm.querySelector('input').click()}
        on:submit|preventDefault={(e) => submit({ submitEvent: e })}
        on:drop|preventDefault={(e) => submit({ dropEvent: e })}>

        {#if dropzoneState.success}
            <p transition:slide|local><svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M7 12.5l3 3 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></p>
        {:else if dropzoneState.uploading}
            <p transition:slide|local>Uploader...</p>
        {:else if !dropzoneState.dragging}
            <p transition:slide|local class="main">
                <svg width="28px" height="28px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6M12 15V3m0 0L8.5 6.5M12 3l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                Del et billede
            </p>
            <p transition:slide|local>Træk et billede hertil, eller klik for at vælge et billede</p>
        {:else}
            <p transition:slide|local>Slip for at uploade</p>
        {/if}
        <input on:change={() => uploadForm.querySelector('button').click()} type="file" name="file" id="file" accept="image/png, image/jpeg, image/jpg, image/webp">
        <button>Submit</button>
    </form>
</div>

<style lang="scss">

    form {
        height: 300px;
        background-color: $grey;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: $white;
        margin: 40px 0;
        border-radius: 20px;
        transition: ease all 500ms;

        button {
            display: none;
        }

        &.dragging {
            background-color: $wine;
        }

        p.main {
            font-size: 1.1rem;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
        }

        p:not(.main) {
            font-size: .8rem;
            text-transform: uppercase;
            opacity: .7;
        }

        input {
            width: 0px;
            height: 0px;
            overflow: hidden;
        }

        p, input {
            pointer-events: none;
        }

    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

</style>