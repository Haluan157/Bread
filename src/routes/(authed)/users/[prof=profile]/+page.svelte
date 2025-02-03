<script lang="ts">
  import { onMount } from 'svelte'
  let { data } = $props()
  let user = $state.raw({})
  let dataPosts = $state.raw({})
  onMount(async () => {
    const rawData = await fetch(`/api/user?user=${data.param}`)
    //if (!rawData.ok) throw new Error("gagal")
    
    user = await rawData.json()
    
    await new Promise((resolve) => setTimeout(resolve, 3000))
    
    const rawPosts = await fetch(`/api/posts?post=${data.param}`)
    dataPosts = await rawPosts.json()
    
  })
</script>

{#if Object.keys(user).length === 0}
<p>Loading...</p>
{:else if user?.error}
<p>Pesan error: {user?.error}</p>
{:else}
<h2>{user?.message?.name}</h2>
<p>xp: <strong>{user?.message?.xp}</strong></p>
<p>bio: <strong>{user?.message?.bio || "tidak ada bio"}</strong></p>
<p>role: <strong>{user?.message?.role}</strong></p>
<h2>Roti:</h2>
<br>
{#if Object.keys(dataPosts).length === 0}
<p>loading...</p>
{:else if dataPosts?.error}
<p>Pesan error: {dataPosts?.error}</p>
{:else}
{#each dataPosts?.message as bp (bp?.id)}
<hr>
<div>
  <p><strong>{user?.message?.name}</strong> ● {user?.message?.role}</p>
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
{/if}