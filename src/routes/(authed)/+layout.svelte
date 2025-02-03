<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { PageProps } from './$types'
  
  const { data, children }: PageProps & {
    children: Snippet
  } = $props()
</script>

<main>
  <h2>BreadMan</h2>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/logout">Logout</a></li>
    <li><a href="/users/">Cari Pengguna</a></li>
  </ul>
  {@render children()}
</main>