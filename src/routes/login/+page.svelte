<script lang="ts">
  import { enhance } from '$app/forms'
  const { form } = $props()
</script>

<form method="POST" use:enhance>
  <input type="email" name="email" required />
  <input type="password" name="password" minlength="8" required />
  <p>{form?.message}</p>
  <button type="submit">Login</button>
</form>

<p>Gak punya akun? <a href="/register">Register</a></p>