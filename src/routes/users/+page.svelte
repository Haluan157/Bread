<script lang="ts">
  import { onMount } from 'svelte'
  let user = $state.raw({})
  onMount(async () => {
    const dat = await fetch("/api/new-user")
    user = await dat.json()
  })
</script>

<h2>Pengguna Terbaru</h2>
<br>
{#if Object.keys(user).length === 0}
<p>loading...</p>
{:else}
<ul>
{#each user as us (us?.id)}
<li>
  <a href="/users/{us?.id}">{us?.name} ● {us?.role}</a>
</li>
{/each}
</ul>
{/if}