<script lang="ts">
  import { enhance } from '$app/forms'
  let { data } = $props()
  
  let value = $state(data?.bio)
</script>

<form method="POST" use:enhance>
  <textarea name="bio" bind:value></textarea>
  <button type="submit" disabled="{value === data?.bio}">Ganti bio</button>
</form>