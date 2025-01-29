<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { PageProps } from './$types'
  
  import { page } from '$app/state';
  
  const { data, children }: PageProps & {
    children: Snippet
  } = $props()
</script>

<main>
  {data?.user?.name}
  {data?.user?.role}
    {#if data?.user?.name}
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/profile">Profile</a></li>
    <li><a href="/logout">Logout</a></li>
  </ul>
    {/if}
  {@render children()}
</main>