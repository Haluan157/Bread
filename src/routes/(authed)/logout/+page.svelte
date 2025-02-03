<script lang="ts">
  import { enhance } from '$app/forms'
</script>

<p>Anda ingin keluar?</p>
<form method="POST" use:enhance>
  <button type="submit">Logout</button>
</form>