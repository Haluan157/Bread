<script lang="ts">
  import { onMount } from 'svelte'
  import type { PageProps } from './$types'
  const {
    data
  }: PageProps = $props()
  
  let dataPosts = $state.raw({})
  onMount(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const rawPosts = await fetch(`/api/posts?post=${data?.user?.id}`)
    dataPosts = await rawPosts.json()
  })
</script>

<h2>{data?.user?.name}</h2>
<p>xp: <strong>{data?.xp}</strong></p>
<p>bio: <strong>{data?.bio || "tidak ada bio"}</strong></p>
<a href="/profile/edit-bio">edit bio?</a><br>
<a href="/profile/posts">Tambah Roti?</a>

<h2>Roti:</h2>

{#if Object.keys(dataPosts).length === 0}
<p>loading...</p>
{:else if dataPosts?.error}
<p>Pesan error: {dataPosts?.error}</p>
{:else}
{#each dataPosts?.message as bp (bp?.id)}
<hr>
<div>
  <p><strong>{data?.user?.name}</strong> ● {data?.user?.role}</p>
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