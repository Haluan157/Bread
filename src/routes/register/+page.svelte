<script lang="ts">
  import { enhance } from '$app/forms'
  const { form } = $props()
</script>

<form method="POST" use:enhance>
  <input name="name" placeholder="username" maxlength="20" required />
  <input type="email" placeholder="email" name="email" required />
  <input type="password" placeholder="password" name="password" minlength="8" required />
  <button type="submit">Register</button>
</form>

<p>{form?.message}</p>

<p>PERHATIAN: Jangan gunakan email asli, gunakan email palsu karena ini hanya web hasil gabut doang</p>

<p>Punya akun? <a href="/login">Login</a></p>