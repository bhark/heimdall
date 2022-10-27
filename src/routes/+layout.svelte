<script>

  import "../app.scss";
  import { page } from '$app/stores'
  import { shelfActive } from '$lib/stores'
  import EventManager from '$lib/event-manager.svelte'
  import NewFlag from '$lib/new-flag.svelte'
  import FlagNotification from '$lib/flag-notification.svelte'
  import Shelf from '$lib/shelf.svelte'

</script>

<NewFlag />
<FlagNotification />
<EventManager />
<Shelf />

<div on:click={() => { if ($shelfActive) $shelfActive = false }} class="page-wrapper" class:scooched={$shelfActive}>
  <div class="transition-container">
    <slot />
  </div>
</div>

<style lang="scss">

  .page-wrapper {
    min-height: 100vh;
    transition: ease all 500ms;

    &.scooched {
      filter: blur(15px);
      opacity: .5;
      transform: translateX(100px);
    }
  }

</style>