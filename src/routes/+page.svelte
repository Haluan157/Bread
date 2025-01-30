<script lang="ts">
  import { onMount } from 'svelte'
  let posts = $state.raw({})
  onMount(async () => {
    const dat = await fetch("/api/new-posts")
    posts = await dat.json()
  })
</script>

<h3>Selamat datang di BreadMan</h3>

<p>BreadMan adalah media sosial bagi kalian yang ingin membagikan roti-roti kalian yang kalian dengan cinta</p>

<h2>Roti Terbaru:</h2>

<br>
{#if Object.keys(posts).length === 0}
<p>loading...</p>
{:else}
{#each posts as bp (bp?.id)}
<hr>
<div>
  <p><a href="/users/{bp?.user?.id}"><strong>{bp?.user?.name}</strong></a> ● {bp?.user?.role}</p>
  <h2>{bp?.name}</h2>
  <p>Dibuat: {bp?.release}</p>
  <p>Roti: {bp?.name}</p>
  <p>Harga: {bp?.price}</p>
  <p>Deskripsi: {bp?.description || "Tidak ada"}</p>
</div>
<br>
{:else}
<p>tidak ada post</p>
{/each}
{/if}